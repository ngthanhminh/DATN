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
} from 'typeorm';
import { Department } from './department.entity';
import { Subnet } from './subnet.entity';

@Entity({
  name: 'devices',
})
export class Device {
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
    name: 'decription',
  })
  decription: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'ip_address',
  })
  ip_address: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'mac_address',
  })
  mac_address: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'ip_type',
  })
  ip_type: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'ip_expries',
  })
  ip_expries: Date;

  @Column({
    type: 'int',
    name: 'department_id',
  })
  department_id: number;

  @Column({
    type: 'int',
    name: 'subnet_id',
  })
  subnet_id: number;


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

  @ManyToOne(type => Department, (department) => department.devices)
  @JoinColumn({
    name: 'department_id',
  })
  department: Department;

  @ManyToOne(type => Subnet, (subnet) => subnet.devices)
  @JoinColumn({
    name: 'subnet_id',
  })
  subnet: Subnet;

}
