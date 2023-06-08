import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { UserDto } from "../user/dto/user.dto";
import { AuthService } from "./auth.service";
import { CreatePaidUserDto } from "./dto/create-paid-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInResultDto } from "./dto/sign-in-result.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResultDto> {
    return await this.authService.signIn(signInDto);
  }

  @Post("register")
  async createPaidUser(@Body() createPaidUserDto: CreatePaidUserDto): Promise<UserDto> {
    return await this.authService.createPaidUser(createPaidUserDto);
  }

  @UseGuards(AuthGuard)
  @Post("create")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return await this.authService.createUser(createUserDto);
  }
}
