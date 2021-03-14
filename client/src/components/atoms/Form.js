import styled from '@emotion/styled'

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  '> div': {
    margin: '10px auto',
    width: '100%',
    maxWidth: '300px',
  },
})

export default Form
