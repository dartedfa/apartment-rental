import UserForm from '../organisms/forms/UserForm'
import * as React from 'react'
import {useUpdateUser} from '../../utils/users'
import {useAuth} from '../../context/auth-context'
import {useNavigate} from 'react-router'
import UploadAvatar from '../molecules/upload-avatar'
import {useState} from 'react'

function EditAccountScreen() {
  const [handleSubmitUpdate] = useUpdateUser({throwOnError: true})
  const {user} = useAuth()

  const [avatar, setAvatar] = useState(user.avatar || '')
  const navigate = useNavigate()

  return (
    <>
      <h1>Edit account</h1>
      <UploadAvatar avatar={avatar} onAvatarChange={setAvatar} />
      <UserForm
        user={user}
        account={user}
        title="Edit account"
        handleSubmit={data => {
          handleSubmitUpdate({...data, avatar})
          navigate('/')
        }}
      />
    </>
  )
}
export default EditAccountScreen
