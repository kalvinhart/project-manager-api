import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Organisation } from "src/modules/organisation/schemas/organisation.schema";
import { UserRole } from "./user-role.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: string;

  @Prop({
    required: true,
    minlength: 6
  })
  name: string;

  @Prop({
    required: true,
    unique: true
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6
  })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: UserRole.name }] })
  roles: UserRole[] | string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Organisation.name })
  initialOrganisation: Organisation | string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Organisation.name }]
  })
  organisations: Organisation[] | string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
