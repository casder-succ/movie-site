import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards/jwt.guard';
import { AdminGuard } from '../guards/admin.guard';

type AuthRole = 'admin' | 'user' | undefined;

export const Auth = (role: AuthRole = 'user') => (
  applyDecorators(role === 'admin'
    ? UseGuards(JwtGuard, AdminGuard)
    : UseGuards(JwtGuard))
);
