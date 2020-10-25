import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { GroceryList } from './groceryList.entity'

@Entity('items')
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id!: string

  @Column({
    type: 'text'
  })
  name!: string

  @CreateDateColumn({
    type: 'timestamp'
  })
  created!: string

  @ManyToOne(type => GroceryList, groceryList => groceryList.items)
  grocery_list!: GroceryList
}
