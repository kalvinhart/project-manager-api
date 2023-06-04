import { ObjectId } from "mongoose";
import { Organisation } from "src/modules/organisation/schemas/organisation.schema";
import { UserRole } from "../schemas/user-role.schema";
import { UserDocument } from "../schemas/user.schema";

export class UserDto {
  constructor(user: UserDocument) {
    this._id = user._id.toString();
    this.name = user.name;
    this.email = user.email;
    this.roles = user.roles;
    this.organisations = user.organisations;
  }

  _id: string;
  name: string;
  email: string;
  roles: UserRole[] | ObjectId[] | string[];
  organisations: Organisation[] | ObjectId[] | string[];
}
