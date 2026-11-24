import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class AssignRolesDto {
  @IsArray({ message: 'roles inválidos' })
  @ArrayNotEmpty()
  @IsString({ each: true })
  roles: string[];
}