import { FC } from 'react'
import Box from './Box'
import Text from './Text'
import useUserStore from '../store'
import Button from './Button'

const NavBar: FC = () => {
  const username = useUserStore((state) => state.username)
  const token = useUserStore((state) => state.token)
  const userMessage = () => {
    if (username) {
      return `User ${username} has logged in ${token}.`
    }
    return 'No user logged in'
  }

  const loggedIn = () => {
    if (username && token) {
      return <Button onClick={handleLogout}>Logout</Button>
    }
    return null
  }

  const handleLogout = () => {
    useUserStore.setState({ username: '', token: '' })
  }

  return (
    <Box
      type="shadow"
      style={{
        color: 'white',
        backgroundColor: '#1010a0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      className="sticky top-0"
    >
      <Text variant="h1">{userMessage()}</Text>
      {loggedIn()}
    </Box>
  )
}

export default NavBar
