import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { OrganisationEvents } from "../../organisation/enums/OrganisationEvents";
import { AddOrganisationToUserDto } from "../dto/add-organisation-to-user.dto";
import { OrganisationCreatedEvent } from "../events/organisation-created.event";
import { UserService } from "../user.service";

@Injectable()
export class OrganisationCreatedListener {
  constructor(private userService: UserService) {}

  @OnEvent(OrganisationEvents.ORGANISATION_CREATED, { async: true })
  async handleOrganisationCreated(payload: OrganisationCreatedEvent): Promise<void> {
    const data = new AddOrganisationToUserDto(payload.owner, payload._id);

    await this.userService.addOrganisationToUser(data);
    await this.userService.updateInitialOrganisation(data);
  }
}
