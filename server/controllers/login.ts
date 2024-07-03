import { tokenFromUser, getHash, pwCompare } from '../utils/pwtoken'
import * as logger from '../utils/logger'
import { prismaClient } from '../utils/dbconnect'
import { z } from 'zod'

import { Router } from 'express'
import { reqValidate } from '../utils/validate'

const loginRouter = Router()

const createUserSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: 'username is required' })
      .min(5)
      .max(20),
    email: z.string({ required_error: 'email is required' }).email(),
    password: z
      .string({ required_error: 'password value is required' })
      .min(5)
      .max(20),
  }),
})

const loginUserSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: 'username is required' })
      .min(5)
      .max(20),
    password: z
      .string({ required_error: 'password value is required' })
      .min(5)
      .max(20),
  }),
})

loginRouter.post(
  '/createuser',
  reqValidate(createUserSchema),
  async (req, res) => {
    const user = await prismaClient.user.findUnique({
      where: {
        username: req.body.username,
      },
    })
    if (user) {
      return res.status(401).json({ error: 'Username taken, try another one!' })
    }

    const passwordHash = await getHash(req.body.password)
    try {
      const user = await prismaClient.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          passwordHash: passwordHash,
        },
      })
      return res.json({
        username: user.username,
        email: user.email,
        token: tokenFromUser(user.username, user.id.toString()),
      })
    } catch (error) {
      logger.exError('Error', error)
      return res.status(400).json({ error: 'Unknown error ' + error })
    }
  }
)

loginRouter.post('/', reqValidate(loginUserSchema), async (req, res) => {
  const user = await prismaClient.user.findUnique({
    where: {
      username: req.body.username,
    },
  })
  if (!user) {
    return res
      .status(401)
      .json({ error: 'Invalid username or password, user not found!' })
  }
  const passwordCorrect = await pwCompare(req.body.password, user.passwordHash)
  if (!passwordCorrect) {
    return res.status(401).json({ error: 'Invalid username or password!' })
  }
  return res.json({
    username: user.username,
    email: user.email,
    token: tokenFromUser(user.username, user.id.toString()),
  })
})

export default loginRouter
