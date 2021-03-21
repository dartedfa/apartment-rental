import React, {useState} from 'react'
import Form from '../../atoms/Form'
import {FormGroup} from '../../atoms/FormGroup'
import {Input} from '../../atoms/Input'
import {Button} from '../../atoms/Button'

function UserForm({handleSubmit, title, user}) {
  const [state, setState] = useState({
    _id: user?._id,
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    role: user?.role || 0,
    userType: user?.userType || '',
    verified: user?.verified || false,
  })

  const {email, firstName, lastName, role, userType, verified} = state

  const setSingleState = ({target}) => {
    setState(prevState => ({
      ...prevState,
      [target.id]: target.type === 'checkbox' ? target.checked : target.value,
    }))
  }

  const handleValidateBeforeSubmit = event => {
    event.preventDefault()
    handleSubmit(state)
  }

  return (
    <Form onSubmit={handleValidateBeforeSubmit}>
      <FormGroup>
        <label htmlFor="firstName">Firstname</label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="lastName">Lastname</label>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <Input id="email" type="text" value={email} onChange={setSingleState} />
      </FormGroup>
      <FormGroup>
        <label htmlFor="role">Role</label>
        <select id="role" onChange={setSingleState} value={role}>
          <option value={0}>User</option>
          <option value={1}>Realtor</option>
          <option value={2}>Admin</option>
        </select>
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
