import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ChargerType } from '../entities/parking-spot.entity.js';

export class CreateParkingSpotDto {
  @IsString()
  @IsNotEmpty({ message: 'code es requerido' })
  code: string;

  @IsEnum(ChargerType, { message: 'charger_type inválido' })
  charger_type: ChargerType;

  @IsUUID('4', { message: 'id_supervisor inválido' })
  id_supervisor: string;
}