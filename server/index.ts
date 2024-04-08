import express from 'express'
import cors from 'cors'

import { auth } from './middleware/auth'
import loginRouter from './controllers/login'
import bloodRouter from './controllers/blood'
import syshealthRouter from './controllers/syshealth'
import { FRONTEND_PATH, PORT } from './utils/config'

const app = express()
app.use(express.json())
app.use('*', auth)
app.use(cors())

app.use('/', express.static(FRONTEND_PATH))
app.use('/api/login', loginRouter)
app.use('/api/blooddata', bloodRouter)
app.use('/health', syshealthRouter)
app.get('*', (_req, res) => {
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

export default app
