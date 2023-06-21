import { UserDto } from "src/modules/user/dto/user.dto";
import { OrganisationDocument, Organisation } from "../schemas/organisation.schema";
import { User } from "src/modules/user/schemas/user.schema";

export class OrganisationDetailsDto {
  constructor(organisation: OrganisationDocument | Organisation) {
    this._id = organisation._id;
    this.name = organisation.name;
    this.owner = new UserDto(organisation.owner as User);
    this.users = (organisation.users as User[]).map((user: User) => new UserDto(user));
  }

  _id: string;
  name: string;
  owner: UserDto;
  users: UserDto[];
}
