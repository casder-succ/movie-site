import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserDocument } from 'users/users.schema';

export const User = createParamDecorator((data: keyof UserDocument, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const { user } = request;

  return data ? user[data] : user;
});
