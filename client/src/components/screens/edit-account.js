import UserForm from '../organisms/forms/UserForm'
import * as React from 'react'
import {useUpdateUser} from '../../utils/users'
import {useAuth} from '../../context/auth-context'
import {useNavigate} from 'react-router'

function EditAccountScreen() {
  const [handleSubmitUpdate] = useUpdateUser({throwOnError: true})
  const {user} = useAuth()
  const navigate = useNavigate()

  return (
    <>
      <h1>Edit account</h1>
      <UserForm
        user={user}
        account={user}
        title="Edit account"
        handleSubmit={data => {
          handleSubmitUpdate(data)
          navigate('/')
        }}
      />
    </>
  )
}
export default EditAccountScreen
