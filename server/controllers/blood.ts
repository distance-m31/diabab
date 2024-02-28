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
})

bloodRouter.get('/', userValidate, async (req, res) => {
  const userId = req.currentUser!.id

  const entries = await prismaClient.bloodRecord.findMany({
    where: { userId: userId },
  })
  return res.status(201).json(entries)
})

bloodRouter.post(
  '/',
  userValidate,
  bodyValidate(bloodRecordSchema),
  async (req, res) => {
    console.log('POST /blood')
    console.log(req.body)
    const userId = req.currentUser!.id

    const record = await prismaClient.bloodRecord.create({
      data: {
        glucose: req.body.glucose,
        carbs: req.body.carbs,
        timestamp: new Date().toISOString(),
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
