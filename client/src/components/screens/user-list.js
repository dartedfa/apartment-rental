import {useAuth} from '../../context/auth-context'
import {Link} from '../atoms/link'
import * as React from 'react'
import UserList from '../organisms/user-list'

function UserListScreen() {
  const {user} = useAuth()
  const isAdmin = user.role === 2
  return (
    <>
      {isAdmin && <Link to="/users/new">Add new User</Link>}
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
