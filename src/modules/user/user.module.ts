import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import {
  Organisation,
  OrganisationSchema
} from "src/modules/organisation/schemas/organisation.schema";
import { OrganisationCreatedListener } from "./listeners/organisation-created.listener";
import { UserCreatedListener } from "./listeners/user-created.listener";
import { UserRole, UserRoleSchema } from "./schemas/user-role.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserRole.name, schema: UserRoleSchema },
      { name: Organisation.name, schema: OrganisationSchema }
    ])
  ],
  providers: [UserService, OrganisationCreatedListener, UserCreatedListener],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
