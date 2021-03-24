/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'
import {Button} from './Button'
import * as colors from '../../styles/colors'

function PromptMessage({onContinue, onCancel, children}) {
  const handleContinue = () => {
    onContinue && onContinue()
  }
  const handleCancel = () => {
    onCancel && onCancel()
  }
  return (
    <div
      css={{
        position: 'absolute',
        backgroundColor: colors.gray,
        border: `1px solid ${colors.gray20}`,
        padding: 10,
        right: '50%',
        transform: 'translateX(50%)',
      }}
    >
      {children}
      <div
        css={{
          float: 'right',
          marginTop: 40,
        }}
      >
        <Button
          variant="error"
          onClick={handleContinue}
          css={{marginRight: 10}}
        >
          Yes
        </Button>
        <Button variant="primary" onClick={handleCancel}>
          No
        </Button>
      </div>
    </div>
  )
}

export default PromptMessage
