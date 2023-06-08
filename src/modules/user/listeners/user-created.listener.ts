import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { AuthEvents } from "src/modules/auth/enums/AuthEvents";
import { AddUserToOrganisationDto } from "../dto/add-user-to-organisation.dto";
import { UserCreatedEvent } from "../events/user-created.event";
import { UserService } from "../user.service";

@Injectable()
export class UserCreatedListener {
  constructor(private userService: UserService) {}

  @OnEvent(AuthEvents.USER_CREATED)
  handleUserCreated(userCreatedEvent: UserCreatedEvent): void {
    const data = new AddUserToOrganisationDto(
      userCreatedEvent._id,
      userCreatedEvent.organisations[0]._id
    );

    this.userService.addUserToOrganisation(data);
  }
}
