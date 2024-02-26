import axios from 'axios'

type BloodData = {
  glucoselevel: number
  carbs: number
}

type GetBloodData = {
  data: BloodData[]
}

type CreateBloodData = {
  glucoselevel: number
}

export async function createBloodData(data: CreateBloodData) {
  try {
    const response = await axios.post('http://localhost:3003/blooddata', data, {
      headers: {
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

export async function getBloodData() {
  try {
    const { data, status } = await axios.get<GetBloodData>(
      'http://localhost:3003/blooddata',
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

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
