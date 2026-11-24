import { Body, Controller, Post } from '@nestjs/common';
import { Can } from '@nestjs/authorization';
import { ParkingSpotsService } from './parking-spots.service.js';
import { ParkingSpotPolicy } from './parking-spot.policy.js';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto.js';

@Controller('parking-spots')
export class ParkingSpotsController {
  constructor(private readonly service: ParkingSpotsService) {}

  @Can(ParkingSpotPolicy, 'create')
  @Post('crear_puesto')
  create(@Body() dto: CreateParkingSpotDto) {
    return this.service.create(dto);
  }
}