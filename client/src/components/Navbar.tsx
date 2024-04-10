import { FC } from 'react'
import Box from './Box'
import Text from './Text'
import useUserStore from '../store/userStore'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { clearLoginData } from '../utils/loginData'

const NavBar: FC = () => {
  const navigate = useNavigate()

  const username = useUserStore((state) => state.username)
  const token = useUserStore((state) => state.token)

  const loggedIn = () => {
    if (username && token) {
      return <Button onClick={handleLogout}>Logout</Button>
    } else {
      return <Button onClick={handleLogin}>Login</Button>
    }
  }

  const handleLogout = () => {
    useUserStore.setState({ username: '', token: '' })
    clearLoginData()
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <Box
      type="shadow"
      subClassName="flex flex-row justify-between sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-200 py-5 px-10"
    >
      <Text
        variant="h1"
        subClassName="text-gray-100 font-bold text-2xl"
      >
        DiabApp
      </Text>
      {loggedIn()}
    </Box>
  )
}

export default NavBar
