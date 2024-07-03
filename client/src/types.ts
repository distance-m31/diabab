export type LoginInput = {
  username: string
  password: string
}

export interface LoginData {
  username: string
  email: string
  token: string
}

export type StoredLogin = {
  username: string
  email: string
}

export interface RegisterInput {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export interface BloodPaging {
  lastId: number
  limit: number
}

export interface BloodData {
  id: number
  glucose: number
  carbs: number
  carbsRatio: number
  sensitivity: number
  timestamp: string
}

export type BloodFormData = Omit<BloodData, 'id'>

export interface ApiFetchHook<T, P> {
  fetchData: (useAuth: boolean, param: P) => Promise<T | null>
  isLoading: boolean
  error: Error | null
}

export interface ApiPostHook<T, R> {
  postData: (data: R, useAuth: boolean) => Promise<T | null>
  isPosting: boolean
  error: Error | null
}
