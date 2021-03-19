import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/screens/not-found'
import {useAuth} from './context/auth-context'

function AppRoutes() {
  const {user} = useAuth()
  const isAdmin = user.role === 2
  const isRealtor = user.role >= 1
  return (
    <Routes>
      <Route path="/apartments" element={<div>Apartment List</div>} />

      {isRealtor && (
        <Route
          path="/apartments/edit/:id"
          element={<div>Edit Apartment</div>}
        />
      )}
      {isRealtor && (
        <Route path="/apartments/new" element={<div>Add Apartment</div>} />
      )}

      <Route path="/apartments/:id" element={<div>View Apartment</div>} />

      <Route path="/account" element={<div>Account</div>} />

      {isAdmin && <Route path="/users" element={<div>Users List</div>} />}
      {isAdmin && <Route path="/users/:id" element={<div>User Edit</div>} />}
      {isAdmin && <Route path="/users/new" element={<div>Create User</div>} />}

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AppRoutes
