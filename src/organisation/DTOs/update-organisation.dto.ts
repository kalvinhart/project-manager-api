import { User } from "src/modules/user/schemas/user.schema";

export class UpdateOrganisationDto {
  _id: string;
  name?: string;
  owner?: User;
}
