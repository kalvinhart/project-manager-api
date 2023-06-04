import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, ObjectId } from "mongoose";
import { UserRoles } from "../enums/UserRoles";

export type UserRoleDocument = HydratedDocument<UserRole>;

@Schema()
export class UserRole {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, enum: UserRoles, default: UserRoles.USER })
  roleName: UserRoles | ObjectId | string;
}

export const UserRoleSchema = SchemaFactory.createForClass(UserRole);
