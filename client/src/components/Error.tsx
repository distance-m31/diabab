import { FC } from 'react'
import useErrorStore from '../store/errorStore'
import Button from './Button'

const Error: FC = () => {
  const error = useErrorStore((state) => state.error)
  const clearError = useErrorStore((state) => state.clearError)

  if (!error) return null

  return (
    <div
      id="default-modal"
      className="flex bg-slate-500/70 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 border border-red-400">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Error
          </div>
          <div className="px-4 py-5 text-black">
            <p>{error}</p>
          </div>
          <div className="flex items-center p-4 md:p-5 border-t border-red-200 rounded-b dark:border-gray-600">
            <Button onClick={() => clearError()}> OK</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
