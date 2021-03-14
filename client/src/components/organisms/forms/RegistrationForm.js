import React from 'react'
import {useAuth} from '../../../context/auth-context'
import {useAsync} from '../../../utils/hooks'
import {FormGroup} from '../../atoms/FormGroup'
import {Input} from '../../atoms/Input'
import {Button} from '../../atoms/Button'
import Form from '../../atoms/Form'

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
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="firstName">Firstname</label>
        <Input id="firstName" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="lastName">Lastname</label>
        <Input id="lastName" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <Input id="password" type="password" />
      </FormGroup>
      <div>
        <Button type="submit" variant="secondary">
          Register
        </Button>
      </div>
    </Form>
  )
}

export default RegistrationForm
