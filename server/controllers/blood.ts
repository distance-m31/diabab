import Router from 'express'
import { prismaClient } from '../utils/dbconnect'
import { z } from 'zod'
import { bodyValidate, userValidate } from '../utils/validate'

const bloodRouter = Router()

const bloodRecordSchema = z.object({
  glucose: z
    .number({ required_error: 'glucose value is required' })
    .gte(0)
    .lte(100),
  carbs: z
    .number({ required_error: 'carbs value is required' })
    .gte(0)
    .lte(300),
  carbsRatio: z.number().gte(1).lte(100),
  sensitivity: z.number().gte(1).lte(100),
  timestamp: z.string().datetime(),
})

bloodRouter.get('/', userValidate, async (req, res) => {
  const userId = req.currentUser!.id
  const entries = await prismaClient.bloodRecord.findMany({
    where: { userId: userId },
  })
  return res.status(201).json(
    entries.map((entry) => {
      const { id, userId, ...rest } = entry
      return rest
    })
  )
})

bloodRouter.post(
  '/',
  userValidate,
  bodyValidate(bloodRecordSchema),
  async (req, res) => {
    const userId = req.currentUser!.id

    const record = await prismaClient.bloodRecord.create({
      data: {
        glucose: req.body.glucose,
        carbs: req.body.carbs,
        carbsRatio: req.body.carbsRatio,
        sensitivity: req.body.sensitivity,
        timestamp: req.body.timestamp,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
    return res.status(201).send(record)
  }
)

export default bloodRouter
