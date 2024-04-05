import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from '../Button'
import Divider from '../Divider'
import Text from '../Text'
import FormTextInput from './FormTextInput'
import { useNavigate } from 'react-router-dom'
import { LoginInput } from '../../types'
import Box from '../Box'

const schema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
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
    handleLogin(data)
  }

  return (
    <div>
      <Box
        type="shadow"
        subClassName="bg-blue-500 justify-center mt-10 mb-0 rounded-t-lg"
      >
        <Text
          variant="h2"
          subClassName="text-white pt-1 pb-1"
        >
          Sign in to DiabApp
        </Text>
      </Box>
      <Box type="shadow">
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
          Login
        </Button>

        <Divider />
        <Text variant="h5">Do not have an account?</Text>
        <Button
          id="create-new-button"
          onClick={() => navigate('/signup')}
        >
          New Account
        </Button>
      </Box>
    </div>
  )
}

export default LoginForm
