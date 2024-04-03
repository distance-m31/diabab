import axios from 'axios'
import { bloodDataUrl } from '../utils/config'
import { BloodData } from '../types'
import { token } from '../utils/token'

const createBloodData = async (data: BloodData) => {
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

const getBloodData = async () => {
  try {
    console.log('getting blood data with token', token, 'url', bloodDataUrl)
    const { data, status } = await axios.get<BloodData[]>(bloodDataUrl, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    })

    console.log(JSON.stringify(data, null, 4))
    console.log(status)
    return data.map((entry) => {
      const { timestamp, ...rest } = entry
      return { ...rest, timestamp: new Date(timestamp) }
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      throw new Error('Error fetching blood data. ' + error.message)
    }

    throw new Error('Error fetching blood data. Error unknown.')
  }
}

export { createBloodData, getBloodData }
