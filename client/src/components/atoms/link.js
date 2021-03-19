import styled from '@emotion/styled/macro'
import {Link as RouterLink} from 'react-router-dom'
import * as colors from 'styles/colors'

export const Link = styled(RouterLink)({
  color: colors.indigo,
  ':hover': {
    color: colors.indigoDarken10,
    textDecoration: 'underline',
  },
})
