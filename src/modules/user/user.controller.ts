import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@UseGuards(AuthGuard)
@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserDto> {
    const user = await this.userService.getUserById(id);
    return new UserDto(user);
  }
}
