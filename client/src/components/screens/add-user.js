import * as React from 'react'
import {useNavigate} from 'react-router'
import {useCreateUser} from '../../utils/users'
import UserForm from '../organisms/forms/UserForm'
import UploadAvatar from '../molecules/upload-avatar'
import {useState} from 'react'

function AddUserScreen() {
  const [handleSubmitCreation, {isError, reset}] = useCreateUser({
    throwOnError: true,
  })
  const [avatar, setAvatar] = useState('')
  const navigate = useNavigate()

  return (
    <>
      <h1>Add User</h1>
      <UploadAvatar avatar={avatar} onAvatarChange={setAvatar} />
      <UserForm
        handleSubmit={data => {
          handleSubmitCreation({
            ...data,
            userType: 'regular',
            avatar,
          }).then(response => {
            navigate('/')
          })
        }}
        serverError={isError ? 'Email address is already taken.' : null}
        reset={reset}
        title="Add User"
      />
    </>
  )
}

export default AddUserScreen
