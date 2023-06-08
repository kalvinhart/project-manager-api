import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Organisation } from "../organisation/schemas/organisation.schema";
import { AddOrganisationToUserDto } from "./dto/add-organisation-to-user.dto";
import { AddUserToOrganisationDto } from "./dto/add-user-to-organisation.dto";
import { UpdateInitialOrganisationDto } from "./dto/update-initial-organisation.dto";
import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Organisation.name) private organisationModel: Model<Organisation>
  ) {}

  async getUserById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findById(id);
  }

  async updateInitialOrganisation(
    updateInitialOrganisationDto: UpdateInitialOrganisationDto
  ): Promise<void> {
    const { userId, organisationId } = updateInitialOrganisationDto;

    await this.userModel.findByIdAndUpdate(userId, {
      initialOrganisation: organisationId
    });
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

  async addUserToOrganisation(addUserToOrganisationDto: AddUserToOrganisationDto): Promise<void> {
    const { userId, organisationId } = addUserToOrganisationDto;

    try {
      await this.organisationModel.findByIdAndUpdate(
        organisationId,
        { $push: { users: userId } },
        { runValidators: true }
      );
    } catch (error) {
      throw new NotFoundException("The provided user or organisation was not found.");
    }
  }
}
