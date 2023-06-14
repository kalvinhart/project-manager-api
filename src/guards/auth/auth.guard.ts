import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/modules/user/schemas/user.schema";
import { Organisation } from "src/modules/organisation/schemas/organisation.schema";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const userPayload: User = await this.jwtService.verifyAsync(token);
      const organisationId = this.extractOrganisationIdFromHeader(request);

      // Ensure the requested organisation is one of the user's organisations
      const organisation = (userPayload.organisations as Organisation[]).find(
        o => o._id === organisationId
      );
      if (!organisation) return false;

      request.user = userPayload;
      request.activeOrganisationId = organisationId;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  extractOrganisationIdFromHeader(request: Request): string {
    return request.headers.organisationId as string;
  }
}
