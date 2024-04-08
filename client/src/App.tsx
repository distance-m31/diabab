import { useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import InputBloodValuesPage from './pages/InputBloodValuesPage'
import useUserStore from './store/userStore'
import Error from './components/Error'

import { getLoginData, getStoredToken } from './utils/loginData'
import './App.css'

function App() {
  const username = useUserStore((state) => state.username)
  const setParams = useUserStore((state) => state.setParams)

  useEffect(() => {
    const token = getStoredToken()
    if (!token) {
      return
    }

    const loginData = getLoginData()
    if (!loginData) {
      return
    }
    setParams(loginData.username, loginData.email, token)
  }, [setParams])

  return (
    <div className="App">
      <BrowserRouter>
        <Error />
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
            element={username ? <InputBloodValuesPage /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={username ? <Navigate to="/blood" /> : <MainPage />}
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
