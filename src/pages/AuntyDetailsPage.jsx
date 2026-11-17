import { Link, useParams } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'
import { PACKAGE_TYPES } from '../data/catalog.js'
import { formatRs, TRAVEL_CHARGE } from '../rules/pricing.js'
import Avatar from '../components/Avatar.jsx'
import StatusMessage from '../components/StatusMessage.jsx'

function AuntyDetailsPage() {
  const { id } = useParams()
  const { aunties } = useBooking()
  const aunty = aunties.find((a) => a.id === id)

  if (!aunty) {
    return (
      <StatusMessage title="We couldn't find that aunty" text="The link may be old or mistyped.">
        <Link to="/aunties" className="btn">See all aunties</Link>
      </StatusMessage>
    )
  }

  const full = aunty.slotsLeft === 0

  return (
    <>
      <header className="details-header">
        <Avatar name={aunty.name} photo={aunty.photo} size="large" />
        <div>
          <h1>{aunty.name}</h1>
          <p>{aunty.tagline}</p>
          <p>{aunty.rating} out of 5 from families · {aunty.rishtasCompleted} rishtas arranged</p>
          <p>{aunty.verified ? 'Visited in person by our team' : 'New here, not yet visited by our team'}</p>
          <p>Experience: {aunty.yearsExperience === null ? 'Not provided' : `${aunty.yearsExperience} years`}</p>
          {full ? (
            <p className="badge badge--error">Fully booked this week</p>
          ) : (
            <p className="badge badge--ok">{aunty.slotsLeft} visits left this week</p>
          )}
        </div>
      </header>

      <section aria-labelledby="about-heading">
        <h2 id="about-heading" className="ribbon">About her</h2>
        <p>{aunty.bio}</p>
        <p>Speaks: {aunty.languages.join(', ')}</p>
        <p>Good with: {aunty.specialities.join(', ')}</p>
      </section>

      <section aria-labelledby="areas-heading">
        <h2 id="areas-heading" className="ribbon">Where she visits</h2>
        <ul>
          {aunty.areasServed.map((area) => (
            <li key={area}>{area}</li>
          ))}
        </ul>
        <p>No travel charge in {aunty.homeArea}. Anywhere else she visits adds {formatRs(TRAVEL_CHARGE)}.</p>
      </section>

      <section aria-labelledby="packages-heading">
        <h2 id="packages-heading" className="ribbon">Packages</h2>
        {aunty.packages.map((p) => {
          const type = PACKAGE_TYPES[p.id]
          return (
            <div key={p.id} className="panel package">
              <h3>{type.name}</h3>
              <p>{type.duration} · {formatRs(p.price)}</p>
              <ul>
                {type.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )
        })}
      </section>

      <section aria-labelledby="conditions-heading" className="panel">
        <h2 id="conditions-heading">Conditions</h2>
        <ul>
          <li>1 to 6 family members</li>
          <li>Candidate must be 18+</li>
          <li>Book at least 48 hours ahead</li>
          <li>{formatRs(TRAVEL_CHARGE)} travel outside {aunty.homeArea}</li>
        </ul>
      </section>
    </>
  )
}

export default AuntyDetailsPage
