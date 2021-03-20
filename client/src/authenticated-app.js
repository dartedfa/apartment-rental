/** @jsxRuntime classic /
/** @jsx jsx */
import {jsx} from '@emotion/react'

import AppRoutes from './routes'
import LogOutButton from './components/atoms/LogOutButton'
import Nav from './components/molecules/nav'
import {
  ErrorMessage,
  FullPageErrorFallback,
} from './components/atoms/error-messages'
import {ErrorBoundary} from 'react-error-boundary'

import {useAuth} from './context/auth-context'
import * as mq from './styles/media-queries'

function ErrorFallback({error}) {
  return (
    <ErrorMessage
      error={error}
      css={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
  )
}

function AuthenticatedApp() {
  const {user} = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        <div
          css={{
            marginRight: 15,
          }}
        >
          {user.firstName} {user.lastName}
        </div>
        <LogOutButton />
      </div>
      <div
        css={{
          margin: '0 auto',
          padding: '4em 2em',
          maxWidth: '1240px',
          width: '100%',
          display: 'grid',
          gridGap: '1em',
          gridTemplateColumns: '1fr 3fr',
          [mq.small]: {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
            width: '100%',
          },
        }}
      >
        <div css={{position: 'relative'}}>
          <Nav />
        </div>
        <main css={{width: '100%'}}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <AppRoutes />
          </ErrorBoundary>
        </main>
      </div>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
