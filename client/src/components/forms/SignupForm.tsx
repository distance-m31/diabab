import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from '../Button'
import Divider from '../Divider'
import Text from '../Text'
import FormTextInput from './FormTextInput'
import { useNavigate } from 'react-router-dom'
import { RegisterInput } from '../../types'

const schema = yup.object({
  username: yup
    .string()
    .min(4, ({ min }) => `Username must be at least ${min} characters.`)
    .max(30, ({ max }) => `Username must be no more than ${max} characters.`)
    .required('Username is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(5, ({ min }) => `Password must be at least ${min} characters.`)
    .max(50, ({ max }) => `Password must be no more than ${max} characters.`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Password confirmation is required'),
})

interface RegisterProps {
  handleLogin: (data: RegisterInput) => void
}

const SignupForm: React.FC<RegisterProps> = ({ handleLogin }) => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RegisterInput>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = (data: RegisterInput) => {
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
        label="Email"
        name="email"
        error={errors.email}
        control={control}
      />
      <FormTextInput
        label="Password"
        name="password"
        type="password"
        error={errors.password}
        control={control}
      />
      <FormTextInput
        label="Confirm password"
        name="confirmPassword"
        type="password"
        error={errors.confirmPassword}
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
      <Text variant="h5">Have an account?</Text>
      <Button
        id="create-new-button"
        onClick={() => navigate('/login')}
      >
        Login
      </Button>
    </div>
  )
}

export default SignupForm
