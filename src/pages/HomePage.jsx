import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <>
      <section className="sunburst hero">
        <div className="panel hero-panel">
          <p className="ribbon">Islamabad &amp; Rawalpindi</p>
          <h1>Book a rishta aunty for a home visit</h1>
          <p>You see the full price before you book. No service fee.</p>
          <Link to="/aunties" className="btn">Find an aunty</Link>
        </div>
      </section>

      <section aria-labelledby="how-heading">
        <h2 id="how-heading" className="ribbon">How it works</h2>
        <ol>
          <li>Choose an aunty who visits your area.</li>
          <li>Pick a package and any extras.</li>
          <li>Tell us the date and who will be at home.</li>
          <li>Check the total and confirm.</li>
        </ol>
      </section>

      <section aria-labelledby="good-heading">
        <h2 id="good-heading" className="ribbon">Good to know before booking</h2>
        <ul>
          <li>1 to 6 family members can sit in on a visit.</li>
          <li>The candidate must be 18 or older.</li>
          <li>Book at least 48 hours ahead.</li>
          <li>Rs 1,500 travel charge if you live outside the aunty's home area.</li>
        </ul>
      </section>
    </>
  )
}

export default HomePage
