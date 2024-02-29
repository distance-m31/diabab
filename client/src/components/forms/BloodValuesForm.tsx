import { FC, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useState } from 'react'

import FormTextInput from './FormTextInput'
import Button from '../Button'
import Text from '../Text'

import { BloodData } from '../../types'
import { calculateInsulin } from '../../utils/insulinCalc'

const schema = yup.object().shape({
  glucose: yup.number().moreThan(0).lessThan(100).required(),
  sensitivity: yup.number().moreThan(0).required(),
  carbs: yup.number().moreThan(0).required(),
  carbsRatio: yup.number().moreThan(0).required(),
  timestamp: yup.date().required(),
})

interface BloodFormProps {
  bloodValues: BloodData
  handleBloodValues: (data: BloodData) => void
}

const BloodValuesForm: FC<BloodFormProps> = (props: BloodFormProps) => {
  const [calcResult, setCalcResult] = useState<number>(0)

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<BloodData>({
    defaultValues: useMemo(() => props.bloodValues, [props.bloodValues]),
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: BloodData) => {
    const insuline = calculateInsulin(
      6,
      data.glucose,
      data.carbs,
      data.carbsRatio,
      data.sensitivity
    )
    console.log('Insuline', insuline)
    setCalcResult(insuline)
    props.handleBloodValues(data)
  }

  return (
    <>
      <FormTextInput
        label="Glucoce level"
        type="number"
        name="glucose"
        error={errors.glucose}
        control={control}
      />

      <FormTextInput
        label="Carbs"
        type="number"
        name="carbs"
        error={errors.carbs}
        control={control}
      />

      <FormTextInput
        label="Sensitivity"
        type="number"
        name="sensitivity"
        error={errors.sensitivity}
        control={control}
      />

      <FormTextInput
        label="Carbs ratio"
        type="number"
        name="carbsRatio"
        error={errors.carbsRatio}
        control={control}
      />

      <Button
        onClick={handleSubmit(onSubmit)}
        type="submit"
      >
        Submit
      </Button>
      <div>
        <Text variant="h2">You need {calcResult} units of insuline</Text>
      </div>
    </>
  )
}

export default BloodValuesForm
