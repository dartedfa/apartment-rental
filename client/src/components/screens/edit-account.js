import UserForm from '../organisms/forms/UserForm'
import * as React from 'react'
import {useUpdateUser} from '../../utils/users'
import {useAuth} from '../../context/auth-context'
import {useNavigate} from 'react-router'
import UploadAvatar from '../molecules/upload-avatar'
import {useState} from 'react'
import {validateUserForm} from '../../utils/helpers'

function EditAccountScreen() {
  const [handleSubmitUpdate] = useUpdateUser({throwOnError: true})
  const {user} = useAuth()

  const [avatar, setAvatar] = useState(user.avatar || '')
  const navigate = useNavigate()

  const handleSubmit = data => {
    const {email, password, firstName, lastName} = data

    const error = validateUserForm({
      email,
      password,
      firstName,
      lastName,
    })
    console.log(error, password)

    //handleSubmitUpdate({...data, avatar})
    // navigate('/')
  }

  return (
    <>
      <h1>Edit account</h1>
      {user.userType === 'regular' && (
        <UploadAvatar avatar={avatar} onAvatarChange={setAvatar} />
      )}
      <UserForm user={user} title="Edit account" handleSubmit={handleSubmit} />
    </>
  )
}

export default EditAccountScreen
