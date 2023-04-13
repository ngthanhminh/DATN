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
import { Device } from './device.entity';
import { Network } from './network.entity';
import { User } from './user.entity';
import { Subnet } from './subnet.entity';

@Entity({
  name: 'departments',
})
export class Department {
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
    name: 'location',
  })
  location: string;

  @Column({
    type: 'int',
    name: 'user_id',
  })
  user_id: number;

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

  @OneToMany(type => Subnet, (subnet) => subnet.department)
  subnets: Subnet[];

  @OneToMany(type => Device, (device) => device.department)
  devices: Device[];

  @ManyToOne(type => User, (user) => user.departments)
  @JoinColumn({
    name: "user_id"
  })
  user: User;
}
