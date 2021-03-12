import React from 'react'

import GoogleLogin from 'react-google-login'
import GoogleButton from 'react-google-button'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID

function GoogleLoginButton({width = 220, height = 100}) {
  return (
    <GoogleLogin
      clientId={clientId}
      render={renderProps => (
        <GoogleButton
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          Sign in with Google
        </GoogleButton>
      )}
      onSuccess={response => console.log(response)}
      onFailure={response => console.log(response)}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default GoogleLoginButton
