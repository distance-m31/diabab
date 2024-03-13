import { create } from 'zustand'

interface ErrorState {
  error: string
  setError: (error: string) => void
  clearError: () => void
}

const useErrorStore = create<ErrorState>((set) => ({
  error: '',
  setError: (error: string) => set({ error }),
  clearError: () => set({ error: '' }),
}))

export default useErrorStore
