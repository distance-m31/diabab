import axios from 'axios'
import { bloodDataUrl } from '../utils/config'
import { BloodData } from '../types'

type GetBloodData = {
  data: BloodData[]
}

/* type CreateBloodData = {
  glucose: number
  carbs: number
}
 */
const createBloodData = async (data: BloodData, token: string) => {
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
      throw new Error('Error creating blood data. ' + error.message)
    }

    console.error(error)
    throw new Error('Error creating blood data. Error unknown.')
  }
}

const getBloodData = async (token: string) => {
  try {
    const { data, status } = await axios.get<BloodData[]>(bloodDataUrl, {
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
      throw new Error('Error fetching blood data. ' + error.message)
    }

    throw new Error('Error fetching blood data. Error unknown.')
  }
}

export { createBloodData, getBloodData }
