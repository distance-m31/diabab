import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'
import * as logger from './logger'

export const bodyValidate = (schema: AnyZodObject) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (req: any, res: any, next: any) => {
    try {
      await schema.parseAsync(req.body)
      next()
    } catch (error) {
      res.status(400).json(error)
    }
  }
}

export const userValidate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.currentUser?.id
  if (!userId) {
    logger.error('User validation failed, no valid user id')
    return res.status(401).json({ error: 'Not authorized' })
  }
  return next()
}
