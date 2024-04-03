import React, { FC } from 'react'

type WaitingProps = {
  isWaiting: boolean
}

const Waiting: FC<WaitingProps> = (props) => {
  if (!props.isWaiting) {
    return null
  }
  return (
    <div>
      <p>Loading...</p>
    </div>
  )
}

export default Waiting
