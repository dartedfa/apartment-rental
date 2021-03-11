import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {ReactQueryDevtools} from 'react-query-devtools'

function AppProviders({children}) {
  return (
    <Router>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </Router>
  )
}

export default AppProviders
