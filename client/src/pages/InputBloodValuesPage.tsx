import { FC, useEffect, useState } from 'react'

import BarChart from '../components/BarChart'

import BloodValuesForm from '../components/forms/BloodValuesForm'
import Box from '../components/Box'
import NavBar from '../components/Navbar'
import Text from '../components/Text'
import Waiting from '../components/Waiting'

import useUserStore from '../store/userStore'
import useErrorStore from '../store/errorStore'

import { useFetchApi, usePostApi } from '../utils/useServer'
import { bloodDataUrl } from '../utils/config'

import { BloodData } from '../types'

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:00`
}

const DefaultBloodValues: BloodData = {
  glucose: 0,
  carbs: 0,
  carbsRatio: 10,
  sensitivity: 2,
  timestamp: convertToDateTimeLocalString(new Date()),
}

const InputBloodValuesPage: FC = () => {
  const setError = useErrorStore((state) => state.setError)

  const [currentBloodValues, setCurrentBloodValues] =
    useState<BloodData>(DefaultBloodValues)

  const [historyBloodValues, setHistoryBloodValues] = useState<BloodData[]>([])
  const token = useUserStore((state) => state.token)

  const {
    fetchData,
    isLoading,
    error: fetchError,
  } = useFetchApi<BloodData[]>(bloodDataUrl, token)
  const {
    postData,
    isPosting,
    error: postError,
  } = usePostApi<BloodData, BloodData>(bloodDataUrl, token)

  useEffect(() => {
    if (fetchError) {
      setError(fetchError.message)
    }
  }, [fetchError, setError])

  useEffect(() => {
    if (postError) {
      setError(postError.message)
    }
  }, [postError, setError])

  useEffect(() => {
    const getData = async () => {
      const bloodRecords = await fetchData(true)
      if (!bloodRecords || bloodRecords.length === 0) {
        return
      }
      const lastRecord = bloodRecords[bloodRecords.length - 1]
      setHistoryBloodValues(prepareData(bloodRecords))
      setCurrentBloodValues({
        ...DefaultBloodValues,
        sensitivity: lastRecord.sensitivity,
        carbsRatio: lastRecord.carbsRatio,
      })
    }

    getData()
  }, [])

  const prepareData = (data: BloodData[]) => {
    return data.map((entry) => {
      entry.timestamp = convertToDateTimeLocalString(new Date(entry.timestamp))
      return entry
    })
  }

  const handleSubmitBloodValues = async (bloodRecord: BloodData) => {
    const result = await postData(
      {
        ...bloodRecord,
        timestamp: new Date(bloodRecord.timestamp).toISOString(),
      },
      true
    )
    if (result) {
      setHistoryBloodValues(prepareData([...historyBloodValues, result])) // to result?
    }
  }

  return (
    <div>
      <NavBar />
      {<Waiting isWaiting={isLoading || isPosting} />}
      <div className="grid grid-cols-3 gap-4 p-4">
        <Box type="shadow">
          <Text
            variant="h2"
            subClassName="mb-5"
          >
            Insuline calculator
          </Text>
          <BloodValuesForm
            bloodValues={currentBloodValues}
            handleBloodValues={handleSubmitBloodValues}
          />
        </Box>
        <Box
          type="shadow"
          subClassName="col-span-2"
        >
          <BarChart bloodData={historyBloodValues} />
        </Box>
      </div>
    </div>
  )
}

export default InputBloodValuesPage
