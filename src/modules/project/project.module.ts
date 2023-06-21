import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ClientModule } from "../client/client.module";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { Project, ProjectSchema } from "./schemas/project.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    forwardRef(() => ClientModule)
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [MongooseModule]
})
export class ProjectModule {}
