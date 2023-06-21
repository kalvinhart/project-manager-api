import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Project } from "src/modules/project/schemas/project.schema";

@Schema({ timestamps: true })
export class Client {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  contactName: string;

  @Prop()
  contactEmail: string;

  @Prop()
  contactNumber: string;

  @Prop()
  organisationId: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Project.name }] })
  projects: Project[] | string[];
}

export const ClientSchema = SchemaFactory.createForClass(Client);
