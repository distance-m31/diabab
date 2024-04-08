import { FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUserStore from '../store/userStore'
import useErrorStore from '../store/errorStore'

import LoginForm from '../components/forms/LoginForm'
import Waiting from '../components/Waiting'

import { LoginInput, LoginData } from '../types'

import { setLoginData } from '../utils/loginData'
import { usePostApi } from '../utils/useServer'
import { loginUrl } from '../utils/config'

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const setParams = useUserStore((state) => state.setParams)
  const setError = useErrorStore((state) => state.setError)
  const { postData, isPosting, error } = usePostApi<LoginData, LoginInput>(
    loginUrl,
    ''
  )

  useEffect(() => {
    if (error) {
      setError(error.message)
    }
  }, [error, setError])

  const handleLogin = async (data: LoginInput) => {
    const result = await postData(data, false)
    if (result) {
      setParams(result.username, result.email, result.token)
      setLoginData(result)
      navigate('/')
    }
  }

  return (
    <>
      <Waiting isWaiting={isPosting} />
      <div className="flex flex-col items-center py-10">
        <LoginForm handleLogin={handleLogin} />
      </div>
    </>
  )
}

export default LoginPage
