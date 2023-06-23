import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";
import { Request } from "express";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get("/")
  async getUserDetails(@Req() request: Request): Promise<UserDto> {
    const { user } = request;
    const userDetails = await this.userService.getUserById(user._id);
    return new UserDto(userDetails);
  }
}
