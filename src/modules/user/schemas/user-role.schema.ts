import { Prop, Schema } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import { UserRoles } from "../enums/UserRoles";

@Schema()
export class UserRole {
  @Prop({ type: String, enum: UserRoles, default: UserRoles.USER })
  roleName: UserRoles | ObjectId | string;
}
