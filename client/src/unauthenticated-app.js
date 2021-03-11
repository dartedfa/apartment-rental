import React from 'react'
import Button from './components/atoms/Button'
import Logo from './components/atoms/Logo'

function UnauthenticatedApp() {
  return (
    <div>
      <Logo width="200" height="20  0" />
      <h1>Apartment rental</h1>
      <Button>Login</Button>
      <Button>Register</Button>
    </div>
  )
}

export default UnauthenticatedApp
