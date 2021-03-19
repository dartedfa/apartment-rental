import * as React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {ReactQueryDevtools} from 'react-query-devtools'
import {AuthProvider} from './auth-context'
import {createBrowserHistory} from 'history'
import {ReactQueryConfigProvider} from 'react-query'

export const history = createBrowserHistory()

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else return failureCount < 2
    },
  },
}

function AppProviders({children}) {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router history={history}>
        <ReactQueryDevtools initialIsOpen={false} />
        <AuthProvider>{children}</AuthProvider>
      </Router>
    </ReactQueryConfigProvider>
  )
}

export default AppProviders
