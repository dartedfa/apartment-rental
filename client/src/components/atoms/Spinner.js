/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx, keyframes} from '@emotion/react'
import styled from '@emotion/styled/macro'
import {FaSpinner} from 'react-icons/fa'

const spin = keyframes({
  '0%': {transform: 'rotate(0deg)'},
  '100%': {transform: 'rotate(360deg)'},
})

const Spinner = styled(FaSpinner)({
  animation: `${spin} 1s linear infinite`,
})
Spinner.defaultProps = {
  'aria-label': 'loading',
}

function FullPageSpinner() {
  return (
    <div
      css={{
        display: 'flex',
        height: '100vh',
        fontSize: '5rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spinner />
    </div>
  )
}

export {FullPageSpinner, Spinner}
