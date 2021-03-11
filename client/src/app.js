import React from 'react'

import AuthenticatedApp from './authenticated-app'
import UnauthenticatedApp from './unauthenticated-app'

function App() {
  const user = true
  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
