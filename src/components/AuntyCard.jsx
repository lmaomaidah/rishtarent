import { Link } from 'react-router-dom'
import Avatar from './Avatar.jsx'
import { formatRs, getFromPrice, getTravelCharge, TRAVEL_CHARGE } from '../rules/pricing.js'

function AuntyCard({ aunty, area, isSelected }) {
  const full = aunty.slotsLeft === 0
  const travel = getTravelCharge(aunty, area)

  return (
    <article className={`panel card${full ? ' card--unavailable' : ''}`}>
      <div className="card__top">
        <Avatar name={aunty.name} photo={aunty.photo} />
        <div>
          <h3><Link to={`/aunties/${aunty.id}`}>{aunty.name}</Link></h3>
          <p>{aunty.tagline}</p>
        </div>
      </div>

      {isSelected && <p className="ribbon ribbon--teal">Selected</p>}

      {full ? (
        <p className="badge badge--error">Fully booked this week</p>
      ) : (
        <p className="badge badge--ok">{aunty.slotsLeft} visits left this week</p>
      )}

      <ul className="card__facts">
        <li>Visits: {aunty.areasServed.join(', ')}</li>
        <li>Speaks: {aunty.languages.join(', ')}</li>
        <li>Good with: {aunty.specialities.join(', ')}</li>
        <li>{aunty.rating} out of 5 from families</li>
        <li>{aunty.rishtasCompleted} rishtas arranged</li>
        <li>{aunty.verified ? 'Visited in person by our team' : 'New here, not yet visited by our team'}</li>
      </ul>

      <div className="card__price">
        {area ? (
          <>
            <p>From {formatRs(getFromPrice(aunty, area))} all-in for {area}</p>
            {travel > 0 && <p>includes {formatRs(travel)} travel</p>}
          </>
        ) : (
          <>
            <p>From {formatRs(getFromPrice(aunty, ''))}</p>
            <p>+ {formatRs(TRAVEL_CHARGE)} travel outside {aunty.homeArea} · no service fee</p>
          </>
        )}
      </div>

      <Link to={`/aunties/${aunty.id}`} className="btn">
        {full ? 'View profile (fully booked)' : 'View details'}
      </Link>
    </article>
  )
}

export default AuntyCard
