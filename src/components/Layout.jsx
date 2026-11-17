import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'
import HeroSlider from './HeroSlider.jsx'

function Layout() {
  const { pathname } = useLocation()
  const { selectedAunty } = useBooking()
  const isHome = pathname === '/'

  // new page, start at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>

      {/* the "poster": orange board, logo, tabs, ribbon nav and slate frame are one piece, like an old print ad */}
      <header className="poster container">
        <div className="poster__top">
          <Link to="/" className="logo-badge">
            <span className="logo-badge__script">RishtaRent</span>
            <span className="logo-badge__sub">Aunties on call</span>
          </Link>
          <div className="poster__tabs">
            <span className="tab">Islamabad</span>
            <span className="tab">Rawalpindi</span>
            <Link to="/aunties" className="tab tab--orange">Book a home visit</Link>
          </div>
        </div>

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
            <li><NavLink to="/review"><small>Check your</small>Total</NavLink></li>
          </ul>
        </nav>

        <div className="poster__frame">
          {isHome && <HeroSlider />}
          <p className="poster__banner">Simulated booking site. No real aunty will arrive.</p>
        </div>
      </header>

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
