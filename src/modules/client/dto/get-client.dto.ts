export class GetClientDto {
  constructor(clientId, organisationId) {
    this.clientId = clientId;
    this.organisationId = organisationId;
  }

  clientId: string;
  organisationId: string;
}
