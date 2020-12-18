import { Logger, Module } from "@nestjs/common";
import { LanguageSeederModule } from "./language/languages.module";
import { Seeder } from "./seeder";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Language } from "src/models/language/language.entity";
import { DatabaseConnectionService } from "src/database-connection.service";
import { LanguageSeederService } from "./language/languages.service";

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService,
    }),
    LanguageSeederModule],
  providers: [Logger, Seeder],
})
export class SeederModule {}
