import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ClientDto } from "./dto/client.dto";
import { CreateClientDto } from "./dto/create-client.dto";
import { GetClientDto } from "./dto/get-client.dto";
import { UpdateClientProjectsDto } from "./dto/update-client-projects.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Client } from "./schemas/client.schema";

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  async createClient(createClientDto: CreateClientDto): Promise<ClientDto> {
    const existingClient = await this.clientModel.findOne({
      name: createClientDto.name,
      organisationId: createClientDto.organisationId
    });
    if (existingClient) throw new BadRequestException("A client with this name already exists.");

    const newClient = new this.clientModel({ ...createClientDto });
    const savedClient = await newClient.save();

    return new ClientDto(savedClient);
  }

  async getAllClients(organisationId: string): Promise<ClientDto[]> {
    const clients = await this.clientModel.find({ organisation: organisationId });

    return clients.map(client => new ClientDto(client));
  }

  async getClientById(getClientDto: GetClientDto): Promise<ClientDto> {
    const { clientId, organisationId } = getClientDto;

    const client = await this.clientModel.findOne({
      _id: clientId,
      organisationId: organisationId
    });
    if (!client) throw new NotFoundException("Client not found.");

    return new ClientDto(client);
  }

  async updateClient(updateClientDto: UpdateClientDto): Promise<ClientDto> {
    const updatedClient = await this.clientModel.findByIdAndUpdate(
      updateClientDto._id,
      updateClientDto,
      {
        new: true,
        runValidators: true
      }
    );
    if (!updatedClient) throw new NotFoundException("Client not found.");

    return new ClientDto(updatedClient);
  }

  public async updateClientProjects(
    updateClientProjectsDto: UpdateClientProjectsDto
  ): Promise<void> {
    const { clientId, projectId, organisationId } = updateClientProjectsDto;

    await this.clientModel.findOneAndUpdate(
      { _id: clientId, organisationId: organisationId },
      { $push: { projects: projectId } },
      { new: true, runValidators: true }
    );
  }
}
