import axios from 'axios'

axios.defaults.baseURL =
  import.meta.env.VITE_API_URL || 'http://localhost:3003/api'
export const loginUrl = `/login`
export const createUserUrl = `/login/createuser`
export const bloodDataUrl = `/blooddata`

console.log('API URL:', axios.defaults.baseURL)
