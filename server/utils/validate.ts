import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const bodyValidate = (schema: AnyZodObject) => {
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
    console.log('not authorized', req.currentUser)
    return res.status(401).json({ error: 'not authorized' })
  }
  return next()
}
