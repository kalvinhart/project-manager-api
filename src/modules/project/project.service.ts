import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Project } from "./schemas/project.schema";
import { Model } from "mongoose";
import { ProjectDto } from "./dto/project.dto";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectService {
  constructor(@InjectModel(Project.name) private projectModel: Model<Project>) {}

  public async getAllProjectsByOrganisation(activeOrganisationId: string): Promise<ProjectDto[]> {
    const projects = await this.projectModel
      .find({ organisationId: activeOrganisationId })
      .populate("client");

    return projects.map(project => new ProjectDto(project));
  }

  public async getProjectById(
    projectId: string,
    activeOrganisationId: string
  ): Promise<ProjectDto | null> {
    const project = await this.projectModel
      .findOne({ _id: projectId, organisationId: activeOrganisationId })
      .populate("client");
    if (!project) throw new NotFoundException("Project not found.");

    return new ProjectDto(project);
  }

  public async getAllProjectsByClient(
    clientId: string,
    activeOrganisationId: string
  ): Promise<ProjectDto[] | null> {
    const projects = await this.projectModel.find({
      client: clientId,
      organisationId: activeOrganisationId
    });

    return projects.map(project => new ProjectDto(project));
  }

  public async createNewProject(createProjectDto: CreateProjectDto): Promise<ProjectDto | null> {
    const newProject = new this.projectModel(createProjectDto);
    const savedProject = await newProject.save();

    return new ProjectDto(savedProject);
    // this.clientService.updateClientProjects(
    //   savedProject.client.toString(),
    //   savedProject._id,
    //   activeOrganisationId
    // );
  }

  public async updateProject(updateProjectDto: UpdateProjectDto): Promise<ProjectDto | null> {
    const updatedProject = await this.projectModel.findOneAndUpdate(
      { _id: updateProjectDto._id, organisationId: updateProjectDto.organisationId },
      updateProjectDto,
      { new: true, runValidators: true }
    );
    if (!updatedProject) throw new NotFoundException("Project not found.");

    return new ProjectDto(updatedProject);
  }
}
