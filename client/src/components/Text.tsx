import React from 'react'

type TextProps = {
  children: React.ReactNode
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'
}

const Text: React.FC<TextProps> = ({ children, variant, ...props }) => {
  switch (variant) {
    case 'h1':
      return (
        <h1
          className="font-bold py-2 px-0"
          {...props}
        >
          {children}
        </h1>
      )
    case 'h2':
      return (
        <h2
          className="font-bold py-2 px-0"
          {...props}
        >
          {children}
        </h2>
      )
    case 'h3':
      return <h3 {...props}>{children}</h3>
    case 'h4':
      return <h4 {...props}>{children}</h4>
    case 'h5':
      return <h5 {...props}>{children}</h5>
    case 'h6':
      return <h6 {...props}>{children}</h6>
    case 'p':
      return <p {...props}>{children}</p>
    default:
      return <p {...props}>{children}</p>
  }
}

export default Text
