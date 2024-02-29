import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import SignupForm from '../components/forms/SignupForm'
import { RegisterInput } from '../types'
import { createUser } from '../services/user'
import useUserStore from '../store'

const SignupPage: FC = () => {
  const navigate = useNavigate()
  const setUsername = useUserStore((state) => state.setUsername)
  const setToken = useUserStore((state) => state.setToken)
  const setEmail = useUserStore((state) => state.setEmail)

  const handleSignup = async (data: RegisterInput) => {
    console.log('signup', data)
    const result = await createUser(data)
    console.log(result)
    if (result) {
      setUsername(result.username)
      setEmail(result.email)
      setToken(result.token)
    }
    navigate('/')
  }

  return (
    <div>
      <h1>Signup Page</h1>
      <SignupForm handleLogin={handleSignup} />
    </div>
  )
}

export default SignupPage
