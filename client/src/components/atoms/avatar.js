import React from 'react'
import userPlaceholderSvg from '../../assets/user-placeholder.svg'

function Avatar({src}) {
  return (
    <div>
      <img
        src={src || userPlaceholderSvg}
        alt="Avatar"
        width={50}
        height={50}
      />
    </div>
  )
}

export default Avatar
