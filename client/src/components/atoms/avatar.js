import React from 'react'
import userPlaceholderSvg from '../../assets/user-placeholder.svg'

function Avatar({src, width = '50', height = '50'}) {
  return (
    <>
      <img
        src={src || userPlaceholderSvg}
        alt="Avatar"
        width={width}
        height={height}
      />
    </>
  )
}

export default Avatar
