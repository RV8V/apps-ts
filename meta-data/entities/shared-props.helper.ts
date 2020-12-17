import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class SharedProps {
  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'created_at'
  })
  private createdAt: Date

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'datetime',
    name: 'updated_at'
  })
  private updatedAt: Date
}
