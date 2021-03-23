import styled from '@emotion/styled/macro'

export const FormGroup = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
  },
  ({inLine}) => {
    if (inLine) {
      return {
        flexDirection: 'row',
        '> input': {
          flex: 3,
        },
        '> label': {
          flex: 1,
          margin: 0,
          marginRight: 15,
          lineHeight: '38px',
        },
        '> select': {
          flex: 3,
          outline: 'none',
          padding: '.8rem 1.2rem',
        },
      }
    }
  },
)
