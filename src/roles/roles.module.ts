import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity.js';
import { RolesController } from './roles.controller.js';
import { RolesService } from './roles.service.js';
import { RolePolicy } from './role.policy.js';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService, RolePolicy],
})
export class RolesModule {}