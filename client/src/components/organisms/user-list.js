import {useUsers} from '../../utils/users'
import {FullPageSpinner} from '../atoms/Spinner'
import * as React from 'react'
import {UserListUL} from '../atoms/user-list'
import {UserRow} from '../molecules/user-row'

function UserList({noUsers}) {
  const {data: users = [], isLoading} = useUsers()

  if (isLoading) {
    return <FullPageSpinner />
  }

  if (!users.length) {
    return <div css={{marginTop: '1em', fontSize: '1.2em'}}>{noUsers}</div>
  }

  return (
    <>
      <UserListUL>
        {users.map(user => (
          <li key={user._id} aria-label={user.firstName}>
            <UserRow users={user} />
          </li>
        ))}
      </UserListUL>
    </>
  )
}

export default UserList
