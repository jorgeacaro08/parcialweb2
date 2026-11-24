import { Body, Controller, Get, Post } from '@nestjs/common';
import { Can } from '@nestjs/authorization';
import { RolesService } from './roles.service.js';
import { CreateRoleDto } from './dto/create-role.dto.js';
import { RolePolicy } from './role.policy.js';

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Can(RolePolicy, 'list')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Can(RolePolicy, 'create')
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.service.create(dto);
  }
}