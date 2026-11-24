import { Policy } from '@nestjs/authorization';
import { User } from '../users/entities/user.entity.js';
import { tieneRol } from '../auth/tiene-rol.js';

@Policy()
export class ParkingSpotPolicy {
  create(user: User | null) {
    return tieneRol(user, 'admin');
  }
}