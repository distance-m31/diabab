import Header from '../components/Header'
import LoginForm from '../components/LoginForm'
import { LoginInput } from '../types'

export default function LoginPage() {
  const handleLogin = (data: LoginInput) => {
    console.log('login', data)
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
