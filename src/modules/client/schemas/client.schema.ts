import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Organisation } from "src/modules/organisation/schemas/organisation.schema";

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

  @Prop({ type: Types.ObjectId, ref: Organisation.name })
  organisation: Organisation | string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
