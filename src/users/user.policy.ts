import { Policy, type PolicyBefore } from '@nestjs/authorization';
import { User } from './entities/user.entity.js';
import { tieneRol } from '../auth/tiene-rol.js';

@Policy()
export class UserPolicy implements PolicyBefore<User> {
  before(user: User | null) {
    if (tieneRol(user, 'admin')) return true;
  }

  list(_user: User | null) {
    return false;
  }

  assignRoles(_user: User | null) {
    return false;
  }
}