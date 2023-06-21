import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Project {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  type: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  clientId: string;

  @Prop()
  organisationId: string;

  @Prop({ default: false })
  isArchived: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
