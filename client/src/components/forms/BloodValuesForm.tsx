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
    console.log('Resetting form', props.bloodValues)
    reset(props.bloodValues)
  }, [props.bloodValues, reset])

  useEffect(() => {
    console.log('Watch all fields', watchAllFields)
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
      console.log('Insuline', insuline)
      setCalcResult(insuline)
    }
  }, [watchAllFields])

  const onSubmit = async (data: BloodData) => {
    props.handleBloodValues(data)
  }

  return (
    <form>
      <FormTextInput
        label="Glucose level"
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

      <div className="py-2">
        <Text variant="h2">You need {calcResult} units of insuline</Text>
      </div>

      <Button
        onClick={handleSubmit(onSubmit)}
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}

export default BloodValuesForm
