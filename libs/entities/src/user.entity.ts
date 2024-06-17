import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ type: () => Number, description: 'ID' })
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  email: string;
}
