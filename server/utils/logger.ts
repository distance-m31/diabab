/* eslint-disable no-console */
const info = (...prms: string[]) => {
  console.log('-------------------------------------------------------------')
  console.log(...prms)
}

const exError = (message: string, error: unknown) => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    console.log('-------------------------------------------------------------')
    console.error(
      message,
      (error as { message: string }).message,
    )
  }
}
const error = (...prms: string[]) => {
  console.log('-------------------------------------------------------------')
  console.error(...prms)
}

const debug = (...prms: string[]) => {
  console.log('-------------------------------------------------------------')
  console.debug(...prms)
}
/* eslint-enable no-console */

export {
  info,
  error,
  exError,
  debug,
}
