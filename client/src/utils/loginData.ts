import { LoginData, StoredLogin } from '../types'

export const setLoginData = (data: LoginData) => {
  const storedData: StoredLogin = { username: data.username, email: data.email }
  localStorage.setItem('diabapp-login', JSON.stringify(storedData))
  localStorage.setItem('diabapp-token', data.token)
}

export const clearLoginData = () => {
  localStorage.removeItem('diabapp-login')
  localStorage.removeItem('diabapp-token')
}

export const getStoredToken = () => {
  return localStorage.getItem('diabapp-token')
}

export const getLoginData = () => {
  const loginData = localStorage.getItem('diabapp-login')
  const loginDataAsObj: StoredLogin = loginData ? JSON.parse(loginData) : null
  return loginDataAsObj
}
