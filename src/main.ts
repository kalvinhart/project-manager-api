import { NestFactory, PartialGraphHost } from "@nestjs/core";
import fs from "fs";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false
  });
  app.setGlobalPrefix("api");
  await app.listen(4200);
}
bootstrap().catch(() => {
  fs.writeFileSync("graph.json", PartialGraphHost.toString() ?? "");
  process.exit(1);
});
