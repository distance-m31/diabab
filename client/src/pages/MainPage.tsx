import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Text from '../components/Text'
import insuling from '../images/insulin2.jpg'

const MainPage = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

  const goToSignup = () => {
    navigate('/signup')
  }

  return (
    <div>
      <div className="flex flex-wrap mx-10 max-w-[1000px]">
        <div className="flex-1">
          <Text
            variant="h2"
            subClassName="text-cyan-500 py-20"
          >
            This is a demonstration app to calculate insuline intake.
          </Text>

          <Text variant="h3">
            This app is NOT for treatment decisions of any kind!
          </Text>
          <Text variant="h3">Create and account or sign in.</Text>
          <div className="flex py-5">
            <Button onClick={goToLogin}>Sign in</Button>
            <Button onClick={goToSignup}>Create Account</Button>
          </div>
        </div>
        <div className="min-w-[400px]">
          <img
            src={insuling}
            style={{
              height: '600px',
              marginTop: '40px',
              borderRadius: '50px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default MainPage
