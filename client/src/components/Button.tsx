import React from 'react'

type ButtonProps = {
  id?: string
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({ id, children, onClick, type }) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  return (
    <button
      id={id}
      onClick={handleClick}
      type={type === undefined ? 'button' : type}
      className="bg-blue-900 hover:bg-blue-500 text-white font-bold py-2 px-4 my-2 rounded"
    >
      {children}
    </button>
  )
}

export default Button
