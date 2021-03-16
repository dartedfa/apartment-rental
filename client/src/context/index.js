import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {ReactQueryDevtools} from 'react-query-devtools'
import {AuthProvider} from './auth-context'
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory()

function AppProviders({children}) {
  return (
    <Router history={history}>
      <ReactQueryDevtools initialIsOpen={false} />
      <AuthProvider>{children}</AuthProvider>
    </Router>
  )
}

export default AppProviders
