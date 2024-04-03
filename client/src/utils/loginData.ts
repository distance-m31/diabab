import { LoginData, StoredLogin } from '../types'

export const setLoginData = (data: LoginData) => {
  const storedData: StoredLogin = { username: data.username, email: data.email }
  localStorage.setItem('diabapp-login', JSON.stringify(storedData))
  localStorage.setItem('diabapp-token', data.token)
  console.log('Login data set to', data)
}

export const getStoredToken = () => {
  return localStorage.getItem('diabapp-token')
}

export const getLoginData = () => {
  const loginData = localStorage.getItem('diabapp-login')
  const loginDataAsObj: StoredLogin = loginData ? JSON.parse(loginData) : null
  console.log('Storage login data', loginDataAsObj)
  return loginDataAsObj
}
