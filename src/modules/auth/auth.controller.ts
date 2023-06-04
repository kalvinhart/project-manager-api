import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UserDto } from "../user/dto/user.dto";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { SignInResultDto } from "./dto/sign-in-result.dto";
import { SignInDto } from "./dto/sign-in.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  async signIn(@Body() signInDto: SignInDto): Promise<SignInResultDto> {
    try {
      return await this.authService.signIn(signInDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post("register")
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    try {
      return await this.authService.createUser(createUserDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
