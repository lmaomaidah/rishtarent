import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'

function Layout() {
  const { pathname } = useLocation()
  const { selectedAunty } = useBooking()

  // new page, start at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link to="/" className="brand">RishtaRent</Link>
          <nav aria-label="Main">
            <ul className="nav-list">
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/aunties">Find an aunty</NavLink></li>
              <li><NavLink to="/booking">Your booking: {selectedAunty ? selectedAunty.name : 'empty'}</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
      <p className="sim-banner">Simulated booking site. No real aunty will arrive.</p>
      <main id="main" className="container">
        <Outlet />
      </main>
      <footer className="site-footer container">
        <p>RishtaRent is a student project. Bookings are simulated and no money is taken.</p>
      </footer>
    </>
  )
}

export default Layout
