import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";
import { OneToMany } from "typeorm/decorator/relations/OneToMany";
import { CategoryPostEntity } from "./category-post.entity";
import { SharedProps } from "./shared-props.helper";

// enum CategoryLabels {
//   coffee = 'coffee',
//   snacks = 'snacks',
//   time = 'time',
//   programming = 'programming'
// }

@Entity({ name: 'categories' })
export class CategoryEntity extends SharedProps {
  constructor(label: string) {
    super();
    this.label = label;
  }

  @PrimaryGeneratedColumn()
  private readonly id: number

  @Column()
  label: string

  @OneToMany(() => CategoryPostEntity, (categoryPosts: CategoryPostEntity) => categoryPosts.category)
  categoryPosts: Array<CategoryPostEntity>

  // @Column({ type: 'enum', enum: CategoryLabels, default: CategoryLabels.programming })
  // label: CategoryLabels
}
