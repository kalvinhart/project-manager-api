import { Organisation } from "src/modules/organisation/schemas/organisation.schema";
import { UserRole } from "../schemas/user-role.schema";
import { User } from "../schemas/user.schema";

export class UserDto {
  constructor(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.roles = user.roles;
    this.initialOrganisation = user.initialOrganisation;
    this.organisations = user.organisations;
  }

  _id: string;
  name: string;
  email: string;
  roles: UserRole[] | string[];
  initialOrganisation: Organisation | string;
  organisations: Organisation[] | string[];
}
