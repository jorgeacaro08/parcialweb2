import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { Can } from '@nestjs/authorization';
import { ReservationsService } from './reservations.service.js';
import { User } from '../users/entities/user.entity.js';
import { CreateReservationDto } from './dto/create-reservation.dto.js';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly service: ReservationsService) {}

  @Can.Anyone()
  @Post()
  create(@Body() dto: CreateReservationDto, @CurrentUser() user: User) {
    return this.service.create(dto, user);
  }
}