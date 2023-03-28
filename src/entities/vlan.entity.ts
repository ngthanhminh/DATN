import { Department } from './department.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Subnet } from './subnet.entity';
import { Gateway } from './gateway.entity';

@Entity({
  name: 'vlans',
})
export class VLAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'int',
    name: 'code',
  })
  code: number;

  @Column({
    type: 'varchar',
    name: 'decription',
  })
  decription: string;


  @Column({
    type: 'varchar',
    name: 'tag',
  })
  tag: string;

  @Column({
    type: 'int',
    name: 'department_id',
  })
  department_id: number;


  @Column({
    type: 'int',
    name: 'gateway_id',
  })
  gateway_id: number;

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

  @ManyToOne(type => Department, (department => department.vlan))
  @JoinColumn({
    name: 'department_id',
  })
  department: Department;

  @OneToOne(type => Subnet, (subnet => subnet.vlan))
  subnet: Subnet;

  @ManyToOne(type => Gateway, (gateway) => gateway.vlan)
  @JoinColumn({
    name: 'gateway_id',
  })
  gateway: Gateway;
}
