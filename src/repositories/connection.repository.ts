import { Connection } from 'src/entities/connection.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Connection)
export class ConnectionRepository extends Repository<Connection> { }
