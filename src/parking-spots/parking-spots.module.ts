import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingSpot } from './entities/parking-spot.entity.js';
import { ParkingSpotsService } from './parking-spots.service.js';
import { ParkingSpotsController } from './parking-spots.controller.js';
import { ParkingSpotPolicy } from './parking-spot.policy.js';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingSpot])],
  controllers: [ParkingSpotsController],
  providers: [ParkingSpotsService, ParkingSpotPolicy],
})
export class ParkingSpotsModule {}