import { Department } from './department.entity';
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
import { Subnet } from './subnet.entity';
import { IPAddress } from './ipAddress.entity';

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
    name: 'location',
  })
  location: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'type',
  })
  type: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'model',
  })
  model: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'version',
  })
  version: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'ip_address',
  })
  ip_address: string;

  @Column({
    type: 'int',
    name: 'subnet_id',
  })
  subnet_id: number;

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

  @ManyToOne(type => Subnet, (subnet) => subnet.device)
  @JoinColumn({
    name: 'subnet_id',
  })
  subnet: Subnet;

  @ManyToOne(type => Department, (department) => department.device)
  @JoinColumn({
    name: 'department_id',
  })
  department: Department;

  @OneToMany((type => IPAddress), (ipAddress) => ipAddress.device)
  ipAddress: IPAddress;

}
