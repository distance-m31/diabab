import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { ApiFetchHook } from '../types'
import { ApiPostHook } from '../types'

const headers = (useAuth: boolean, token: string) =>
  useAuth
    ? { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' }

export const useFetchApi = <T, P>(
  url: string,
  token: string
): ApiFetchHook<T, P> => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async <T, P>(useAuth: boolean, param: P) => {
    setIsLoading(true)

    try {
      const response: AxiosResponse<T> = await axios.get<T>(url, {
        params: param,
        headers: headers(useAuth, token),
      })

      setIsLoading(false)
      return response.data
    } catch (error) {
      setIsLoading(false)

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response
        setError(
          new Error(errorResponse ? errorResponse.data?.error : error.message)
        )
      } else {
        setError(new Error('Unknown error'))
      }

      return null
    }
  }

  return { fetchData, isLoading, error }
}

export const usePostApi = <T, R>(
  url: string,
  token: string
): ApiPostHook<T, R> => {
  const [isPosting, setIsPosting] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const postData = async <T, R>(data: R, useAuth: boolean) => {
    setIsPosting(true)

    try {
      const response: AxiosResponse<T> = await axios.post<T>(url, data, {
        headers: headers(useAuth, token),
      })

      setIsPosting(false)
      return response.data
    } catch (error) {
      setIsPosting(false)

      if (axios.isAxiosError(error)) {
        const errorResponse = error.response
        if (errorResponse?.data.name === 'ZodError') {
          setError(
            new Error(
              'Field validation error, check your input lengths and types!'
            )
          )
          return null
        }

        setError(
          new Error(errorResponse ? errorResponse.data?.error : error.message)
        )
      } else {
        setError(new Error('Unknown error'))
      }
    }
    return null
  }

  return { postData, isPosting, error }
}
