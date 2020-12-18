import { ILanguage } from "./language.interface";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Entity Schema for Languages.
 *
 * @class
 */
@Entity({
  name: 'languages',
})
export class Language implements ILanguage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
