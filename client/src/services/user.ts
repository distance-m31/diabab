import axios from 'axios'

type LoginData = {
  username: string
  password: string
}

export const createUser = async () => {
  try {
    const response = await axios.post('http://localhost:3003/users', {
      username: 'test',
      password: 'test'
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response)
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      return error.message
    }      
     
    console.error(error)
    return error
  }
}

export async function login(data: LoginData) {
  try {
    const response = await axios.post('http://localhost:3003/login', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response)
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      return error.message
    }      
     
    console.error(error)
    return error
  }    
}
