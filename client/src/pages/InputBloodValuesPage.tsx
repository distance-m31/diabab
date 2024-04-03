import { FC, useEffect, useState } from 'react'
//import { createBloodData, getBloodData } from '../services/blood'
import Text from '../components/Text'
import BloodValuesForm from '../components/forms/BloodValuesForm'
import BarChart from '../components/BarChart'
import { BloodData } from '../types'
import useErrorStore from '../store/errorStore'
import { useFetchApi, usePostApi } from '../utils/useServer'
import Waiting from '../components/Waiting'
import { bloodDataUrl } from '../utils/config'

const DefaultBloodValues: BloodData[] = [
  {
    glucose: 0,
    carbs: 0,
    carbsRatio: 1,
    sensitivity: 1,
    timestamp: new Date(),
  },
]

const InputBloodValuesPage: FC = () => {
  const setError = useErrorStore((state) => state.setError)

  const [bloodValues, setBloodValues] =
    useState<BloodData[]>(DefaultBloodValues)

  const {
    fetchData,
    isLoading,
    error: fetchError,
  } = useFetchApi<BloodData[]>(bloodDataUrl)
  const {
    postData,
    isPosting,
    error: postError,
  } = usePostApi<BloodData, BloodData>(bloodDataUrl)

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
    console.log('Getting blood data?!')
    const getData = async () => {
      console.log('Fetching blood data')

      const bloodRecords = await fetchData(true)
      if (bloodRecords) {
        console.log('Got blood data:', bloodRecords)
        setBloodValues(
          bloodRecords.map((entry) => {
            entry.timestamp = new Date(entry.timestamp)
            return entry
          })
        )
      }
    }
    getData()
  }, [])

  const handleBloodValues = async (bloodRecord: BloodData) => {
    const result = await postData(bloodRecord, true)
    if (result) {
      console.log('blood record add:', result)
      setBloodValues([...bloodValues, result]) // to result?
    }
  }

  const latestBloodValues = bloodValues[bloodValues.length - 1]

  return (
    <div style={{ width: '300px', boxShadow: '3px 3px 5px' }}>
      <Waiting isWaiting={isLoading || isPosting} />
      <Text variant="h1">Insuline calculator</Text>
      <BloodValuesForm
        bloodValues={latestBloodValues}
        handleBloodValues={handleBloodValues}
      />
      <div>
        <BarChart bloodData={bloodValues} />
      </div>
    </div>
  )
}

export default InputBloodValuesPage
