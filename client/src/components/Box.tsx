import { FC } from 'react'

interface BoxProps {
  id?: string
  children: React.ReactNode
  type?: 'shadow' | 'border' | 'none'
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const Box: FC<BoxProps> = ({
  id,
  className,
  children,
  style,
  type = 'none',
  onClick,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }
  switch (type) {
    case 'shadow':
      return (
        <div
          id={id}
          style={style}
          onClick={handleClick}
          className={
            className
              ? className + ' shadow-lg py-2 px-2'
              : 'shadow-lg py-2 px-2'
          }
        >
          {children}
        </div>
      )
    case 'border':
      return (
        <div
          id={id}
          onClick={handleClick}
          className="border-2 border-blue-900 shadow-lg rounded-sm py-2 px-3"
        >
          {children}
        </div>
      )
    case 'none':
      return (
        <div
          id={id}
          onClick={handleClick}
        >
          {children}
        </div>
      )
  }
}

export default Box
