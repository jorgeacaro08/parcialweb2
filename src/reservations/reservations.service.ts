import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity.js';
import { User } from '../users/entities/user.entity.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly repo: Repository<Reservation>,
  ) {}

  async create(dto: CreateReservationDto, user: User) {
    const reservation = await this.repo.save(
      this.repo.create({ ...dto, id_user: user.id }),
    );
    return { message: 'Reserva creada', reservationId: reservation.id };
  }
}