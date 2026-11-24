import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';
import {
  ParkingSpot,
} from '../../parking-spots/entities/parking-spot.entity.js';


export enum ChargerType {
  STANDARD = 'standard',
  FAST = 'fast',
  ULTRA_FAST = 'ultra_fast',
}

export enum ReservationStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  id_user: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column({ type: 'uuid' })
  id_spot: string;

  @ManyToOne(() => ParkingSpot)
  @JoinColumn({ name: 'id_spot' })
  spot: ParkingSpot;

  @Column({ type: 'date' })
  date: string;

  @Column()
  vehicle_plate: string;

  @Column({ type: 'enum', enum: ChargerType })
  vehicle_max_charge: ChargerType;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;
}
