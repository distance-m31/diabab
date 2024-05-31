import { PrismaClient } from '@prisma/client'
import { DATABASE_URL } from './config'

export const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
})
