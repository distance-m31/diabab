import { FC } from 'react'
import SignupForm from '../components/SignupForm'
import { RegisterInput } from '../types'

const SignupPage: FC = () => {
  const handleSignup = (data: RegisterInput) => {
    console.log('signup', data)
  }

  return (
    <div>
      <h1>Signup Page</h1>
      <SignupForm handleLogin={handleSignup} />
    </div>
  )
}

export default SignupPage
