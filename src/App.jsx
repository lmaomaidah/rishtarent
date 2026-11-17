import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import DataGate from './components/DataGate.jsx'
import HomePage from './pages/HomePage.jsx'
import AuntiesPage from './pages/AuntiesPage.jsx'
import AuntyDetailsPage from './pages/AuntyDetailsPage.jsx'
import BookingPage from './pages/BookingPage.jsx'
import ReviewPage from './pages/ReviewPage.jsx'
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/aunties" element={<DataGate><AuntiesPage /></DataGate>} />
        <Route path="/aunties/:id" element={<DataGate><AuntyDetailsPage /></DataGate>} />
        <Route path="/booking" element={<DataGate><BookingPage /></DataGate>} />
        <Route path="/review" element={<DataGate><ReviewPage /></DataGate>} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
