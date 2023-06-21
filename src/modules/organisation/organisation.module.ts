import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from "../user/user.module";
import { OrganisationController } from "./organisation.controller";
import { OrganisationService } from "./organisation.service";
import { Organisation, OrganisationSchema } from "./schemas/organisation.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Organisation.name, schema: OrganisationSchema }]),
    forwardRef(() => UserModule)
  ],
  controllers: [OrganisationController],
  providers: [OrganisationService],
  exports: [MongooseModule]
})
export class OrganisationModule {}
