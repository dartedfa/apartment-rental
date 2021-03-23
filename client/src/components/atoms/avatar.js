import React from 'react'
import userPlaceholderSvg from '../../assets/user-placeholder.svg'

function Avatar({src, width = '50', height = '50', style = {}}) {
  return (
    <>
      <img
        src={src || userPlaceholderSvg}
        alt="Avatar"
        width={width}
        height={height}
        style={style}
      />
    </>
  )
}

export default Avatar
