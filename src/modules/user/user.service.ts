import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AddOrganisationToUserDto } from "./dto/add-organisation-to-user.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }

  async addOrganisationToUser(addOrganisationToUserDto: AddOrganisationToUserDto): Promise<void> {
    const { userId, organisationId } = addOrganisationToUserDto;

    try {
      await this.userModel.findByIdAndUpdate(
        userId,
        { $push: { organisations: organisationId } },
        { runValidators: true }
      );
    } catch (error) {
      throw new NotFoundException("The provided user or organisation was not found.");
    }
  }
}
