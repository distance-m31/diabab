import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import InputBloodValuesPage from './pages/InputBloodValuesPage'
import useUserStore from './store'
import NavBar from './components/Navbar'

function App() {
  const username = useUserStore((state) => state.username)

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
                element={<LoginPage />}
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
