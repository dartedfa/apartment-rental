import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/screens/not-found'
import {useAuth} from './context/auth-context'

function AppRoutes() {
  const {user} = useAuth()
  const isAdmin = user.role === 2
  return (
    <Routes>
      <Route path="/apartments" element={<div>Apartment List</div>} />
      {isAdmin && <Route path="/users" element={<div>Users List</div>} />}
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AppRoutes
