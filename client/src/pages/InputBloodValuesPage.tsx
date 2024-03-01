import { FC, useEffect, useState } from 'react'
import { createBloodData, getBloodData } from '../services/blood'
import Text from '../components/Text'
import BloodValuesForm from '../components/forms/BloodValuesForm'
import BarChart from '../components/BarChart'
import { BloodData } from '../types'

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
  const [bloodValues, setBloodValues] =
    useState<BloodData[]>(DefaultBloodValues)

  useEffect(() => {
    console.log('Getting blood data?!')
    const fetchData = async () => {
      console.log('Fetching blood data')
      const bloodRecords = await getBloodData()
      console.log('Got blood data:', bloodRecords)
      setBloodValues(bloodRecords)
    }
    fetchData()
  }, [])

  const handleBloodValues = async (bloodRecord: BloodData) => {
    const result = await createBloodData(bloodRecord)
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
