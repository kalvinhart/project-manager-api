import { OrganisationDto } from "../../organisation/dto/organisation.dto";

export class OrganisationCreatedEvent {
  constructor(organisation: OrganisationDto) {
    this._id = organisation._id;
    this.name = organisation.name;
    this.owner = organisation.owner as string;
  }

  _id: string;
  name: string;
  owner: string;
}
