import { FC, useEffect, useState } from 'react'
import { createBloodData, getBloodData } from '../services/blood'
import Text from '../components/Text'
import useUserStore from '../store'
import BloodValuesForm from '../components/forms/BloodValuesForm'
import BarChart from '../components/BarChart'
import { BloodData } from '../types'

const DefaultBloodValues: BloodData[] = [
  {
    glucose: 6,
    carbs: 10,
    carbsRatio: 10,
    sensitivity: 2,
    timestamp: new Date(),
  },
]

const InputBloodValuesPage: FC = () => {
  const token = useUserStore((state) => state.token)

  const [bloodValues, setBloodValues] =
    useState<BloodData[]>(DefaultBloodValues)

  useEffect(() => {
    const fetchData = async () => {
      const bloodRecords = await getBloodData(token)
      console.log('Getting blood data:', bloodRecords)
      setBloodValues(bloodRecords)
    }
    fetchData()
  }, [token])

  const handleBloodValues = async (bloodRecord: BloodData) => {
    const result = await createBloodData(bloodRecord, token)
    setBloodValues([...bloodValues, bloodRecord])
    console.log('blood record add:', result)
  }

  const latestBloodValues = bloodValues[bloodValues.length - 1]

  return (
    <>
      <Text variant="h1">Insuline calculator</Text>
      <BloodValuesForm
        bloodValues={latestBloodValues}
        handleBloodValues={handleBloodValues}
      />
      <div>
        <BarChart bloodData={bloodValues} />
      </div>
    </>
  )
}

export default InputBloodValuesPage
