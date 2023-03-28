import { Gateway } from './gateway.entity';
import { ISP } from './isp.entity';
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
    name: 'vlan_id',
  })
  vlan_id: number;


  @Column({
    type: 'int',
    name: 'ISP_id',
  })
  ISP_id: number;

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

  @OneToOne(type => VLAN, (vlan) => vlan.subnet)
  @JoinColumn({
    name: 'vlan_id',
  })
  vlan: VLAN;

  @OneToOne(type => ISP, (isp) => isp.subnet)
  @JoinColumn({
    name: 'ISP_id',
  })
  isp: ISP;

}
