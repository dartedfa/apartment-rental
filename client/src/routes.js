import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/screens/not-found'
import {useAuth} from './context/auth-context'
import ApartmentListScreen from './components/screens/apartment-list'
import ApartmentScreen from './components/screens/apartment'
import EditApartmentScreen from './components/screens/edit-apartment'
import AddApartmentScreen from './components/screens/add-apartment'
import UserListScreen from './components/screens/user-list'
import EditUserScreen from './components/screens/edit-user'
import AddUserScreen from './components/screens/add-user'
import EditAccountScreen from './components/screens/edit-account'

function AppRoutes() {
  const {user} = useAuth()
  const isAdmin = user.role === 2
  const isRealtor = user.role >= 1
  return (
    <Routes>
      <Route path="/" element={<ApartmentListScreen />} />

      {isRealtor && (
        <Route
          path="/apartments/edit/:apartmentId"
          element={<EditApartmentScreen />}
        />
      )}
      {isRealtor && (
        <Route path="/apartments/new" element={<AddApartmentScreen />} />
      )}

      <Route path="/apartments/:apartmentId" element={<ApartmentScreen />} />

      <Route path="/account" element={<EditAccountScreen />} />

      {isAdmin && <Route path="/users" element={<UserListScreen />} />}
      {isAdmin && (
        <Route path="/users/edit/:userId" element={<EditUserScreen />} />
      )}
      {isAdmin && <Route path="/users/:id" element={<div>User Edit</div>} />}
      {isAdmin && <Route path="/users/new" element={<AddUserScreen />} />}

      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AppRoutes
