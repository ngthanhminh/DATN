import { Network } from 'src/entities/network.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Network)
export class NetworkRepository extends Repository<Network> { }
