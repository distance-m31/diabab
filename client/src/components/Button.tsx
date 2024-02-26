import React from 'react'

type ButtonProps = {
  id?: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ id, children, onClick, type }) => {
  const handleClick = () => {
    console.log('Button clicked')
    if (onClick) {
      console.log('Calling on click', onClick)
      onClick()
    }
  }
  return (
    <button
      id={id}
      onClick={handleClick}
      type={type === undefined ? 'button' : type}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  )
}

export default Button
