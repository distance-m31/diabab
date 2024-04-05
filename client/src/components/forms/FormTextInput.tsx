import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  label: string
  type?: string
  error: FieldError | undefined
}

const ControlTextInput = <T extends FieldValues>({
  name,
  label,
  type,
  control,
  error,
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <label
            htmlFor={name}
            className="bg-grey block text-gray-700 text-mb font-bold mb-2"
          >
            {label}
            <br />
          </label>
          <input
            id={name}
            onChange={(text) => {
              onChange(text)
            }}
            type={type ? type : 'text'}
            value={value}
            className="shadow appearance-none border rounded w-full mb-4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {error && <span style={{ color: 'red' }}>{error?.message}</span>}
        </>
      )}
    />
  )
}

export default ControlTextInput
