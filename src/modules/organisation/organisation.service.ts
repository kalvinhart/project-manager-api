import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/modules/user/schemas/user.schema";
import { CreateOrganisationDto } from "./dto/create-organisation.dto";
import { OrganisationDto } from "./dto/organisation.dto";
import { UpdateOrganisationDto } from "./dto/update-organisation.dto";
import { Organisation } from "./schemas/organisation.schema";

@Injectable()
export class OrganisationService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<Organisation>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async checkNameAvailability(name: string): Promise<boolean> {
    const exists = await this.organisationModel.find({ name: name });
    return exists.length > 0 ? true : false;
  }

  async createNewOrganisation(
    createOrganisationDto: CreateOrganisationDto
  ): Promise<OrganisationDto> {
    // create the new organisation
    const newOrganisation = new this.organisationModel({
      name: createOrganisationDto.name,
      owner: createOrganisationDto.owner._id
    });

    const savedOrganisation = await newOrganisation.save();

    return new OrganisationDto(savedOrganisation);
  }

  async updateOrganisation(updateOrganisationDto: UpdateOrganisationDto): Promise<OrganisationDto> {
    const updatedOrganisation = await this.organisationModel.findByIdAndUpdate(
      updateOrganisationDto._id,
      updateOrganisationDto,
      { new: true }
    );

    if (!updatedOrganisation) throw new BadRequestException("Organisation does not exist.");

    return new OrganisationDto(updatedOrganisation);
  }
}
