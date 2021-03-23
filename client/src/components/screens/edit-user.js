import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {useUpdateUser, useUser} from '../../utils/users'
import {FullPageSpinner} from '../atoms/Spinner'
import * as React from 'react'
import UserForm from '../organisms/forms/UserForm'
import UploadAvatar from '../molecules/upload-avatar'
import {useState} from 'react'

function EditUserScreen() {
  const navigate = useNavigate()
  const {userId} = useParams()

  const {data: user = {}, isLoading, error} = useUser(userId)
  const [handleSubmitUpdate] = useUpdateUser({throwOnError: true})
  const [avatar, setAvatar] = useState(user.avatar || '')

  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      <h1>Edit User</h1>
      {user.userType === 'regular' && (
        <UploadAvatar
          avatar={avatar || user.avatar}
          onAvatarChange={setAvatar}
        />
      )}
      <UserForm
        user={user}
        title="Edit User"
        handleSubmit={data => {
          handleSubmitUpdate({...data, target: data._id, avatar})
          navigate('/users')
        }}
      />
    </>
  )
}

export default EditUserScreen
