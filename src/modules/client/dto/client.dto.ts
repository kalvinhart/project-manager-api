import { Client } from "../schemas/client.schema";

export class ClientDto {
  constructor(client: Client) {
    this._id = client._id;
    this.name = client.name;
    this.contactName = client.contactName;
    this.contactEmail = client.contactEmail;
    this.contactNumber = client.contactNumber;
    this.organisationId = client.organisationId;
  }

  _id: string;
  name: string;
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  organisationId: string;
}
