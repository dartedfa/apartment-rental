import React from 'react'

import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'
import {useAuth} from './context/auth-context'

function App() {
  const {user} = useAuth()
  console.log(user)
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
