import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import baseConfig from "./config/base.config";
import databaseConfig from "./config/database.config";
import { CoreModule } from "./modules/core/core.module";
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      load: [baseConfig, databaseConfig]
    }),
    DatabaseModule,
    UserModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
