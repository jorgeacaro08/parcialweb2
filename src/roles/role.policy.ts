import { Policy, type PolicyBefore } from '@nestjs/authorization';
import { User } from '../users/entities/user.entity.js';
import { tieneRol } from '../auth/tiene-rol.js';

@Policy()
export class RolePolicy implements PolicyBefore<User> {
  before(user: User | null) {
    if (tieneRol(user, 'admin')) return true;
  }

  list(_user: User | null) {
    return false;
  }

  create(_user: User | null) {
    return false;
  }
}