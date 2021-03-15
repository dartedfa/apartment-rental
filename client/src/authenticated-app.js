import React from 'react'
import AppRoutes from './routes'
import LogOutButton from './components/atoms/LogOutButton'

function AuthenticatedApp() {
  return (
    <div>
      <main>
        <LogOutButton />
        <AppRoutes />
      </main>
    </div>
  )
}

export default AuthenticatedApp
