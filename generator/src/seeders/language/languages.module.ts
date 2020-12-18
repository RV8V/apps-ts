import { LanguageSeederService } from "./languages.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Language } from "src/models/language/language.entity";
import { Module } from "@nestjs/common";

/**
 * Import and provide seeder classes for languages.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  providers: [LanguageSeederService],
  exports: [LanguageSeederService],
})
export class LanguageSeederModule {}
