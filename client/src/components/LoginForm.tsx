import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from './Button'
import Divider from './Divider'
import Text from './Text'
import FormTextInput from './FormTextInput'
import { useNavigate } from 'react-router-dom'
import { LoginInput } from '../types'

const schema = yup.object({
  username: yup
    .string()
    .min(4, ({ min }) => `Username must be at least ${min} characters.`)
    .max(30, ({ max }) => `Username must be no more than ${max} characters.`)
    .required('Username is required'),
  password: yup
    .string()
    .min(5, ({ min }) => `Password must be at least ${min} characters.`)
    .max(50, ({ max }) => `Password must be no more than ${max} characters.`)
    .required('Password is required'),
})

interface LoginFormProps {
  handleLogin: (data: LoginInput) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin }) => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginInput>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: LoginInput) => {
    console.log('comes here', data)
    handleLogin(data)
  }

  return (
    <div style={{ margin: 'auto', width: '50%' }}>
      <Text variant="h5"> Sign in</Text>
      <FormTextInput
        label="Username"
        name="username"
        error={errors.username}
        control={control}
      />
      <FormTextInput
        label="Password"
        name="password"
        type="password"
        error={errors.password}
        control={control}
      />
      <Button
        id="login-button"
        onClick={handleSubmit(onSubmit)}
        type="submit"
      >
        Submit
      </Button>

      <Divider />
      <Text variant="h5">Do not have an account?</Text>
      <Button
        id="create-new-button"
        onClick={() => navigate('/signup')}
      >
        Create a New Account
      </Button>
    </div>
  )
}

export default LoginForm
