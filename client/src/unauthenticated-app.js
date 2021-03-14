/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import {
  ModalContents,
  Modal,
  ModalOpenButton,
} from './components/organisms/Modal'
import {Button} from './components/atoms/Button'
import LoginForm from './components/organisms/forms/LoginForm'
import RegistrationForm from './components/organisms/forms/RegistrationForm'
import Logo from './components/atoms/Logo'

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
    </div>
  )
}

export default UnauthenticatedApp
