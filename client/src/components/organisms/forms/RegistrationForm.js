import React, {useState} from 'react'
import {useAuth} from '../../../context/auth-context'
import {useAsync} from '../../../utils/hooks'
import UserForm from './UserForm'
import {validateUserForm} from '../../../utils/helpers'
import {useNavigate} from 'react-router'

const RegistrationForm = () => {
  const {register} = useAuth()
  const {isLoading, isError, error, run} = useAsync()
  const [stateError, setStateError] = useState('')
  const navigate = useNavigate()
  const handleSubmit = state => {
    const {email, password, firstName, lastName} = state

    const error = validateUserForm({
      email,
      password,
      firstName,
      lastName,
    })

    if (error) {
      return setStateError(error)
    } else {
      setStateError('')
    }

    run(
      register({
        email,
        password,
        firstName,
        lastName,
      }),
    ).then(() => {
      navigate('/verify')
    })
  }
  return (
    <>
      {(stateError || isError) && <p>{stateError || error?.error}</p>}
      <UserForm handleSubmit={handleSubmit} title="Register" />
    </>
  )
}

export default RegistrationForm
