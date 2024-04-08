import jwt from 'jsonwebtoken'
import * as config from '../utils/config'
import bcrypt from 'bcrypt'

const tokenFromUser = (username: string, userId: string) => {
  const secretKey: string | undefined = config.JWT_SECRET

  if (!secretKey) {
    throw new Error('JWT_SECRET is not set')
  }
  return jwt.sign({ username, userId }, secretKey)
}

const getHash = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

const pwCompare = async (password: string, passwordHash: string) => {
  return await bcrypt.compare(password, passwordHash)
}

export { tokenFromUser, getHash, pwCompare }
