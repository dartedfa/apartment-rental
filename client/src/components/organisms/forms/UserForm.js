import React from 'react'
import Form from '../../atoms/Form'
import {FormGroup} from '../../atoms/FormGroup'
import {Input} from '../../atoms/Input'
import {Button} from '../../atoms/Button'

function UserForm({handleSubmit, title}) {
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
          {title}
        </Button>
      </div>
    </Form>
  )
}

export default UserForm
