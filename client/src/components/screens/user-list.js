import {useAuth} from '../../context/auth-context'
import {Link} from '../atoms/link'
import * as React from 'react'
import UserList from '../organisms/user-list'
import {AddButton} from '../atoms/Button'
import {useNavigate} from 'react-router'

function UserListScreen() {
  const {user} = useAuth()
  const isAdmin = user.role === 2
  const navigate = useNavigate()
  return (
    <>
      {isAdmin && (
        <AddButton
          onClick={e => {
            navigate('/users/new')
          }}
        >
          Add new User
        </AddButton>
      )}
      <UserList
        noUsers={
          <p>
            Hey there! Welcome to Apartment rental. as it seems we can't find
            any users :(
          </p>
        }
      />
    </>
  )
}

export default UserListScreen
