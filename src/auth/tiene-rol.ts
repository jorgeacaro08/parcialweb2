import { User } from '../users/entities/user.entity.js';

export function tieneRol(user: User | null, ...roles: string[]) {
  if (!user) return false;
  return user.roles.some((role) => roles.includes(role.role_name));
}