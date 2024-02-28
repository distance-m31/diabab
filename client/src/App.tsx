import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import InputBloodValues from './pages/InputBloodValues'
import useUserStore from './store'
import Text from './components/Text'

function App() {
  const username = useUserStore((state) => state.username)
  const token = useUserStore((state) => state.token)
  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Text variant="h1">
          Welcome {username} token {token}
        </Text>
        <BrowserRouter>
          <Routes>
            <Route
              path="/signup"
              element={<SignupPage />}
            />
            <Route
              path="/login"
              element={<LoginPage />}
            />
            <Route
              path="/blood"
              element={
                username ? <InputBloodValues /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={username ? <Navigate to="/blood" /> : <LoginPage />}
            />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  )
}

export default App
