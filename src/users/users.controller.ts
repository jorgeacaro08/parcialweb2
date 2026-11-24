import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { CurrentUser } from '@nestjs/authentication';
import { Can } from '@nestjs/authorization';
import { UsersService } from './users.service.js';
import { User } from './entities/user.entity.js';
import { UserPolicy } from './user.policy.js';
import { AssignRolesDto } from './dto/assign-roles.dto.js';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Can.Anyone()
  @Get('me')
  me(@CurrentUser() user: User) {
    return this.service.me(user.id);
  }

  @Can(UserPolicy, 'list')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Can(UserPolicy, 'assignRoles')
  @Patch(':id/roles')
  assignRoles(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: AssignRolesDto,
  ) {
    return this.service.assignRoles(id, dto.roles);
  }
}