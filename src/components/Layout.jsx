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
      <header className="masthead">
        <div className="container masthead__inner">
          <Link to="/" className="logo-badge">
            <span className="logo-badge__script">RishtaRent</span>
            <span className="logo-badge__sub">Aunties on call</span>
          </Link>
          {/* each link has a small top line and a big bottom line, like an old shop sign */}
          <nav aria-label="Main" className="ribbon-nav">
            <ul>
              <li><NavLink to="/" end><small>Back to</small>Home</NavLink></li>
              <li><NavLink to="/aunties"><small>Meet the</small>Aunties</NavLink></li>
              <li>
                <NavLink to="/booking">
                  <small>Your booking</small>{selectedAunty ? selectedAunty.name.split(' ')[0] : 'Empty'}
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <p className="sim-banner">Simulated booking site. No real aunty will arrive.</p>
      <main id="main" className="container">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container">
          <p>RishtaRent is a student project. Bookings are simulated and no money is taken.</p>
        </div>
      </footer>
    </>
  )
}

export default Layout
