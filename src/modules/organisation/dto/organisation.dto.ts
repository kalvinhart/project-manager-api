import { User } from "src/modules/user/schemas/user.schema";
import { OrganisationDocument } from "../schemas/organisation.schema";

export class OrganisationDto {
  constructor(organisation: OrganisationDocument) {
    this._id = organisation._id.toString();
    this.name = organisation.name;
    this.owner = organisation.owner;
  }

  _id: string;
  name: string;
  owner: User;
}
