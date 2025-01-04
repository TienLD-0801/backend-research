import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoriesEntity } from './categories.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  categoryId: number;

  @Column()
  price: number;

  @Column({ default: '' })
  url: string;

  @Column({ default: '' })
  url_id: string;

  @Column()
  description: string;

  @ManyToOne(() => CategoriesEntity, (category) => category.products)
  @JoinColumn({
    name: 'categoryId',
    referencedColumnName: 'id',
  })
  category: CategoriesEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
