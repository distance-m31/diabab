import { create } from 'zustand'

interface UserState {
  username: string
  email: string
  token: string
  setParams: (username: string, email: string, token: string) => void
}

const useUserStore = create<UserState>((set) => ({
  username: '',
  email: '',
  token: '',
  setParams: (username: string, email: string, token: string) =>
    set({ username, email, token }),
}))

export default useUserStore
