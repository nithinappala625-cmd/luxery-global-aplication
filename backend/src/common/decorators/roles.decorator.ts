import { SetMetadata } from '@nestjs/common';

export type UserRoleType = 'buyer' | 'seller' | 'dealer' | 'auction_house' | 'admin';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoleType[]) => SetMetadata(ROLES_KEY, roles);
