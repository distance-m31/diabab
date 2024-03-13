import axios from 'axios'
import { loginUrl, createUserUrl } from '../utils/config'

type LoginData = {
  username: string
  password: string
}

type RegisterData = {
  username: string
  email: string
  password: string
}

export const createUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(createUserUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      throw new Error(error.message)
    }

    console.error(error)
    return error
  }
}

export async function login(data: LoginData) {
  try {
    const response = await axios.post(loginUrl, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      throw new Error(error.message)
    }
    console.error(error)
    return error
  }
}
