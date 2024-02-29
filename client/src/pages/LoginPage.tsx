import LoginForm from '../components/forms/LoginForm'
import { LoginInput } from '../types'
import { login } from '../services/user'
import useUserStore from '../store'
import { useNavigate } from 'react-router-dom'
import Box from '../components/Box'

const LoginPage = () => {
  const navigate = useNavigate()
  const setUsername = useUserStore((state) => state.setUsername)
  const setToken = useUserStore((state) => state.setToken)
  const setEmail = useUserStore((state) => state.setEmail)
  const username = useUserStore((state) => state.username)

  const handleLogin = async (data: LoginInput) => {
    console.log('login', data)
    const result = await login(data)

    if (result) {
      console.log('setting states', result)
      setUsername(result.username)
      setEmail(result.email)
      setToken(result.token)
    }

    console.log('navigating, with username', username, 'result', result)
    navigate('/')
  }

  return (
    <Box
      type="border"
      className="py-4"
    >
      <LoginForm handleLogin={handleLogin} />
    </Box>
  )
}

export default LoginPage
