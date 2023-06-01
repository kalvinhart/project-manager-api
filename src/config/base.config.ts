import { registerAs } from "@nestjs/config";
import { Config } from "src/modules/core/enums/Config";

export type BaseConfig = {
  port: number;
  jwtKey: string;
};

export default registerAs(Config.BASE, () => ({
  port: parseInt(process.env.PORT, 10) || 4200,
  jwtKey: process.env.JWT_KEY
}));
