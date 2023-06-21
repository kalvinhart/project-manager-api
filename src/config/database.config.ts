import { registerAs } from "@nestjs/config";
import { Config } from "src/core/enums/Config";

export type DatabaseConfig = {
  host: string;
};

export default registerAs(Config.DATABASE, () => ({
  host: process.env.MONGO_URI
}));
