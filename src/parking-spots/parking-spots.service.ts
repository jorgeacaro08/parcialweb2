import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingSpot } from './entities/parking-spot.entity.js';
import { CreateParkingSpotDto } from './dto/create-parking-spot.dto.js';

@Injectable()
export class ParkingSpotsService {
  constructor(
    @InjectRepository(ParkingSpot)
    private readonly repo: Repository<ParkingSpot>,
  ) {}

  async create(dto: CreateParkingSpotDto) {
    const spot = await this.repo.save(this.repo.create(dto));
    return { message: 'Puesto de carga creado con éxito', spotId: spot.id };
  }
}