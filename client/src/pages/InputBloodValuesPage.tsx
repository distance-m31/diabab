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

import {
  BloodData,
  BloodFormData,
  BloodPaging,
  ScrollDirection,
  ScrollInfo,
} from '../types'

import Button from '../components/Button'

const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')

  return `${year}-${month}-${day}T${hours}:${minutes}:00`
}

const DefaultBloodValues: BloodData = {
  id: 0,
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

  const [scrollInfo, setLastBrowsed] = useState<ScrollInfo>({
    lastId: 0,
    direction: ScrollDirection.RIGHT,
  })

  const [historyBloodValues, setHistoryBloodValues] = useState<BloodData[]>([])
  const token = useUserStore((state) => state.token)

  const {
    fetchData,
    isLoading,
    error: fetchError,
  } = useFetchApi<BloodData[], BloodPaging>(bloodDataUrl, token)

  const {
    postData,
    isPosting,
    error: postError,
  } = usePostApi<BloodData, BloodFormData>(bloodDataUrl, token)

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

  const pageItemLimit = 5

  const getData = async (lastId: number, limit: number) => {
    const bloodRecords = await fetchData(true, {
      lastId: lastId,
      limit: limit,
    })

    if (!bloodRecords || bloodRecords.length === 0) {
      return []
    }

    return bloodRecords
  }

  const getInitialData = async () => {
    const bloodRecords = await getData(0, -pageItemLimit)
    setHistoryData(bloodRecords)
  }

  useEffect(() => {
    getInitialData()
  }, [])

  const prepareData = (data: BloodData[]) => {
    return data.map((entry) => {
      entry.timestamp = convertToDateTimeLocalString(new Date(entry.timestamp))
      return entry
    })
  }

  const handleSubmitBloodValues = async (bloodRecord: BloodFormData) => {
    const result = await postData(
      {
        ...bloodRecord,
        timestamp: new Date(bloodRecord.timestamp).toISOString(),
      },
      true
    )

    if (result) await getInitialData()
  }

  const setHistoryData = (bloodRecords: BloodData[]) => {
    const lastRecord = bloodRecords[bloodRecords.length - 1]
    setHistoryBloodValues(prepareData(bloodRecords))
    setCurrentBloodValues({
      ...DefaultBloodValues,
      sensitivity: lastRecord.sensitivity,
      carbsRatio: lastRecord.carbsRatio,
    })
  }

  const scrollLeft = async () => {
    const currentId = historyBloodValues[0].id
    const bloodRecords = await getData(currentId, -pageItemLimit)
    if (
      bloodRecords.length < pageItemLimit &&
      scrollInfo.direction === ScrollDirection.LEFT //&&
      //scrollInfo.lastId === currentId
    ) {
      return
    }

    console.log(
      bloodRecords.length,
      pageItemLimit,
      scrollInfo.direction,
      scrollInfo.lastId,
      currentId
    )

    setLastBrowsed({ lastId: currentId, direction: ScrollDirection.LEFT })
    setHistoryData(bloodRecords)
  }

  const scrollRight = async () => {
    const currentId = historyBloodValues[historyBloodValues.length - 1].id
    const bloodRecords = await getData(currentId, pageItemLimit)

    console.log(
      bloodRecords.length,
      pageItemLimit,
      scrollInfo.direction,
      scrollInfo.lastId,
      currentId
    )

    if (
      bloodRecords.length < pageItemLimit &&
      scrollInfo.direction === ScrollDirection.RIGHT //&&
      //scrollInfo.lastId === currentId
    ) {
      return
    }
    setLastBrowsed({ lastId: currentId, direction: ScrollDirection.RIGHT })
    setHistoryData(bloodRecords)
  }

  return (
    <div>
      <NavBar />
      {<Waiting isWaiting={isLoading || isPosting} />}
      <div className="flex flex-wrap gap-4 p-4 m-4">
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
          subClassName="flex-1 min-w-[320px]"
        >
          <BarChart bloodData={historyBloodValues} />
          <div className="flex justify-center">
            <Button
              disabled={false}
              onClick={() => scrollLeft()}
            >
              Left
            </Button>
            <Button
              disabled={false}
              onClick={() => scrollRight()}
            >
              Right
            </Button>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default InputBloodValuesPage
