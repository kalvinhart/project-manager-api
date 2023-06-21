import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectModule } from "../project/project.module";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";
import { Client, ClientSchema } from "./schemas/client.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
    forwardRef(() => ProjectModule)
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [MongooseModule]
})
export class ClientModule {}
