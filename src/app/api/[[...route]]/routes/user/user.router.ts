import { Hono } from 'hono';
import { mustBeAnAdmin, mustBeAuthenticated } from '../middleware/auth';
import db from '@/lib/db';
import { hasRole, uploadFile } from '../../lib/utils';
import { zValidator } from '@hono/zod-validator';
import { createUserSchema, updateUserSchema } from './user.type';
import { generateId } from 'better-auth';
import { UserRole } from '@/types';

const users = new Hono()
  .get('/', mustBeAnAdmin(), async (c) => {
    const users = await db.user.findMany();

    return c.json({
      data: users,
    });
  })
  .get('/:id', mustBeAuthenticated(), async (c) => {
    const { id } = c.req.param();
    const session = c.get('user')!;

    if (id !== session.id && !hasRole(session, 'ADMIN'))
      return c.json({ error: 'Unauthorized' }, 401);

    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return c.json({
      data: user,
    });
  })
  .post(
    '/',
    mustBeAnAdmin(),
    zValidator('json', createUserSchema),
    async (c) => {
      const data = c.req.valid('json');

      const alreadyExist = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });
      if (alreadyExist) return c.json({ error: 'Email already exist' }, 400);

      await db.user.create({
        data: {
          id: generateId(),
          email: data.email,
          name: data.name,
          role: data.role,
          emailVerified: false,
        },
      });

      return c.json({ message: 'Sucessfully to create user' }, 200);
    },
  )
  .patch(
    '/:id',
    mustBeAuthenticated(),
    zValidator('form', updateUserSchema),
    async (c) => {
      const { id } = c.req.param();
      const data = c.req.valid('form');
      const session = c.get('session')!;

      if (
        (id !== session!.id || data.role) &&
        !hasRole(session!, UserRole.ADMIN)
      )
        return c.json({ error: 'Unauthorized' }, 401);

      let fileName: string | undefined;

      if (data.image) {
        const upload = await uploadFile(data.image);

        fileName = upload.fileName;
      }

      await db.user.update({
        where: {
          id: session.id,
        },
        data: {
          ...data,
          image: fileName,
        },
      });

      return c.json({ message: 'Sucessfully to update user' }, 200);
    },
  )
  .delete('/:id', mustBeAuthenticated(), async (c) => {
    const { id } = c.req.param();
    const session = c.get('session')!;

    if (id !== session!.id && !hasRole(session!, 'ADMIN'))
      return c.json({ error: 'Unauthorized' }, 401);

    await db.user.delete({
      where: {
        id,
      },
    });

    return c.json({ message: 'Sucessfully to delete user' }, 200);
  });

export default users;
