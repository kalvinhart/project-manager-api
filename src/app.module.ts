import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import baseConfig from "./config/base.config";
import databaseConfig from "./config/database.config";
import { CoreModule } from "./core/core.module";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { OrganisationModule } from "./modules/organisation/organisation.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      load: [baseConfig, databaseConfig],
      isGlobal: true,
      cache: true
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    OrganisationModule,
    EventEmitterModule.forRoot()
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
