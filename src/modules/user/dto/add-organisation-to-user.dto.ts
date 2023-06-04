export class AddOrganisationToUserDto {
  constructor(userId: string, organisationId: string) {
    this.userId = userId;
    this.organisationId = organisationId;
  }

  userId: string;
  organisationId: string;
}
