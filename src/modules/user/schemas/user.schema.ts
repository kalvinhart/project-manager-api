import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Organisation } from "src/modules/organisation/schemas/organisation.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
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

  @Prop({
    required: true
  })
  roles: string[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Organisation.name }]
  })
  organisations: Organisation[];
}

export const UserSchema = SchemaFactory.createForClass(User);
