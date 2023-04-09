import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Device } from './device.entity';
import { Subnet } from './subnet.entity';

@Entity({
  name: 'connections',
})
export class Connection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    name: 'device_id',
  })
  device_id: number;

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

  @ManyToOne(type => Device, (device) => device.connections)
  @JoinColumn({
    name: "device_id",
  })
  device: Device;

  @ManyToOne(type => Subnet, (subnet) => subnet.connections)
  @JoinColumn({
    name: "subnet_id",
  })
  subnet: Subnet;

}
