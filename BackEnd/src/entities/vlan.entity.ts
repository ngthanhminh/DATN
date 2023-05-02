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
  OneToMany,
} from 'typeorm';
import { Subnet } from './subnet.entity';

@Entity({
  name: 'vlans',
})
export class VLAN {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
  })
  name: string;


  @Column({
    type: 'varchar',
    name: 'tag',
  })
  tag: string;

  @Column({
    type: 'varchar',
    name: 'decription',
  })
  decription: string;

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

  @OneToMany(type => Subnet, (subnet) => subnet.vlan)
  @JoinColumn({
    name: 'subnet_id',
  })
  subnets: Subnet[];

}
