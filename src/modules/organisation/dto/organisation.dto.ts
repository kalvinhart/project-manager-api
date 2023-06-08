import { UserDto } from "src/modules/user/dto/user.dto";
import { Organisation, OrganisationDocument } from "../schemas/organisation.schema";

export class OrganisationDto {
  constructor(organisation: OrganisationDocument | Organisation) {
    this._id = organisation._id;
    this.name = organisation.name;
    this.owner = organisation.owner;
    this.users = organisation.users;
  }

  _id: string;
  name: string;
  owner: UserDto | string;
  users: UserDto[] | string[];
}
