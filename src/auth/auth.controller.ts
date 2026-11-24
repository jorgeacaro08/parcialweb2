import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Public, TokenService } from '@nestjs/authentication';
import { UsersService } from '../users/users.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshDto } from './dto/refresh.dto.js';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly users: UsersService,
    private readonly tokens: TokenService,
  ) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.users.register(dto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.users.verifyCredentials(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');
    if (!user.is_active) throw new HttpException('Usuario desactivado', 423);
    return this.tokens.issue(user.id, { method: 'password' });
  }

  @HttpCode(200)
  @Post('refresh')
  refresh(@Body() dto: RefreshDto) {
    return this.tokens.refresh(dto.refreshToken);
  }

  @HttpCode(204)
  @Post('logout')
  async logout(@Body() dto: RefreshDto) {
    await this.tokens.revoke(dto.refreshToken);
  }
}