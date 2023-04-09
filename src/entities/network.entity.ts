import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Subnet } from './subnet.entity';
import { Department } from './department.entity';

@Entity({
  name: 'networks',
})
export class Network {
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
    name: 'ip_address',
  })
  ip_address: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'subnet_mask',
  })
  subnet_mask: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'gateway',
  })
  gateway: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'decription',
  })
  decription: string;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deleted_at?: Date;

  @ManyToOne(type => Department, (department) => department.networks)
  department: Department;

  @OneToMany(type => Subnet, (subnet) => subnet.network)
  subnets: Subnet[];

}