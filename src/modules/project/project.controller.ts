import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { ProjectService } from "./project.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Request } from "express";

@UseGuards(AuthGuard)
@Controller("project")
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Get("/")
  getAllProjectsByOrganisation(@Req() request: Request) {
    const { activeOrganisationId } = request;

    return this.projectService.getAllProjectsByOrganisation(activeOrganisationId);
  }

  @Get("/:id")
  getProjectById(@Param("id") projectId: string, @Req() request: Request) {
    const { activeOrganisationId } = request;

    return this.projectService.getProjectById(projectId, activeOrganisationId);
  }

  @Get("/client/:id")
  getProjectsByClient(@Param("id") clientId: string, @Req() request: Request) {
    const { activeOrganisationId } = request;

    return this.projectService.getAllProjectsByClient(clientId, activeOrganisationId);
  }

  @Post("/")
  createProject(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.createNewProject(createProjectDto);
  }

  @Put("/:id")
  updateProject(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.updateProject(updateProjectDto);
  }
}
