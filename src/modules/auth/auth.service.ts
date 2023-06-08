import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseConfig } from "src/config/base.config";
import { Config } from "../../core/enums/Config";
import { UserDto } from "../user/dto/user.dto";
import { User, UserDocument } from "../user/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { compareSync, hashSync } from "bcrypt";
import { SignInResultDto } from "./dto/sign-in-result.dto";
import { SignInDto } from "./dto/sign-in.dto";
import { CreatePaidUserDto } from "./dto/create-paid-user.dto";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { AuthEvents } from "./enums/AuthEvents";
import { UserCreatedEvent } from "../user/events/user-created.event";

@Injectable()
export class AuthService {
  baseConfig: BaseConfig;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2
  ) {
    this.baseConfig = this.configService.get<BaseConfig>(Config.BASE);
  }

  async createPaidUser(user: CreatePaidUserDto): Promise<UserDto> {
    const { name, email, password, roles } = user;

    await this.ensureUniqueUser(email);

    const passwordHash = this.hashPassword(password);

    const newUser = new this.userModel({
      name,
      email,
      password: passwordHash,
      roles
    });

    const savedUser = await newUser.save();

    return new UserDto(savedUser);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { name, email, password, roles, organisation } = createUserDto;

    await this.ensureUniqueUser(email);

    const passwordHash = this.hashPassword(password);

    const newUser = new this.userModel({
      name,
      email,
      password: passwordHash,
      roles,
      initialOrganisation: organisation,
      organisations: organisation
    });

    const savedUser = await newUser.save();
    const populatedNewUser = await savedUser.populate([
      "roles",
      "initialOrganisation",
      "organisations"
    ]);

    const user = new UserDto(populatedNewUser);
    const userEvent = new UserCreatedEvent(user);

    this.eventEmitter.emit(AuthEvents.USER_CREATED, userEvent);

    return user;
  }

  async ensureUniqueUser(email: string): Promise<void> {
    const existingUser: UserDocument = await this.userModel.findOne({ email });
    if (existingUser)
      throw new BadRequestException("A user with this email address already exists.");
  }

  hashPassword(password: string): string {
    return hashSync(password, 12);
  }

  async signIn(userCredentials: SignInDto): Promise<SignInResultDto> {
    const { email, password } = userCredentials;

    const user: UserDocument = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException("Invalid username/password.");

    const match = compareSync(password, user.password);
    if (!match) throw new UnauthorizedException("Invalid username/password.");

    const payload = {
      userId: user._id
    };

    const userResult = new UserDto(user);

    const token = await this.jwtService.signAsync(payload, { secret: this.baseConfig.jwtKey });

    return new SignInResultDto(userResult, token);
  }
}
