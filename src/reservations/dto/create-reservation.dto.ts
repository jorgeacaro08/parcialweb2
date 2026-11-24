import { IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ChargerType } from '../../parking-spots/entities/parking-spot.entity.js';

export class CreateReservationDto {
  @IsUUID('4', { message: 'id_spot inválido' })
  id_spot: string;

  @IsDateString({}, { message: 'date debe ser una fecha' })
  date: string;

  @IsString()
  @IsNotEmpty({ message: 'vehicle_plate es requerido' })
  vehicle_plate: string;

  @IsEnum(ChargerType, { message: 'vehicle_max_charge inválido' })
  vehicle_max_charge: ChargerType;
}