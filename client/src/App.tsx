import { useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import InputBloodValuesPage from './pages/InputBloodValuesPage'
import useUserStore from './store/userStore'
import NavBar from './components/Navbar'
import Error from './components/Error'

import { getLoginData, getStoredToken } from './utils/loginData'
import { setToken } from './utils/token'
import './App.css'

function App() {
  const username = useUserStore((state) => state.username)
  const setParams = useUserStore((state) => state.setParams)

  useEffect(() => {
    const token = getStoredToken()
    console.log('App stored token', token)
    if (!token) {
      return
    }
    setToken(token)

    const loginData = getLoginData()
    if (!loginData) {
      return
    }
    setParams(loginData.username, loginData.email, token)
  }, [])

  return (
    <div className="App">
      {username && <NavBar />}
      <BrowserRouter>
        <Error />
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
  )
}

export default App
