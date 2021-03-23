import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'
import {Spinner} from './Spinner'
import {FaTimesCircle} from 'react-icons/all'
import {useAsync} from '../../utils/hooks'

const buttonVariants = {
  primary: {backgroundColor: colors.green},
  secondary: {backgroundColor: colors.orange},
  tertiary: {backgroundColor: colors.gray10, color: colors.text},
  error: {backgroundColor: colors.red},
}

export const Button = styled.button(
  {
    border: 0,
    borderRadius: 4,
    color: colors.base,
    cursor: 'pointer',
    lineHeight: 1,
    padding: '1.5rem 2rem',
    fontSize: '1.5rem',
  },
  ({variant}) => buttonVariants[variant],
)

export const CircleButton = styled.button({
  padding: 0,
  borderRadius: '50%',
  width: '5.5rem',
  height: '5.5rem',
  fontSize: '2rem',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: colors.base,
  color: colors.text,
  border: `1px solid ${colors.gray10}`,
  cursor: 'pointer',
})

export const AddButton = styled.button({
  padding: '1.5rem 2rem',
  fontSize: '1.5rem',
  cursor: 'pointer',
  borderRadius: 4,
  lineHeight: '1',
  display: 'flex',
  color: colors.text,
  marginBottom: 20,
  border: `1px solid ${colors.orange}`,
  backgroundColor: colors.base,
})

export function ActionButton({
  label,
  highlight,
  onClick,
  icon,
  async,
  ...rest
}) {
  const {isLoading, isError, error, run, reset} = useAsync()
  function handleClick() {
    if (isError) {
      reset()
    } else {
      async ? run(onClick()) : onClick && onClick()
    }
  }

  return (
    <CircleButton
      css={{
        backgroundColor: 'white',
        ':hover,:focus': {
          color: isLoading
            ? colors.gray80
            : isError
            ? colors.danger
            : highlight,
        },
      }}
      disabled={isLoading}
      onClick={handleClick}
      aria-label={isError ? error.message : label}
      {...rest}
    >
      {isLoading ? <Spinner /> : isError ? <FaTimesCircle /> : icon}
    </CircleButton>
  )
}
