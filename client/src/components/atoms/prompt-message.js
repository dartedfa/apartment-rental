/** @jsxRuntime classic /
 /** @jsx jsx */
import {jsx} from '@emotion/react'
import {Button} from './Button'

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
      }}
    >
      {children}
      <Button variant="error" onClick={handleContinue}>
        Yes
      </Button>
      <Button variant="primary" onClick={handleCancel}>
        No
      </Button>
    </div>
  )
}

export default PromptMessage
