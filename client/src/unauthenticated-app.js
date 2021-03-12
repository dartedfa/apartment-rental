import React from 'react'
import Button from './components/atoms/Button'
import Logo from './components/atoms/Logo'
import GoogleButton from './components/atoms/GoogleButton'
import FacebookButton from './components/atoms/FacebookButton'

function UnauthenticatedApp() {
  return (
    <div>
      <Logo width="200" height="200" />
      <h1>Apartment rental</h1>
      <Button>Login</Button>
      <Button>Register</Button>
      <GoogleButton />
      <FacebookButton />
    </div>
  )
}

export default UnauthenticatedApp
