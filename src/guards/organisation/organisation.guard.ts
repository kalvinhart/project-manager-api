import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Organisation } from "src/modules/organisation/schemas/organisation.schema";

@Injectable()
export class OrganisationGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const organisationId = this.extractOrganisationIdFromHeader(request);

    const { user } = request;

    // Ensure the requested organisation is one of the user's organisations
    const organisation = (user.organisations as Organisation[]).find(
      org => org._id === organisationId
    );
    if (!organisation) return false;

    request.activeOrganisationId = organisationId;

    return true;
  }

  extractOrganisationIdFromHeader(request: Request): string {
    return request.headers.organisationid as string;
  }
}
