import reactLogo from './assets/react.svg'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'

type BloodData = {
  glucoselevel: number
}

type GetBloodData = {
  data: BloodData[];
} 

type CreateBloodData = {
  glucoselevel: number
}

async function createBloodData(data: CreateBloodData) {
  try {
    const response = await axios.post('http://localhost:3003/blooddata', data, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    console.log(response)
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      return error.message
    }      
     
    console.error(error)
    return error
  }    
}

async function getBloodData() {
  try {
    const { data, status } = await axios.get<GetBloodData>('http://localhost:3003/blooddata',
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )

    console.log(JSON.stringify(data, null, 4))
    console.log(status)
    return data
  }
  catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.message)
      return error.message
    }      
     
    console.error(error)
    return error
  }    
}



const schema = yup.object().shape({
  glucoselevel: yup.number().moreThan(0).required(),
  sensitivity: yup.number().moreThan(0).required()
})

type FormData = {
  glucoselevel: number
  sensitivity: number
}

getBloodData()

function App() {
  const {register, handleSubmit, formState: { errors }} = useForm<FormData>({ resolver: yupResolver(schema)})

  const onSubmit = handleSubmit( async (data) => {
    console.log(data)
    const glucoseLevel = data.glucoselevel
    const sensitivity = data.sensitivity
    const result = glucoseLevel / sensitivity
    console.log(result)
    alert(`You need ${result} units of insuline`)
    await createBloodData({glucoselevel: data.glucoselevel})
  })

  return (
    <>
      <div className='bg-blue-600'>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Insuline calculation</h1>
    <button onClick={async () => await getBloodData()}>Get data</button>
      <form onSubmit={onSubmit} >
        <div className='bg-blue-600 opacity-50 rounded'>
          <label htmlFor='Blood glucose level' className='bg-slate-600'>
            Blood glucose level
          </label>
          <input type='number' {...register('glucoselevel')} className='border-2 border-blue-600 rounded p-2' />
          {errors.glucoselevel?.message}
        </div>
        <div>
        <label htmlFor='Sensitivity' className='bg-slate-600'>
            Sensitivity
          </label>
          <input {...register('sensitivity')} type='number' className='border-2 border-blue-600 rounded p-2' />
          {errors.sensitivity?.message}
        </div>
        <button type='submit' className='bg-blue-600 text-white p-2 rounded'>
          Submit
        </button>
      </form>
    </>
  )
}

export default App
