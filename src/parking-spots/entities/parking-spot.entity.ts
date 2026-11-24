import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity.js';

export enum ChargerType {
  STANDARD = 'standard',
  FAST = 'fast',
  ULTRA_FAST = 'ultra_fast',
}

@Entity('parking_spots')
export class ParkingSpot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ type: 'enum', enum: ChargerType })
  charger_type: ChargerType;

  @Column({ type: 'uuid' })
  id_supervisor: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_supervisor' })
  supervisor: User;

  @Column({ type: 'timestamp', default: () => 'NOW()' })
  created_at: Date;
}