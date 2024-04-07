import * as logger from './logger'
import * as dotenv from 'dotenv'

const path = process.cwd() + '/.env'
dotenv.config({ path })

const JWT_SECRET = process.env.SECRET
const PORT = process.env.PORT || 3003
const MIN_PASSWORD_LENGTH = 8
let FRONTEND_PATH = './build/front_build'

if (process.env.NODE_ENV === 'production') {
  FRONTEND_PATH = './front_build'
  logger.info('Production mode')
} else {
  logger.info('Development mode')
  FRONTEND_PATH = './build/front_build'
}
logger.info(`ENV is ${process.env.NODE_ENV}`)
logger.info(`FRONTEND_PATH is ${FRONTEND_PATH}`)
logger.info(`DATABASE_URL is ${process.env.DATABASE_URL}`)
logger.info(`JWT_SECRET is ${JWT_SECRET}`)

export { FRONTEND_PATH, MIN_PASSWORD_LENGTH, PORT, JWT_SECRET }
