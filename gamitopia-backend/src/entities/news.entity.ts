import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class News extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text", { array: true, default: {} })
  tags: string[];

  @Column()
  title: string;

  @Column({ default: "" })
  bodyAsMarkdown: string;

  @Column({ default: "" })
  bodyAsHTML: string;

  @Column()
  date: Date;
}
