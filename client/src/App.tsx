import { BrowserRouter, Routes, Route } from 'react-router-dom'

import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import { createContext, useState } from 'react'
import InputBloodValues from './pages/InputBloodValues'

const UserContext = createContext({ user: null, setUser: null })

function App() {
  const [user, setUser] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
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
                element={<InputBloodValues />}
              />
              <Route
                path="/"
                element={<LoginPage />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App
