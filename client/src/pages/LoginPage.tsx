import Header from '../components/Header'
import LoginForm from '../components/LoginForm'
import { LoginInput } from '../types'
import { login } from '../services/user'
import useUserStore from '../store'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
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
    <>
      <Header
        heading="Welcome back"
        paragraph="New here? "
        linkName="Sign up"
        linkUrl="/signup"
      />

      <LoginForm handleLogin={handleLogin} />
    </>
  )
}
