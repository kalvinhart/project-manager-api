import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { BaseConfig } from "src/config/base.config";
import { Config } from "../core/enums/Config";
import { UserDto } from "../user/dto/user.dto";
import { User, UserDocument } from "../user/schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { compareSync, hashSync } from "bcrypt";
import { SignInResultDto } from "./dto/sign-in-result.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
  baseConfig: BaseConfig;

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {
    this.baseConfig = this.configService.get<BaseConfig>(Config.BASE);
  }

  async createUser(user: CreateUserDto): Promise<UserDto> {
    const { email, password } = user;

    const existingUser: UserDocument = await this.userModel.findOne({ email });
    if (existingUser)
      throw new BadRequestException("A user with this email address already exists.");

    const passwordHash = hashSync(password, 12);

    const newUser = new this.userModel();
    newUser.email = email;
    newUser.password = passwordHash;

    const savedUser = await newUser.save();

    return new UserDto(savedUser);
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
