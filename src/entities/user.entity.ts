import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Department } from './department.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'username',
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'role',
  })
  role: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'email',
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'address',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'phone_number',
  })
  phone_number: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;

  @OneToMany(type => Department, (department) => department.user)
  departments: Department[];
}
