import { Controller, Get, HttpException, HttpStatus, Param } from "@nestjs/common";
import { UserDto } from "./DTOs/user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<UserDto> {
    try {
      const user = await this.userService.getUserById(id);
      return new UserDto(user);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
