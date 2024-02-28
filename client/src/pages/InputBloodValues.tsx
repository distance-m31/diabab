import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { createBloodData } from '../services/blood'
import FormTextInput from '../components/FormTextInput'
import Button from '../components/Button'
import Text from '../components/Text'
import { useState } from 'react'
import useUserStore from '../store'

const schema = yup.object().shape({
  glucose: yup.number().moreThan(0).lessThan(100).required(),
  sensitivity: yup.number().moreThan(0).required(),
  carbs: yup.number().moreThan(0).required(),
  carbsRatio: yup.number().moreThan(0).required(),
})

type FormData = {
  glucose: number
  carbs: number
  carbsRatio: number
  sensitivity: number
}

const InputBloodValues = () => {
  const [calcResult, setCalcResult] = useState<number>(0)
  const token = useUserStore((state) => state.token)

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    defaultValues: {
      glucose: 5,
      carbs: 10,
      carbsRatio: 1,
      sensitivity: 2,
    },
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    const glucoseLevel = data.glucose
    const sensitivity = data.sensitivity
    const calculation = glucoseLevel / sensitivity
    console.log(calculation)
    setCalcResult(calculation)
    alert(`You need ${calculation} units of insuline`)
    const result = await createBloodData(
      {
        glucose: data.glucose,
        carbs: data.carbs,
      },
      token
    )
    console.log(result)
  }

  return (
    <>
      <Text variant="h1">Insuline calculator</Text>
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

export default InputBloodValues
