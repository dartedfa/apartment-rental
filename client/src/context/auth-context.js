import * as React from 'react'
import * as auth from 'auth'
import {useAsync} from '../utils/hooks'
import {client} from '../utils/api-client'
import {FullPageSpinner} from '../components/atoms/Spinner'

async function getUser() {
  let user = null
  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})

    user = {...data.user, token}
  }
  return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const getUserPromise = getUser()
    run(getUserPromise)
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  )
  // TODO Fix navigation in register form.
  const register = React.useCallback(
    form =>
      auth
        .register(form)
        .then(user => console.log('Navigate to success message of invitation')),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    setData(null)
  }, [setData])

  const handleThirdPartyAuthentication = React.useCallback(
    form =>
      auth.handleThirdPartyAuthentication(form).then(user => setData(user)),
    [setData],
  )

  const value = React.useMemo(
    () => ({user, login, register, handleThirdPartyAuthentication, logout}),
    [user, login, register, handleThirdPartyAuthentication, logout],
  )

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <div>Error {error} happened :(</div>
  }

  if (isSuccess) {
    return <AuthContext.Provider value={value} {...props} />
  }

  throw new Error(`unhandled status ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error(`useAuth must be used within AuthProvider.`)
  }

  return context
}

function useClient() {
  const {user} = useAuth()
  const token = user?.token
  return React.useCallback(
    (endpoint, config) => client(endpoint, {...config, token}),
    [token],
  )
}

export {useAuth, AuthProvider, useClient}
