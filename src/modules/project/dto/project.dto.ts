import { Project } from "../schemas/project.schema";

export class ProjectDto {
  constructor(project: Project) {
    this._id = project._id;
    this.name = project.name;
    this.type = project.type;
    this.startDate = project.startDate;
    this.endDate = project.endDate;
    this.clientId = project.clientId;
    this.organisationId = project.organisationId;
  }

  _id: string;
  name: string;
  type: string;
  startDate: Date;
  endDate: Date;
  clientId: string;
  organisationId: string;
}
