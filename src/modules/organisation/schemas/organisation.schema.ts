import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/modules/user/schemas/user.schema";

export type OrganisationDocument = HydratedDocument<Organisation>;

@Schema({ timestamps: true })
export class Organisation {
  _id: string;

  @Prop({ required: true, minlength: 3, unique: true })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  owner: User | string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  })
  users: User[] | string[];
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
