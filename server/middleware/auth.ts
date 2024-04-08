import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import * as config from '../utils/config'
import { prismaClient } from '../utils/dbconnect'
import * as logger from '../utils/logger'

export const auth = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const secretKey: string | undefined = config.JWT_SECRET
  if (!secretKey) {
    throw new Error('JWT_SECRET is not set')
  }

  console.log('In auth middleware')
  const auth = req.headers['authorization']
  if (!req.headers['authorization']) {
    console.log('No auth header found')
    return next()
  }

  if (auth && auth.toLocaleLowerCase().startsWith('bearer ')) {
    console.log('Got token:', auth.substring(7))
    try {
      const decodedToken = jwt.verify(auth.substring(7), secretKey)

      if (typeof decodedToken !== 'string') {
        console.log('Got token:', decodedToken)
      }

      if (typeof decodedToken === 'string') {
        throw new Error('Token messed up!')
      }
      const userId = parseInt(decodedToken.userId)
      const userInDb = await prismaClient.user.findUnique({
        where: { id: userId },
      })
      if (!userInDb) {
        throw new Error('User not found')
      }
      req.currentUser = { id: userId, username: userInDb.username }
      next()
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        logger.error(
          'Middleware: Token decode failed',
          (error as { message: string }).message,
          'auth',
          auth.substring(7)
        )
      }
    }
    return null
  }
  return next()
}
