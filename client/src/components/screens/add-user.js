import * as React from 'react'
import {useNavigate} from 'react-router'
import {useCreateUser} from '../../utils/users'
import UserForm from '../organisms/forms/UserForm'

function AddUserScreen() {
  const [handleSubmitCreation] = useCreateUser({throwOnError: true})
  const navigate = useNavigate()

  return (
    <>
      <h1>Add User</h1>
      <UserForm
        handleSubmit={data => {
          handleSubmitCreation({...data, userType: 'regular'})
          navigate('/')
        }}
        title="Add User"
      />
    </>
  )
}

export default AddUserScreen
