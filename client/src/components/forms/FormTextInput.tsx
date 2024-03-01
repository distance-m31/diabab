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
            className="block text-gray-700 text-sm font-bold mb-1"
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
            className="shadow appearance-none border rounded w-full mb-2 py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {error && <span style={{ color: 'red' }}>{error?.message}</span>}
        </>
      )}
    />
  )
}

export default ControlTextInput
/* interface FormTextInputProps<T extends FieldValues> extends UseControllerProps<T> {
  id: string
  testId?: string
  label: string
  type?: string
 // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
//  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
//  value?: string
  error?: FieldError | undefined
}

const FormTextInput: FC<FormTextInputProps> = ({
  id,
  name,
  label,
  type,
  testId,
  onChange,
  onBlur,
  value,
  error,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <Controller 
      name={name} 
      control={control}
      render={({ field }) => (
      <input
        data-testid={testId}
        type={type ? type : 'text'}
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {error && <span style={{ color: 'red' }}>{error?.message}</span>}
      )}
      />

    </div>
  )
}

export default FormTextInput
 */
