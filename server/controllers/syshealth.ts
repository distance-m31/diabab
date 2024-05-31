import { Router } from 'express'

const syshealthRouter = Router()

syshealthRouter.get('/health', async (_req, res) => {
  return res.status(200).send('ok')
})

export default syshealthRouter
