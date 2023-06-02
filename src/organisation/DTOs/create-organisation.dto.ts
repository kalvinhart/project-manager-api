import { UserDto } from "src/modules/user/DTOs/user.dto";

export class CreateOrganisationDto {
  name: string;
  owner: UserDto;
}
