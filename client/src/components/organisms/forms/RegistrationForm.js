import React from 'react'
import {useAuth} from '../../../context/auth-context'
import {useAsync} from '../../../utils/hooks'
import UserForm from './UserForm'

const RegistrationForm = () => {
  const {register} = useAuth()
  const {isLoading, isError, error, run} = useAsync()

  const handleSubmit = event => {
    event.preventDefault()

    const {email, password, firstName, lastName} = event.target.elements

    run(
      register({
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }),
    )
  }
  return <UserForm handleSubmit={handleSubmit} title="Register" />
}

export default RegistrationForm
