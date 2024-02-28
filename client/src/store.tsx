import { create } from 'zustand'

interface UserState {
  username: string
  email: string
  token: string
  setToken: (token: string) => void
  setUsername: (username: string) => void
  setEmail: (email: string) => void
}

const useUserStore = create<UserState>((set) => ({
  username: '',
  email: '',
  token: '',
  setToken: (token: string) => set({ token }),
  setUsername: (username: string) => set({ username }),
  setEmail: (email: string) => set({ email }),
}))

export default useUserStore
