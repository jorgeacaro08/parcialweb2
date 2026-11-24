import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity.js';
import { CreateRoleDto } from './dto/create-role.dto.js';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly repo: Repository<Role>,
  ) {}

  async findAll() {
    try {
      return await this.repo.find();
    } catch {
      throw new InternalServerErrorException('Error al obtener roles');
    }
  }

  async create(dto: CreateRoleDto) {
    if (await this.repo.existsBy({ role_name: dto.role_name })) {
      throw new ConflictException('role_name ya existe');
    }
    const role = await this.repo.save(this.repo.create(dto));
    return { message: 'Rol creado con éxito', roleId: role.id };
  }
}