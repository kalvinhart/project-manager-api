import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import baseConfig, { BaseConfig } from "./config/base.config";
import databaseConfig from "./config/database.config";
import { CoreModule } from "./core/core.module";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { OrganisationModule } from "./modules/organisation/organisation.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { JwtModule } from "@nestjs/jwt";
import { ClientModule } from "./modules/client/client.module";
import { Config } from "./core/enums/Config";

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
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<BaseConfig>(Config.BASE)?.jwtKey,
        signOptions: {
          expiresIn: "7d"
        }
      }),
      inject: [ConfigService],
      global: true
    }),
    OrganisationModule,
    EventEmitterModule.forRoot(),
    ClientModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
