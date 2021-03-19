import {Routes, Route} from 'react-router-dom'
import {NotFoundScreen} from 'components/screens/not-found'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/apartments" element={<div>Apartment List</div>} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  )
}

export default AppRoutes
