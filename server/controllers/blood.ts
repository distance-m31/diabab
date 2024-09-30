import Router from 'express'
import { prismaClient } from '../utils/dbconnect'
import { z } from 'zod'
import { reqValidate, userValidate } from '../utils/validate'

const bloodRecordSchema = z.object({
  body: z.object({
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
  }),
})

const queryRecordsSchema = z.object({
  query: z.object({
    lastId: z.coerce.number({ required_error: 'lastId is required' }),
    limit: z.coerce.number({ required_error: 'limit value is required' }),
  }),
})

const bloodRouter = Router()

bloodRouter.get(
  '/',
  userValidate,
  reqValidate(queryRecordsSchema),
  async (req, res) => {
    const userId = req.currentUser!.id
    const { lastId, limit } = req.validatedData.query
    let entries = []

    const take = limit

    if (lastId === 0) {
      entries = await prismaClient.bloodRecord.findMany({
        where: { userId: userId },
        take: take,
        orderBy: { id: 'asc' },
      })
    } else {
      entries = await prismaClient.bloodRecord.findMany({
        where: { userId: userId },
        take: take,
        skip: 0,
        cursor: { id: lastId },
        orderBy: { id: 'asc' },
      })
    }

    console.log('-------------------------------------------------------------')
    console.log('Dumping entries:')
    console.log(entries.map((entry) => entry.id).join(', '))

    return res.status(201).json(
      entries.map((entry) => {
        const { userId, ...rest } = entry
        return rest
      })
    )
  }
)

bloodRouter.post(
  '/',
  userValidate,
  reqValidate(bloodRecordSchema),
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
