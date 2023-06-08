import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { Model } from "mongoose";
import { User } from "src/modules/user/schemas/user.schema";
import { CreateOrganisationDto } from "./dto/create-organisation.dto";
import { OrganisationDto } from "./dto/organisation.dto";
import { UpdateOrganisationDto } from "./dto/update-organisation.dto";
import { Organisation } from "./schemas/organisation.schema";
import { OrganisationEvents } from "./enums/OrganisationEvents";
import { OrganisationCreatedEvent } from "../user/events/organisation-created.event";

@Injectable()
export class OrganisationService {
  constructor(
    @InjectModel(Organisation.name) private organisationModel: Model<Organisation>,
    @InjectModel(User.name) private userModel: Model<User>,
    private eventEmitter: EventEmitter2
  ) {}

  async checkNameAvailability(name: string): Promise<boolean> {
    const exists = await this.organisationModel.find({ name: name });
    return exists.length > 0 ? true : false;
  }

  async createNewOrganisation(
    createOrganisationDto: CreateOrganisationDto
  ): Promise<OrganisationDto> {
    const { name, owner } = createOrganisationDto;

    const exists = await this.organisationModel.findOne({ name });
    if (exists) throw new BadRequestException("Organisation already exists.");

    const newOrganisation = new this.organisationModel({
      name,
      owner,
      users: owner
    });

    const savedOrganisation = await newOrganisation.save();
    const organisation = new OrganisationDto(savedOrganisation);

    const organisationEvent = new OrganisationCreatedEvent(organisation);
    this.eventEmitter.emit(OrganisationEvents.ORGANISATION_CREATED, organisationEvent);

    return organisation;
  }

  async getOrganisationDetails(organisationId: string): Promise<OrganisationDto> {
    const organisation = await this.organisationModel
      .findById(organisationId)
      .populate("owner")
      .populate("users");
    if (!organisation) throw new NotFoundException("Organisation not found.");

    return new OrganisationDto(organisation);
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
