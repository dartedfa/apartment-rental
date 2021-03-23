/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import {Routes, Route} from 'react-router-dom'
import {
  ModalContents,
  Modal,
  ModalOpenButton,
} from './components/organisms/Modal'
import {Button} from './components/atoms/Button'
import LoginForm from './components/organisms/forms/LoginForm'
import RegistrationForm from './components/organisms/forms/RegistrationForm'
import Logo from './components/atoms/Logo'
import {useNavigate, useParams} from 'react-router'
import {Link} from './components/atoms/link'
import {Spinner} from './components/atoms/Spinner'
import {useVerifyUser} from './utils/users'
import {localStorageKey} from './auth'

function PublicRouter() {
  return (
    <Routes>
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/verify/:token" element={<VerifyPage />} />
      <Route path="*" element={<MainPage />} />
    </Routes>
  )
}

function UnauthenticatedApp() {
  return (
    <div
      css={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Logo width="80" height="80" />
      <h1>Apartment Rental</h1>
      <PublicRouter />
    </div>
  )
}

function MainPage() {
  return (
    <>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gridGap: '0.75rem',
        }}
      >
        <Modal>
          <ModalOpenButton>
            <Button variant="primary">Login</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Login" title="Login">
            <LoginForm />
          </ModalContents>
        </Modal>
        <Modal>
          <ModalOpenButton>
            <Button variant="secondary">Register</Button>
          </ModalOpenButton>
          <ModalContents aria-label="Registration form" title="Register">
            <RegistrationForm />
          </ModalContents>
        </Modal>
      </div>
    </>
  )
}

function VerifyPage() {
  const {token} = useParams()
  window.localStorage.setItem(localStorageKey, token)
  const navigate = useNavigate()
  const [handleVerifyUser, {isLoading, isError}] = useVerifyUser(
    navigate,
    token,
  )

  if (isError) {
    return (
      <>
        <h4>Your token is not valid !</h4>
        <Link to="/">Go Home</Link>
      </>
    )
  }

  return (
    <>
      {!token && (
        <>
          <h3
            css={{
              display: 'grid',
              gridGap: '0.75rem',
            }}
          >
            We have sent you an email, in order to access your account please
            verify.
          </h3>
          <Link to="/">Go Home</Link>
        </>
      )}
      {!!token && (
        <Button
          css={{marginTop: '1.5rem'}}
          variant="primary"
          onClick={() => handleVerifyUser()}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : 'Verify your account'}
        </Button>
      )}
    </>
  )
}

export default UnauthenticatedApp
