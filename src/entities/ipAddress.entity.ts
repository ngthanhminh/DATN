import { Subnet } from './subnet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { Device } from './device.entity';

@Entity({
  name: 'IP_addresses',
})
export class IPAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'address',
  })
  address: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'subnet_mask',
  })
  subnet_mask: string;

  @Column({
    type: 'varchar',
    name: 'status',
  })
  status: string;

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

  @ManyToOne(type => Device, (device) => device.ipAddress)
  device: Device;

}
