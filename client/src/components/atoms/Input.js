import styled from '@emotion/styled/macro'
import * as colors from 'styles/colors'

const inputStyles = {
  border: 0,
  // background: colors.gray,
  padding: '.8rem 1.2rem',
  fontSize: '1.4rem',
}

export const Input = styled.input(inputStyles, {
  borderTopLeftRadius: '.3rem',
  borderTopRightRadius: '.3rem',
  outline: 'none',
  borderBottom: `1px solid ${colors.gray80}`,
})

export const TextArea = styled.textarea(inputStyles)
