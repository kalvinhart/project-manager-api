import { UserDto } from "src/modules/user/dto/user.dto";

export class CreateOrganisationDto {
  name: string;
  owner: UserDto;
}
