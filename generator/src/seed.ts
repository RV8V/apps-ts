import { NestFactory } from "@nestjs/core";
import { SeederModule } from "./seeders/seeder.module";
import { Seeder } from "./seeders/seeder";
import { Logger } from "@nestjs/common/services/logger.service";

async function bootstrap() {
  NestFactory.createApplicationContext(SeederModule)
    .then(appContext => {
      const logger = appContext.get(Logger);
      const seeder = appContext.get(Seeder);
      seeder
        .seed()
        .then(() => {
          logger.debug('Seeding complete!');
        })
        .catch(error => {
          logger.error('Seeding failed!'); 
          throw error;
        })
        .finally(() => appContext.close());
    })
    .catch(error => {
      throw error;
    });
}
bootstrap();
