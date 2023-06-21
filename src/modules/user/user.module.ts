import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { OrganisationCreatedListener } from "./listeners/organisation-created.listener";
import { UserCreatedListener } from "./listeners/user-created.listener";
import { UserRole, UserRoleSchema } from "./schemas/user-role.schema";
import { OrganisationModule } from "../organisation/organisation.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: UserRole.name, schema: UserRoleSchema }
    ]),
    forwardRef(() => OrganisationModule)
  ],
  providers: [UserService, OrganisationCreatedListener, UserCreatedListener],
  controllers: [UserController],
  exports: [UserService, MongooseModule]
})
export class UserModule {}
