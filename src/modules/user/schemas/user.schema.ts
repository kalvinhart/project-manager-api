import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
// import { ObjectId, HydratedDocument } from "mongoose";

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

  //   @Prop({
  //     type: [{ type: ObjectId, ref: "Organisation" }]
  //   })
  //   organisations: Organisation[];
}

export const UserSchema = SchemaFactory.createForClass(User);
