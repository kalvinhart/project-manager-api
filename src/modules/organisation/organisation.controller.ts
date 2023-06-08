import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { CreateOrganisationDto } from "./dto/create-organisation.dto";
import { OrganisationDto } from "./dto/organisation.dto";
import { UpdateOrganisationDto } from "./dto/update-organisation.dto";
import { OrganisationService } from "./organisation.service";

@UseGuards(AuthGuard)
@Controller("organisation")
export class OrganisationController {
  constructor(private organisationService: OrganisationService) {}

  @Post("/create")
  createOrganisation(
    @Body() createOrganisationDto: CreateOrganisationDto
  ): Promise<OrganisationDto> {
    return this.organisationService.createNewOrganisation(createOrganisationDto);
  }

  @Get(":id")
  getOrganisationDetails(@Param("id") organisationId: string): Promise<OrganisationDto> {
    return this.organisationService.getOrganisationDetails(organisationId);
  }

  @Post("/update")
  updateOrganisation(@Body() updateOrganisationDto: UpdateOrganisationDto) {
    return this.organisationService.updateOrganisation(updateOrganisationDto);
  }
}
