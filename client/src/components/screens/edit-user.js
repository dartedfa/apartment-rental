import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router'
import {useUpdateUser, useUser} from '../../utils/users'
import {FullPageSpinner} from '../atoms/Spinner'
import * as React from 'react'
import UserForm from '../organisms/forms/UserForm'
import {useState} from 'react'
import {useAuth} from '../../context/auth-context'

function EditUserScreen() {
  const navigate = useNavigate()
  const {userId} = useParams()

  const {data: user = {}, isLoading, error} = useUser(userId)
  const [handleSubmitUpdate] = useUpdateUser({throwOnError: true})
  const {user: account} = useAuth()
  const isAdmin = account.role === 2
  if (isLoading) {
    return <FullPageSpinner />
  }

  return (
    <>
      <h1>Edit User</h1>
      <UserForm
        user={user}
        title="Edit User"
        account={account}
        handleSubmit={data => {
          console.log(data)
          handleSubmitUpdate(data)
          navigate('/')
        }}
      />
    </>
  )
}

export default EditUserScreen
