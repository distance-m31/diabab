import { FC, useEffect } from 'react'
import useErrorStore from '../store/errorStore'

const Error: FC = () => {
  const error = useErrorStore((state) => state.error)
  const clearError = useErrorStore((state) => state.clearError)

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearError()
    }, 5000)

    return () => {
      clearTimeout(timeout)
    }
  }, [error, clearError])

  if (!error) return null

  return (
    <div role="alert">
      <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        Error
      </div>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        <p>{error}</p>
      </div>
    </div>
  )
}

export default Error
