import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'

function HomePage() {
  const { aunties, status } = useBooking()
  // live count from the loaded list, so it changes when the demo panel books someone out
  const freeCount = aunties.filter((a) => a.slotsLeft > 0).length

  return (
    <>
      <h1 className="visually-hidden">Book a rishta aunty for a home visit</h1>

      <section className="callout" aria-label="Pricing">
        <p className="seal"><span>No extra fee</span></p>
        <p className="callout__script">Get your rishta</p>
        <p className="callout__text">
          <span className="callout__small">Home visits in <span className="pill">Islamabad &amp; Pindi</span></span>
          <strong className="callout__big">Full price before you book</strong>
        </p>
      </section>

      <div className="home-columns paper-sheet">
        <aside className="home-side">
          <div className="side-panel side-panel--brown">
            <p className="side-panel__title">People talk about us</p>
            <blockquote>
              <p>"Nasreen Baji found my son a doctor in three weeks. Now she drops in every Sunday."</p>
              <footer>Mrs. Butt, G-11</footer>
            </blockquote>
          </div>
          <div className="side-panel side-panel--teal">
            <p className="side-panel__title">This week</p>
            <p className="side-panel__big">
              {status === 'ready' ? `${freeCount} aunties free` : 'Checking…'}
            </p>
            <Link to="/aunties" className="btn">Find an aunty</Link>
          </div>
          <div className="side-panel side-panel--orange">
            <p className="side-panel__title">Shaadi season deals</p>
            <p>Haww! Still no rishta in peak shaadi season? Aunty feels sorry for you: 10% off any package for visits from October to January.</p>
            <p>Blessed Friday: Rs 1,000 off visits on Fridays in November. Only a shaitan says 'Black Friday'. — Aunty</p>
          </div>
        </aside>

        <div className="home-main">
          <section aria-labelledby="how-heading">
            <h2 id="how-heading">How it works</h2>
            <ol className="steps">
              <li>Choose an aunty who visits your area.</li>
              <li>Pick a package and any extras.</li>
              <li>Tell us the date and who will be at home.</li>
              <li>Check the total and confirm.</li>
            </ol>
          </section>

          <section aria-labelledby="good-heading">
            <h2 id="good-heading">Good to know before booking</h2>
            <ul className="rules-list">
              <li>1 to 6 family members can sit in on a visit.</li>
              <li>The candidate must be 18 or older.</li>
              <li>Book at least 48 hours ahead.</li>
              <li>Rs 1,500 travel charge if you live outside the aunty's home area.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

export default HomePage
