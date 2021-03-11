import {Routes, Route} from 'react-router-dom'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/list" element={<div>Apartment List</div>} />
      <Route path="*" element={<div>Not found !</div>} />
    </Routes>
  )
}

export default AppRoutes
