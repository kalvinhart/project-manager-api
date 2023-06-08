import { OrganisationDto } from "src/modules/organisation/dto/organisation.dto";
import { UserDto } from "../dto/user.dto";
import { UserRoles } from "../enums/UserRoles";

export class UserCreatedEvent {
  constructor(user: UserDto) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.roles = user.roles as UserRoles[];
    this.organisations = user.organisations.map(o => new OrganisationDto(o));
  }

  _id: string;
  name: string;
  email: string;
  roles: UserRoles[];
  organisations: OrganisationDto[];
}
