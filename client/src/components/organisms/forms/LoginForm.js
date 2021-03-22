import React, {useState} from 'react'
import {useAuth} from '../../../context/auth-context'
import {FormGroup} from '../../atoms/FormGroup'
import {Input} from '../../atoms/Input'
import {Button} from '../../atoms/Button'
import {useAsync} from '../../../utils/hooks'
import Form from '../../atoms/Form'
import GoogleButton from '../../atoms/GoogleButton'
import FacebookButton from '../../atoms/FacebookButton'
import {validateUserForm} from '../../../utils/helpers'

function LoginForm() {
  const [stateError, setStateError] = useState('')
  const {login} = useAuth()
  const {isLoading, isError, error, run} = useAsync()

  const handleSubmit = event => {
    event.preventDefault()
    const {email, password} = event.target.elements

    const error = validateUserForm({
      email: email.value,
      password: password.value,
    })

    if (error) {
      return setStateError(error)
    }

    run(
      login({
        email: email.value,
        password: password.value,
      }),
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      {(stateError || isError) && <p>{error?.error || stateError}</p>}
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        <Button type="submit" variant="primary">
          Login
        </Button>
      </div>
      <div>
        <GoogleButton />
        <FacebookButton />
      </div>
    </Form>
  )
}

export default LoginForm
