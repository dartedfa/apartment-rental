import React from 'react'
import {Button} from './Button'
import {useAuth, useClient} from '../../context/auth-context'

function LogOutButton() {
  const client = useClient()
  const {logout} = useAuth()
  const logUserOut = () => {
    return client('logout', {method: 'POST'}).then(logout)
  }
  return (
    <Button onClick={logUserOut} variant="secondary">
      Log Out
    </Button>
  )
}

export default LogOutButton
