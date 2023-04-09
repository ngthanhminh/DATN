import { Device } from 'src/entities/device.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Device)
export class DeviceRepository extends Repository<Device> { }
