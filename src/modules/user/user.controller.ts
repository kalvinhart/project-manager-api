import { Controller, Get, Param } from "@nestjs/common";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserDto> {
    const user = await this.userService.getUserById(id);
    return new UserDto(user);
  }
}
