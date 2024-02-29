export type LoginInput = {
  username: string
  password: string
}

export interface RegisterInput extends LoginInput {
  email: string
  confirmPassword: string
}

export interface BloodData {
  glucose: number
  carbs: number
  carbsRatio: number
  sensitivity: number
  timestamp: Date
}
