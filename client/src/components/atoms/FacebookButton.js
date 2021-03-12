import React from 'react'
import FacebookLogin from 'react-facebook-login'

const appId = process.env.REACT_APP_FACEBOOK_APP_ID

function FacebookButton() {
  const onClick = () => {
    console.log('clicked')
  }

  const responseFacebook = res => {
    console.log(res)
  }
  return (
    <FacebookLogin
      appId={appId}
      autoLoad={true}
      fields="name,email,picture"
      onClick={onClick}
      callback={responseFacebook}
    />
  )
}

export default FacebookButton
