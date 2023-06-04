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

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Organisation.name, schema: OrganisationSchema }
    ])
  ],
  providers: [UserService, OrganisationCreatedListener],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
