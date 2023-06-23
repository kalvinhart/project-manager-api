export class UpdateProjectDto {
  _id: string;
  name?: string;
  type?: string;
  startDate?: Date;
  endDate?: Date;
  clientId: string;
}
