import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Client } from "src/modules/client/schemas/client.schema";
import { User } from "src/modules/user/schemas/user.schema";

export type OrganisationDocument = HydratedDocument<Organisation>;

@Schema({ timestamps: true })
export class Organisation {
  _id: string;

  @Prop({ required: true, minlength: 3, unique: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  owner: User | string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: User.name }]
  })
  users: User[] | string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: Client.name }] })
  clients: Client[] | string[];
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
