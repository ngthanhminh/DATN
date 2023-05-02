import { VLAN } from 'src/entities/vlan.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(VLAN)
export class VLANRepository extends Repository<VLAN> { }
