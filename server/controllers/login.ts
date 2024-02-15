
import { tokenFromUser, getHash, pwCompare } from '../utils/pwtoken';
import * as logger from '../utils/logger';
import { prismaClient } from '../utils/dbconnect';
import { z } from 'zod';

import { Router } from 'express';
import { bodyValidate } from '../utils/validate';
const loginRouter = Router()

const createUserSchema = z.object({
  username: z.string({ required_error: 'username is required'}).min(5).max(20),
  password: z.string({ required_error: 'password value is required'}).min(5).max(20),
});

const loginUserSchema = z.object({
  username: z.string({ required_error: 'username is required'}).min(5).max(20),
  password: z.string({ required_error: 'password value is required'}).min(5).max(20),
});

loginRouter.post('/createuser', bodyValidate(createUserSchema), async (req, res) => {
  logger.info('Creating user', JSON.stringify(req.body, null, 4));
  
  const passwordHash = await getHash(req.body.password);
  try {
  const user = await prismaClient.user.create({
    data: {
      username: req.body.username,
      passwordHash: passwordHash,
    },
  });
  logger.info('User created', JSON.stringify(user, null, 4), tokenFromUser(user.username, user.id.toString()));
  return res.json({ token: tokenFromUser(user.username, user.id.toString()) });
  } catch(error) {
    logger.exError('Error', error)
    return res.status(400).json({ error: 'error perror' + error })   
  }  
});

loginRouter.post('/', bodyValidate(loginUserSchema), async (req, res) => {
  logger.info('Logging in', JSON.stringify(req.body, null, 4));
  const user = await prismaClient.user.findUnique({
    where: {
      username: req.body.username,
    },
  });
  if (!user) {
    return res.status(401).json({ error: 'invalid username or password' });
  }
  const passwordCorrect = await pwCompare(req.body.password, user.passwordHash);
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'invalid username or password' });
  }
  return res.json({ token: tokenFromUser(user.username, user.id.toString()) });
}
);

export default loginRouter;