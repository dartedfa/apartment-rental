import React from 'react'
import styled from '@emotion/styled'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import {AiFillFacebook} from 'react-icons/ai'
import {useAuth} from '../../context/auth-context'

const FacebookButton = styled.button({
  width: '100%',
  height: '5.5rem',
  borderRadius: '.4rem',
  background: '#3b5998',
  color: 'white',
  border: '0px transparent',
  textAlign: 'center',
  display: 'inline-block',
  marginTop: '.5rem',
  '&:hover': {
    background: '#3b5998',
    opacity: '0.6',
  },
  '& svg': {
    fontSize: '3.5rem',
  },
})

const appId = process.env.REACT_APP_FACEBOOK_APP_ID

function FacebookLoginButton() {
  const {handleThirdPartyAuthentication} = useAuth()

  const handleFacebookResponse = data => {
    const [firstName, lastName] = data.name.split(' ')
    const userData = {
      accessToken: data.accessToken,
      externalId: data.userID,
      email: data.email,
      firstName,
      lastName,
      userType: 'facebook',
    }

    handleThirdPartyAuthentication(userData)
  }
  return (
    <FacebookLogin
      appId={appId}
      fields="name,email,picture"
      callback={handleFacebookResponse}
      onFailure={error => console.log(error)}
      render={renderProps => (
        <FacebookButton onClick={renderProps.onClick}>
          <AiFillFacebook />
          &nbsp; &nbsp;Sign In with Facebook
        </FacebookButton>
      )}
    />
  )
}

export default FacebookLoginButton
