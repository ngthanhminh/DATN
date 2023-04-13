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
import { Network } from './network.entity';
import { VLAN } from './vlan.entity';
import { Device } from './device.entity';
import { Department } from './department.entity';

@Entity({
  name: 'subnets',
})
export class Subnet {
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
    name: 'subnet_address',
  })
  subnet_address: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'subnet_mask',
  })
  subnet_mask: string;

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
    type: 'int',
    name: 'department_id',
  })
  department_id: number;

  @Column({
    type: 'int',
    name: 'network_id',
  })
  network_id: number;

  @Column({
    type: 'int',
    name: 'vlan_id',
  })
  vlan_id: number;

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
  devices: Device[];

  @ManyToOne(type => Department, (department) => department.subnets)
  @JoinColumn({
    name: "department_id",
  })
  department: Department;

  @ManyToOne(type => Network, (network) => network.subnets)
  @JoinColumn({
    name: "network_id"
  })
  network: Network;

  @ManyToOne(type => VLAN, (vlan) => vlan.subnets)
  @JoinColumn({
    name: "vlan_id"
  })
  vlan: VLAN;

}
