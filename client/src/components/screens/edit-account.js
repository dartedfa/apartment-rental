import UserForm from '../organisms/forms/UserForm'
import * as React from 'react'
import {useUpdateMe, useUpdateUser} from '../../utils/users'
import {useAuth} from '../../context/auth-context'
import {useNavigate} from 'react-router'
import UploadAvatar from '../molecules/upload-avatar'
import {useState} from 'react'
import {validateUserForm} from '../../utils/helpers'

const exceptions = {
  regular: {password: true},
  google: {password: true, email: true},
  facebook: {password: true, email: true},
}

function EditAccountScreen() {
  const [handleSubmitUpdate] = useUpdateMe({throwOnError: true})
  const {user} = useAuth()

  const [avatar, setAvatar] = useState(user.avatar || '')
  const navigate = useNavigate()

  const handleSubmit = data => {
    handleSubmitUpdate({...data, avatar})
    navigate('/')
  }

  return (
    <>
      <h1>Edit account</h1>
      {user.userType === 'regular' && (
        <UploadAvatar avatar={avatar} onAvatarChange={setAvatar} />
      )}
      <UserForm
        user={user}
        title="Edit account"
        handleSubmit={handleSubmit}
        except={exceptions[user.userType]}
      />
    </>
  )
}

export default EditAccountScreen
