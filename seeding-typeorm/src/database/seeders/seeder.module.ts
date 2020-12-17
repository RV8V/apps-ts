import { MysqlDatabaseProviderModule } from "src/providers/database/mysql/provider.module";
import { LanguageSeederModule } from "./language/languages.module";
import { Logger, Module } from "@nestjs/common";
import { Seeder } from "./seeder";

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
  imports: [MysqlDatabaseProviderModule, LanguageSeederModule],
  providers: [MysqlSeederService, Logger, Seeder],
})
export class SeederModule {}
