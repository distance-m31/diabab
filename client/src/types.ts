export type LoginInput = {
  username: string
  password: string
}

export interface RegisterInput extends LoginInput {
  email: string
  confirmPassword: string
}
