import { createMiddleware } from 'hono/factory';
import { hasRole } from '../../lib/utils';

export const mustBeAuthenticated = () => {
  return createMiddleware(async (c, next) => {
    const user = c.get('user');
    if (!user) return c.text('Unauthorized', 401);

    await next();
  });
};

export const mustBeAnAdmin = () => {
  return createMiddleware(async (c, next) => {
    const user = c.get('user');
    if (!user || !hasRole(user, 'ADMIN')) return c.text('Unauthorized', 401);

    await next();
  });
};

export const mustBeAnPsychology = () => {
  return createMiddleware(async (c, next) => {
    const user = c.get('user');
    if (!user || !hasRole(user, 'PSYCHOLOGY'))
      return c.text('Unauthorized', 401);

    await next();
  });
};
