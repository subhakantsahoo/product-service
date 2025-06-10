import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  productId: number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
