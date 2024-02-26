import React from 'react'

type DividerProps = {
  children?: React.ReactNode
}

const Divider: React.FC<DividerProps> = ({ children }) => {
  return <div>{children}</div>
}

export default Divider
