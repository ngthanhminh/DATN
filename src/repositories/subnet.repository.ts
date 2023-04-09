import { Subnet } from 'src/entities/subnet.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Subnet)
export class SubnetRepository extends Repository<Subnet> { }
