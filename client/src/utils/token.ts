let token: string | null = null

const setToken = (newToken: string) => {
  console.log('setting token', newToken)
  token = newToken
}

export { setToken, token }
