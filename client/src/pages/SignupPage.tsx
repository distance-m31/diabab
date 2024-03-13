import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import SignupForm from '../components/forms/SignupForm'
import { RegisterInput } from '../types'
import { createUser } from '../services/user'
import useUserStore from '../store/userStore'
import useErrorStore from '../store/errorStore'

const SignupPage: FC = () => {
  const navigate = useNavigate()
  const setParams = useUserStore((state) => state.setParams)
  const setError = useErrorStore((state) => state.setError)

  const handleSignup = async (data: RegisterInput) => {
    console.log('signup', data)
    try {
      const result = await createUser(data)
      if (result) {
        setParams(result.username, result.email, result.token)
      }
      navigate('/')
    } catch (error) {
      console.error('Error:', error)
      if (error instanceof Error) {
        setError(error.message)
      }
    }
  }

  return (
    <div>
      <h1>Signup Page</h1>
      <SignupForm handleLogin={handleSignup} />
    </div>
  )
}

export default SignupPage
