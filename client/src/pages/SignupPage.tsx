import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SignupForm from '../components/forms/SignupForm'
import { LoginData, RegisterInput } from '../types'
//import { createUser } from '../services/user'
import useUserStore from '../store/userStore'
import useErrorStore from '../store/errorStore'
import { usePostApi } from '../utils/useServer'
import { setLoginData } from '../utils/loginData'
import { createUserUrl } from '../utils/config'

const SignupPage: FC = () => {
  const navigate = useNavigate()
  const setParams = useUserStore((state) => state.setParams)
  const setError = useErrorStore((state) => state.setError)

  const { postData, isPosting, error } = usePostApi<LoginData, RegisterInput>(
    createUserUrl
  )

  useEffect(() => {
    if (error) {
      setError(error.message)
    }
  }, [error, setError])

  console.log('isPosting', isPosting)

  const handleSignup = async (data: RegisterInput) => {
    console.log('signup', data)
    const result = await postData(data, false)
    if (result) {
      setParams(result.username, result.email, result.token)
      setLoginData(result)
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
