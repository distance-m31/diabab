import { FC, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

//import Box from '../components/Box'
import LoginForm from '../components/forms/LoginForm'
import { LoginInput, LoginData } from '../types'

import useUserStore from '../store/userStore'
import useErrorStore from '../store/errorStore'

import { setLoginData } from '../utils/loginData'
import { usePostApi } from '../utils/useServer'
import { loginUrl } from '../utils/config'

import './Login.css'

const LoginPage: FC = () => {
  const navigate = useNavigate()
  const setParams = useUserStore((state) => state.setParams)
  const username = useUserStore((state) => state.username)
  const setError = useErrorStore((state) => state.setError)

  const { postData, isPosting, error } = usePostApi<LoginData, LoginInput>(
    loginUrl
  )

  useEffect(() => {
    if (error) {
      setError(error.message)
    }
  }, [error, setError])

  console.log('isPosting', isPosting)

  const handleLogin = async (data: LoginInput) => {
    console.log('login', data)

    //const result = await login(data)
    const result = await postData(data, false)

    if (result) {
      console.log('setting states', result)
      setParams(result.username, result.email, result.token)
      setLoginData(result)
    }

    console.log('navigating, with username', username, 'result', result)
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center py-10">
      <div className="login_page">
        <div className="app_title">DIAB App</div>
        <div className="intro_text">
          <h1>
            This is an experimental app to calculate insuline intake, not for
            treatment decisions!
          </h1>
        </div>
        <div>
          <LoginForm handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
