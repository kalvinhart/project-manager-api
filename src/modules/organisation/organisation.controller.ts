import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrganisationDto } from "./dto/create-organisation.dto";
import { OrganisationDto } from "./dto/organisation.dto";
import { UpdateOrganisationDto } from "./dto/update-organisation.dto";
import { OrganisationService } from "./organisation.service";

@Controller("organisation")
export class OrganisationController {
  constructor(private organisationService: OrganisationService) {}

  @Post("/create")
  createOrganisation(
    @Body() createOrganisationDto: CreateOrganisationDto
  ): Promise<OrganisationDto> {
    return this.organisationService.createNewOrganisation(createOrganisationDto);
  }

  @Post("/update")
  updateOrganisation(@Body() updateOrganisationDto: UpdateOrganisationDto) {
    return this.organisationService.updateOrganisation(updateOrganisationDto);
  }
}
