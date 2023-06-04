import { OrganisationDto } from "../../organisation/dto/organisation.dto";
import { UserDto } from "../dto/user.dto";

export class OrganisationCreatedEvent {
  constructor(organisation: OrganisationDto) {
    this._id = organisation._id.toString();
    this.name = organisation.name;
    this.owner = new UserDto(organisation.owner);
  }

  _id: string;
  name: string;
  owner: UserDto;
}
