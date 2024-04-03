import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { token } from './token'
import { ApiFetchHook } from '../types'
import { ApiPostHook } from '../types'

const headers = (useAuth: boolean) =>
  useAuth
    ? { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' }

export const useFetchApi = <T>(url: string): ApiFetchHook<T> => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async <T>(useAuth: boolean) => {
    setIsLoading(true)
    try {
      const response: AxiosResponse<T> = await axios.get<T>(url, {
        headers: headers(useAuth),
      })
      setIsLoading(false)
      return response.data
    } catch (error) {
      setIsLoading(false)

      if (axios.isAxiosError(error)) {
        console.error(error.message)
        setError(new Error(error.message))
      }

      if (error instanceof Error) {
        setError(error as Error | null)
      }
      return null
    }
  }

  return { fetchData, isLoading, error }
}

export const usePostApi = <T, R>(url: string): ApiPostHook<T, R> => {
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const postData = async <T, R>(data: R, useAuth: boolean) => {
    setIsPosting(true)
    try {
      const response: AxiosResponse<T> = await axios.post<T>(url, data, {
        headers: headers(useAuth),
      })
      console.log('headers', headers(useAuth))
      setIsPosting(false)
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setIsPosting(false)
        console.error(error.message)
        setError(new Error(error.message))
      }
      setIsPosting(false)
      setError(error as Error | null)
    }
    return null
  }

  return { postData, isPosting, error }
}
