/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import {Link} from 'react-router-dom'
import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import {useAuth} from '../../context/auth-context'
import {ActionButton} from '../atoms/Button'
import {useRemoveUser} from '../../utils/users'
import {AiTwotoneEdit, FaMinusCircle} from 'react-icons/all'
import Avatar from '../atoms/avatar'

function UserRow({users}) {
  const {email, firstName, lastName, userType, verified, role, avatar} = users
  const [handleRemoveUser] = useRemoveUser()
  const {user} = useAuth()

  const userRole = ['User', 'Realtor', 'Admin']

  const isAdmin = user.role === 2

  const id = `apartment-row-${users._id}`

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      }}
    >
      <Link
        aria-labelledby={id}
        to={`/users/edit/${users._id}`}
        css={{
          minHeight: 270,
          flexGrow: 2,
          display: 'grid',
          gridTemplateColumns: '140px 1fr',
          gridGap: 20,
          border: `1px solid ${colors.gray20}`,
          color: colors.text,
          padding: '1.25em',
          borderRadius: '3px',
          ':hover,:focus': {
            textDecoration: 'none',
            boxShadow: '0 5px 15px -5px rgba(0,0,0,.08)',
            color: 'inherit',
          },
        }}
      >
        <div
          css={{
            width: 140,
            [mq.small]: {
              width: 100,
            },
          }}
        >
          <Avatar src={avatar} width={'100%'} height={'100%'} />
        </div>
        <div css={{flex: 1}}>
          <div css={{display: 'flex', justifyContent: 'space-between'}}>
            <div css={{flex: 1}}>
              <h2
                id={id}
                css={{
                  fontSize: '1.25em',
                  margin: '0',
                  color: colors.indigo,
                }}
              >
                {firstName}
              </h2>
            </div>
            <div css={{marginLeft: 10, flex: 1}}>
              <div
                css={{
                  fontSize: '1.6rem',
                }}
              >
                <p>
                  Full name: {firstName} {lastName}
                </p>
                <p>Email: {email}</p>
                <p>User type: {userType}</p>
                <p>Verified: {verified === true ? 'Yes' : 'No'}</p>
                <p>Role: {userRole[role] || 'Unknown'}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      {isAdmin && (
        <div
          css={{
            marginLeft: '20px',
            position: 'absolute',
            right: -20,
            color: colors.gray80,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <Link to={`/users/edit/${users._id}`}>
            <ActionButton async={false} icon={<AiTwotoneEdit />} />
          </Link>
          <ActionButton
            async={true}
            icon={<FaMinusCircle />}
            onClick={() => handleRemoveUser({_id: users._id})}
          />
        </div>
      )}
    </div>
  )
}

export {UserRow}
