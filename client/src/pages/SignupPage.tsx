import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import SignupForm from '../components/forms/SignupForm'
import Waiting from '../components/Waiting'

import useUserStore from '../store/userStore'
import useErrorStore from '../store/errorStore'

import { usePostApi } from '../utils/useServer'
import { setLoginData } from '../utils/loginData'
import { createUserUrl } from '../utils/config'

import { LoginData, RegisterInput } from '../types'

const SignupPage: FC = () => {
  const navigate = useNavigate()
  const setParams = useUserStore((state) => state.setParams)
  const setError = useErrorStore((state) => state.setError)

  const { postData, isPosting, error } = usePostApi<LoginData, RegisterInput>(
    createUserUrl,
    ''
  )

  useEffect(() => {
    if (error) {
      console.log('error', error)
      setError(error.message)
    }
  }, [error, setError])

  const handleSignup = async (data: RegisterInput) => {
    const result = await postData(data, false)
    if (result) {
      setParams(result.username, result.email, result.token)
      setLoginData(result)
      navigate('/')
    }
  }

  return (
    <>
      {<Waiting isWaiting={isPosting} />}

      <div className="flex justify-center py-1">
        <SignupForm handleLogin={handleSignup} />
      </div>
    </>
  )
}

export default SignupPage
