import React from 'react'
import GoogleLogin from 'react-google-login'
import {AiOutlineGooglePlus} from 'react-icons/ai'
import styled from '@emotion/styled'
import {useAuth} from '../../context/auth-context'

const GoogleButton = styled.button({
  width: '100%',
  height: '5.5rem',
  borderRadius: '.4rem',
  background: '#db3236',
  color: 'white',
  border: '0 transparent',
  textAlign: 'center',

  '&:hover': {
    background: '#3b5998',
    opacity: '0.6',
  },
  '& svg': {
    marginLeft: '-1rem',
    fontSize: '3.5rem',
  },
})

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function GoogleLoginButton({width = 220, height = 100}) {
  const {handleThirdPartyAuthentication} = useAuth()

  const handleGoogleAuth = data => {
    const userData = {
      accessToken: data.accessToken,
      externalId: data.googleId,
      email: data.profileObj.email,
      firstName: data.profileObj.givenName,
      lastName: data.profileObj.familyName,
      userType: 'google',
    }

    handleThirdPartyAuthentication(userData)
  }

  return (
    <GoogleLogin
      clientId={clientId}
      render={renderProps => (
        <GoogleButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <AiOutlineGooglePlus />
          &nbsp;&nbsp;Sign In with Google
        </GoogleButton>
      )}
      onSuccess={handleGoogleAuth}
      onFailure={response => console.log(response)}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleLoginButton
