/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import React, {useState} from 'react'
import Form from '../../atoms/Form'
import {FormGroup} from '../../atoms/FormGroup'
import {Input} from '../../atoms/Input'
import {Button} from '../../atoms/Button'
import {useAuth} from '../../../context/auth-context'
import {useLocation} from 'react-router'
import * as colors from '../../../styles/colors'
import {validateUserForm} from '../../../utils/helpers'

function UserForm({handleSubmit, title, user}) {
  const [state, setState] = useState({
    _id: user?._id,
    email: user?.email || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    role: user?.role || 0,
    password: '',
  })
  const [error, setError] = useState('')

  const {email, firstName, lastName, role} = state
  const {pathname} = useLocation()
  const {user: account} = useAuth()

  const showRole = account?.role === 2 && pathname !== '/account'

  const setSingleState = ({target}) => {
    setState(prevState => ({
      ...prevState,
      [target.id]: target.type === 'checkbox' ? target.checked : target.value,
    }))
  }

  const handleValidateBeforeSubmit = event => {
    event.preventDefault()

    const error = validateUserForm(state)
    if (error) {
      return setError(error)
    }

    handleSubmit(state)
  }

  return (
    <Form
      onSubmit={handleValidateBeforeSubmit}
      fullScreen={true}
      css={{
        backgroundColor: colors.base,
      }}
    >
      {!!error && <p>{error}</p>}
      <FormGroup inLine={true}>
        <label htmlFor="firstName">Firstname</label>
        <Input
          id="firstName"
          type="text"
          value={firstName}
          onChange={setSingleState}
        />
      </FormGroup>
      <FormGroup inLine={true}>
        <label htmlFor="lastName">Lastname</label>
        <Input
          id="lastName"
          type="text"
          value={lastName}
          onChange={setSingleState}
        />
      </FormGroup>
      {(user?.userType === 'regular' || !user) && (
        <FormGroup inLine={true}>
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="text"
            value={email}
            onChange={setSingleState}
          />
        </FormGroup>
      )}
      {showRole && (
        <FormGroup inLine={true}>
          <label htmlFor="role">Role</label>
          <select id="role" onChange={setSingleState} value={role}>
            <option value={0}>User</option>
            <option value={1}>Realtor</option>
            <option value={2}>Admin</option>
          </select>
        </FormGroup>
      )}
      {(user?.userType === 'regular' || !user) && (
        <FormGroup inLine={true}>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            value={state.password}
            onChange={setSingleState}
          />
        </FormGroup>
      )}
      <div css={{textAlign: 'right'}}>
        <Button type="submit" variant="secondary">
          {title}
        </Button>
      </div>
    </Form>
  )
}

export default UserForm
