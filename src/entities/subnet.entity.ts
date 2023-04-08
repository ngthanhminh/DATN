import { Gateway } from './gateway.entity';
import { Department } from './department.entity';
import { VLAN } from './vlan.entity';
import { Device } from './device.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({
  name: 'subnets',
})
export class Subnet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'decription',
  })
  decription: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'permission',
  })
  permission: string;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: number;

  @Column({
    type: 'int',
    name: 'department_id',
  })
  department_id: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  created_at: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updated_at: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  deleted_at?: Date;

  @OneToMany(type => Device, (device) => device.subnet)
  device: Device[];

  @ManyToOne(type => Department, (department) => department.subnet)
  @JoinColumn({
    name: "department_id"
  })
  department: Department;

}
