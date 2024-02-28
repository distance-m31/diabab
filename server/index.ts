import express from 'express'
import cors from 'cors'
import { auth } from './middleware/auth'
import loginRouter from './controllers/login'
import bloodRouter from './controllers/blood'

const app = express()
app.use(express.json())
app.use('*', auth)
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}))

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.use('/api/login', loginRouter)
app.use('/api/blooddata', bloodRouter)

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
