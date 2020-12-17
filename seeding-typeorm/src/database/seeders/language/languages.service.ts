import { Language } from "src/models/language/entities/language.entity";
import { languages } from "./data";
import { ILanguage } from "src/models/language/interfaces/language.interface";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm"
import { Injectable } from "@nestjs/common";

/**
 * Service dealing with language based operations.
 *
 * @class
 */
@Injectable()
export class LanguageSeederService {
  /**
   * Create an instance of class.
   *
   * @constructs
   *
   * @param {Repository<Language>} languageRepository
   */
  constructor(
    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>,
  ) {}
  /**
   * Seed all languages.
   *
   * @function
   */
  create(): Array<Promise<Language>> {
    return languages.map(async (language: ILanguage) => {
      return await this.languageRepository
        .findOne({ name: language.name })
      //  .exec()
        .then(async dbLangauge => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbLangauge) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.languageRepository.create(language),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}
