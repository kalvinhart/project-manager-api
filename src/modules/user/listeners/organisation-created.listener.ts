import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { OrganisationEvents } from "../../organisation/enums/OrganisationEvents";
import { AddOrganisationToUserDto } from "../dto/add-organisation-to-user.dto";
import { OrganisationCreatedEvent } from "../events/organisation-created.event";
import { UserService } from "../user.service";

@Injectable()
export class OrganisationCreatedListener {
  constructor(private userService: UserService) {}

  @OnEvent(OrganisationEvents.ORGANISATION_CREATED)
  handleOrganisationCreated(payload: OrganisationCreatedEvent): void {
    const data = new AddOrganisationToUserDto(payload.owner._id, payload._id);

    this.userService.addOrganisationToUser(data);
  }
}
