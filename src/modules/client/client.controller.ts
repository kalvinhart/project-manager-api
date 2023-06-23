import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { ClientService } from "./client.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { GetClientDto } from "./dto/get-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { OrganisationGuard } from "src/guards/organisation/organisation.guard";

@UseGuards(AuthGuard, OrganisationGuard)
@Controller("client")
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get("/")
  getAll(@Req() request: Request) {
    const { activeOrganisationId } = request;
    return this.clientService.getAllClients(activeOrganisationId);
  }

  @Get("/:clientId")
  getClientById(@Req() request: Request, @Param("clientId") clientId: string) {
    const { activeOrganisationId } = request;

    const getClientDto = new GetClientDto(clientId, activeOrganisationId);

    return this.clientService.getClientById(getClientDto);
  }

  @Post("/")
  createClient(@Body() createClientDto: CreateClientDto) {
    return this.clientService.createClient(createClientDto);
  }

  @Put("/")
  updateClient(@Body() updateClientDto: UpdateClientDto) {
    return this.clientService.updateClient(updateClientDto);
  }
}
