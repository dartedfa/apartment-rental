import styled from '@emotion/styled'

const Form = styled.form(
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '> div': {
      margin: '10px auto',
      width: '100%',
      maxWidth: '300px',
    },
  },
  ({fullScreen}) => {
    if (fullScreen) return {'> div': {maxWidth: '600px'}}
  },
)

export default Form
