import axios from 'axios'
import { bloodDataUrl } from '../utils/config'

type BloodData = {
  glucoselevel: number
  carbs: number
}

type GetBloodData = {
  data: BloodData[]
}

type CreateBloodData = {
  glucose: number
  carbs: number
}

export async function createBloodData(data: CreateBloodData, token: string) {
  try {
    const response = await axios.post(bloodDataUrl, data, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })
    console.log(response)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      return error.message
    }

    console.error(error)
    return error
  }
}

export async function getBloodData(token: string) {
  try {
    const { data, status } = await axios.get<GetBloodData>(bloodDataUrl, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })

    console.log(JSON.stringify(data, null, 4))
    console.log(status)
    return data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      return error.message
    }

    console.error(error)
    return error
  }
}
