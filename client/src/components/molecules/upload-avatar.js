/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import {useDropzone} from 'react-dropzone'
import {useState} from 'react'
import Avatar from '../atoms/avatar'

function UploadAvatar({avatar, onAvatarChange}) {
  const [imageSource, setImageSource] = React.useState(avatar)
  const [error, setError] = useState('')

  const onDrop = React.useCallback(
    acceptedFiles => {
      acceptedFiles.forEach(file => {
        if (!file.type.includes('image')) {
          return setError('Please upload correct file type.')
        }
        setError('')
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onerror = () => setError('File reading has failed')
        reader.onload = () => {
          const source = reader.result
          setImageSource(source)
          onAvatarChange(source)
        }
      })
    },
    [onAvatarChange],
  )

  const {getRootProps, getInputProps} = useDropzone({onDrop})
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Avatar src={imageSource} />
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p
          css={{
            cursor: 'pointer',
            color: 'blue',
            textDecoration: 'underline',
            marginTop: '.7rem',
            marginLeft: '1rem',
          }}
        >
          Click to change avatar
        </p>
      </div>
      {error && <p>{error}</p>}
    </div>
  )
}

export default UploadAvatar
