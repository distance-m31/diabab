import { FC, useEffect } from 'react'
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
  glucose: yup
    .number()
    .moreThan(0)
    .lessThan(100)
    .required()
    .typeError('Glucose must be a number'),
  sensitivity: yup
    .number()
    .moreThan(0)
    .required()
    .typeError('Sensitivity must be a number'),
  carbs: yup
    .number()
    .moreThan(0)
    .required()
    .typeError('Carbohydrates must be a number'),
  carbsRatio: yup
    .number()
    .moreThan(0)
    .required()
    .typeError('Carbohydrates ratio must be a number'),
  timestamp: yup.string().required(), // yup.date().required(),
})

interface BloodFormProps {
  bloodValues: BloodData
  handleBloodValues: (data: BloodData) => void
}

const BloodValuesForm: FC<BloodFormProps> = (props: BloodFormProps) => {
  const [calcResult, setCalcResult] = useState<number>(0)
  const {
    watch,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<BloodData>({
    defaultValues: props.bloodValues,
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const watchAllFields = watch()

  useEffect(() => {
    reset(props.bloodValues)
  }, [props.bloodValues, reset])

  useEffect(() => {
    if (
      watchAllFields.glucose &&
      watchAllFields.carbs &&
      watchAllFields.carbsRatio &&
      watchAllFields.sensitivity
    ) {
      const insuline = calculateInsulin(
        6,
        watchAllFields.glucose,
        watchAllFields.carbs,
        watchAllFields.carbsRatio,
        watchAllFields.sensitivity
      )
      setCalcResult(insuline)
    }
  }, [watchAllFields])

  const onSubmit = async (data: BloodData) => {
    props.handleBloodValues(data)
  }

  return (
    <form>
      <FormTextInput
        label="Blood glucose level (mmol/L)"
        type="number"
        name="glucose"
        error={errors.glucose}
        control={control}
      />

      <FormTextInput
        label="Carbohydrates (in grams)"
        type="number"
        name="carbs"
        error={errors.carbs}
        control={control}
      />

      <FormTextInput
        label="Carbohydarate ratio"
        type="number"
        name="carbsRatio"
        error={errors.carbsRatio}
        control={control}
      />

      <FormTextInput
        label="Sensitivity factor"
        type="number"
        name="sensitivity"
        error={errors.sensitivity}
        control={control}
      />

      <FormTextInput
        label="Intake time"
        type="datetime-local"
        name="timestamp"
        error={errors.timestamp}
        control={control}
      />

      <div className="py-2">
        <Text variant="h3">You need {calcResult} units of insuline.</Text>
      </div>

      <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
    </form>
  )
}

export default BloodValuesForm
