import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PasswordHasher } from '@nestjs/authentication';
import { User } from './entities/user.entity.js';
import { Role } from '../roles/entities/role.entity.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepo: Repository<Role>,
    private readonly hasher: PasswordHasher,
  ) {}

  findById(id: string) {
    return this.repo.findOne({ where: { id }, relations: { roles: true } });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email }, relations: { roles: true } });
  }

  async register(dto: CreateUserDto) {
    if (await this.repo.existsBy({ email: dto.email })) {
      throw new ConflictException('Email ya registrado');
    }
    const password = await this.hasher.hash(dto.password);
    const user = await this.repo.save(this.repo.create({ ...dto, password }));
    return { message: 'Usuario registrado con éxito', userId: user.id };
  }

  async verifyCredentials(email: string, password: string) {
    const user = await this.findByEmail(email);
    const valid = await this.hasher.verify(password, user?.password);
    return user && valid ? user : null;
  }

  async me(id: string) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      roles: user.roles.map((role) => role.role_name),
    };
  }

  async findAll() {
    try {
      const users = await this.repo.find({
        relations: { roles: true },
        order: { email: 'ASC' },
      });
      return users.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        roles: user.roles.map((role) => role.role_name),
      }));
    } catch {
      throw new InternalServerErrorException('Error al listar usuarios');
    }
  }

  async assignRoles(id: string, names: string[]) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('Usuario no encontrado');
    const roles = await this.rolesRepo.findBy({ role_name: In(names) });
    if (roles.length !== names.length) {
      throw new BadRequestException('roles inválidos');
    }
    user.roles = roles;
    await this.repo.save(user);
    return { message: 'Roles asignados' };
  }
}