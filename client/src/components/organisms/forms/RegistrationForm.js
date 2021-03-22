import React from 'react'
import {useAuth} from '../../../context/auth-context'
import {useAsync} from '../../../utils/hooks'
import UserForm from './UserForm'

const RegistrationForm = () => {
  const {register} = useAuth()
  const {isLoading, isError, error, run} = useAsync()

  const handleSubmit = state => {
    const {email, password, firstName, lastName} = state

    run(
      register({
        email,
        password,
        firstName,
        lastName,
      }),
    )
  }
  return <UserForm handleSubmit={handleSubmit} title="Register" />
}

export default RegistrationForm
