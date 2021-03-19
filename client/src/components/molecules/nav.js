/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import * as colors from 'styles/colors'
import * as mq from 'styles/media-queries'
import NavLink from '../atoms/nav-link'
import {useAuth} from '../../context/auth-context'

function Nav(params) {
  const {user} = useAuth()
  const isAdmin = user.role === 2
  return (
    <nav
      css={{
        position: 'sticky',
        top: '4px',
        padding: '1em 1.5em',
        border: `1px solid ${colors.gray10}`,
        borderRadius: '3px',
        [mq.small]: {
          position: 'static',
          top: 'auto',
        },
      }}
    >
      <ul
        css={{
          listStyle: 'none',
          padding: '0',
        }}
      >
        <li>
          <NavLink to="/apartments">Apartments</NavLink>
        </li>
        {isAdmin && (
          <li>
            <NavLink to="/users">Users</NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Nav
