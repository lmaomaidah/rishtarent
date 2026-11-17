import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isSeasonOn, nextBlessedFriday, daysUntil } from '../rules/events.js'
import { SEASON_PERCENT, BLESSED_FRIDAY_OFF, formatRs } from '../rules/pricing.js'

function SeasonEvents() {
  const [now] = useState(() => new Date()) // read the clock once, when the section first shows
  const seasonOn = isSeasonOn(now)
  const friday = nextBlessedFriday(now)
  const days = friday ? daysUntil(friday, now) : null
  const fridayText = friday
    ? friday.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''

  return (
    <section className="events" aria-labelledby="events-heading">
      <h2 id="events-heading" className="ribbon">Shaadi season events</h2>
      <div className="events__grid">
        <article className="event">
          <p className={seasonOn ? 'badge badge--ok' : 'badge'}>{seasonOn ? 'On now' : 'Starts 1 October'}</p>
          <h3 className="event__title">Haww! Still no rishta?</h3>
          <p>
            Peak shaadi season runs from October to January. Aunty feels sorry for you, so every package
            is {SEASON_PERCENT}% off for visits in those months.
          </p>
          <Link to="/aunties" className="btn">Find an aunty</Link>
        </article>

        <article className="event event--friday">
          {/* countdown tile: how many days until the next Friday in November */}
          <p className="countdown">
            {friday === null && <span>Back next November</span>}
            {days === 0 && <span>Today!</span>}
            {days > 0 && (
              <>
                <strong>{days}</strong> <span>{days === 1 ? 'day' : 'days'} to go</span>
              </>
            )}
          </p>
          <h3 className="event__title">Blessed Friday</h3>
          <p>
            {formatRs(BLESSED_FRIDAY_OFF)} off visits booked for a Friday in November.
            {friday && ` Next one: ${fridayText}.`}
          </p>
          <blockquote className="event__quote">
            "It's Blessed Friday. Only a shaitan says 'Black Friday'." <span>— Aunty</span>
          </blockquote>
        </article>
      </div>
    </section>
  )
}

export default SeasonEvents
