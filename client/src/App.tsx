import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import InputBloodValuesPage from './pages/InputBloodValuesPage'
import useUserStore from './store'
import NavBar from './components/Navbar'
import { useEffect } from 'react'
import { getLoginData, getStoredToken } from './utils/loginData'
import { setToken } from './services/blood'

function App() {
  const username = useUserStore((state) => state.username)
  const setParams = useUserStore((state) => state.setParams)

  useEffect(() => {
    const token = getStoredToken()
    console.log('effec stored token', token)
    if (!token) {
      return
    }
    setToken(token)

    const loginData = getLoginData()
    if (!loginData) {
      return
    }
    setParams(loginData.username, loginData.email, token)
  }, [setParams])

  return (
    <div className="App">
      <NavBar />
      <div className="min-h-full h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <BrowserRouter>
            <Routes>
              <Route
                path="/signup"
                element={<SignupPage />}
              />
              <Route
                path="/login"
                element={username ? <Navigate to="/blood" /> : <LoginPage />}
              />
              <Route
                path="/blood"
                element={
                  username ? <InputBloodValuesPage /> : <Navigate to="/login" />
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
    </div>
  )
}

export default App
