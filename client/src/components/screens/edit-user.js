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
  const [error, setError] = useState(false)
  const {data: user = {}, isLoading} = useUser(userId)
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
        except={{password: true}}
        serverError={error && 'Email address is already taken.'}
        handleSubmit={data => {
          handleSubmitUpdate({...data, target: data._id, avatar}).then(
            response => navigate('/users'),
            error => setError(true),
          )
        }}
      />
    </>
  )
}

export default EditUserScreen
