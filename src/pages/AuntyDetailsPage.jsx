import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'
import { AREAS } from '../data/catalog.js'
import { formatRs, TRAVEL_CHARGE } from '../rules/pricing.js'
import { checkServiceArea, findAuntiesForArea } from '../rules/eligibility.js'
import { checkSlots } from '../rules/capacity.js'
import Avatar from '../components/Avatar.jsx'
import LabelWithHelp from '../components/LabelWithHelp.jsx'
import { getLabels } from '../rules/labelHelp.js'
import StatusMessage from '../components/StatusMessage.jsx'
import PackagePicker from '../components/PackagePicker.jsx'
import AddOnPicker from '../components/AddOnPicker.jsx'
import SummaryPanel from '../components/SummaryPanel.jsx'

function AuntyDetailsPage() {
  const { id } = useParams()
  const {
    aunties, booking, summary, selectedAunty, setFilters,
    selectPackage, addAddOn, removeAddOn, setAddOnQty, updateForm,
  } = useBooking()
  const [showFull, setShowFull] = useState(false)
  const aunty = aunties.find((a) => a.id === id)

  if (!aunty) {
    return (
      <StatusMessage title="We couldn't find that aunty" text="The link may be old or mistyped.">
        <Link to="/aunties" className="btn">See all aunties</Link>
      </StatusMessage>
    )
  }

  const slots = checkSlots(aunty)
  const full = !slots.ok
  const isThis = booking.auntyId === aunty.id
  const area = booking.form.area
  const areaCheck = checkServiceArea(aunty, area)
  const areaProblem = area !== '' && !areaCheck.ok
  const otherAunties = areaProblem ? findAuntiesForArea(aunties, area).slice(0, 3) : []
  const labels = getLabels(aunty) // [verified, rishtas, rating]
  const canContinue = isThis && !full && !areaProblem && booking.packageId

  return (
    <>
      <header className="details-header profile">
        <Avatar name={aunty.name} photo={aunty.photo} size="large" />
        <div className="profile__main">
          <h1>{aunty.name}</h1>
          <p className="profile__tagline">"{aunty.tagline}"</p>

          {/* the verified label is a tilted stamp; the other two become number tiles */}
          <p className={aunty.verified ? 'stamp' : 'stamp stamp--new'}>
            <LabelWithHelp label={labels[0].label} help={labels[0].help} />
          </p>
          <ul className="stats">
            {labels.slice(1).map((item) => (
              <li key={item.key} className="stat">
                <strong>{item.value}</strong>
                <LabelWithHelp label={item.caption} help={item.help} />
              </li>
            ))}
            <li className="stat">
              <strong>{aunty.yearsExperience === null ? '?' : aunty.yearsExperience}</strong>
              <span>{aunty.yearsExperience === null ? 'experience: not provided' : 'years experience'}</span>
            </li>
          </ul>

          {full ? (
            <p className="badge badge--error">Fully booked this week</p>
          ) : (
            <p className="badge badge--ok">{aunty.slotsLeft} {aunty.slotsLeft === 1 ? 'visit' : 'visits'} left this week</p>
          )}
        </div>
      </header>

      <div className="two-col">
        <div>
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="ribbon">About</h2>
            <p className={showFull || aunty.bio.length <= 300 ? 'bio' : 'bio bio--clamped'}>{aunty.bio}</p>
            {aunty.bio.length > 300 && (
              <button
                type="button"
                className="btn btn--secondary"
                aria-expanded={showFull}
                onClick={() => setShowFull((open) => !open)}
              >
                {showFull ? 'Show less' : 'Read full profile'}
              </button>
            )}
            <h3 className="mini-label">Speaks</h3>
            <ul className="chips">
              {aunty.languages.map((l) => <li key={l}>{l}</li>)}
            </ul>
            <h3 className="mini-label">Good with</h3>
            <ul className="chips chips--orange">
              {aunty.specialities.map((sp) => <li key={sp}>{sp}</li>)}
            </ul>
          </section>

          <section aria-labelledby="areas-heading">
            <h2 id="areas-heading" className="ribbon">Areas visited</h2>
            <ul className="chips">
              {aunty.areasServed.map((a) => (
                <li key={a} className={a === aunty.homeArea ? 'chip--home' : ''}>
                  {a}{a === aunty.homeArea && ' (home, no travel charge)'}
                </li>
              ))}
            </ul>
            <p>No travel charge in {aunty.homeArea}. Any other area adds {formatRs(TRAVEL_CHARGE)}.</p>

            <div className="field">
              <label htmlFor="your-area">Your area</label>
              <select id="your-area" value={area} onChange={(e) => updateForm('area', e.target.value)}>
                <option value="">Choose your area</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {areaProblem && (
              <div className="panel notice notice--warn" role="alert">
                <p>{areaCheck.message}</p>
                {otherAunties.length > 0 && (
                  <>
                    <p>These aunties visit {area}:</p>
                    <ul>
                      {otherAunties.map((o) => (
                        <li key={o.id}><Link to={`/aunties/${o.id}`}>{o.name}</Link></li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
          </section>

          <section aria-labelledby="packages-heading">
            <h2 id="packages-heading" className="ribbon">Packages</h2>
            {full && (
              <div className="panel notice notice--warn">
                <p>{slots.message}</p>
                <Link
                  to="/aunties"
                  className="btn btn--secondary"
                  onClick={() => setFilters((prev) => ({ ...prev, onlyAvailable: true }))}
                >
                  See aunties with visits left
                </Link>
              </div>
            )}
            {selectedAunty && !isThis && !full && (
              <p>Choosing a package here will replace your booking with {selectedAunty.name}.</p>
            )}
            <PackagePicker
              aunty={aunty}
              selectedPackageId={isThis ? booking.packageId : null}
              disabled={full}
              onSelect={(packageId) => selectPackage(aunty.id, packageId)}
            />
          </section>

          {isThis && (
            <section aria-labelledby="addons-heading">
              <h2 id="addons-heading" className="ribbon">Extras</h2>
              <AddOnPicker
                addOns={booking.addOns}
                onAdd={addAddOn}
                onRemove={removeAddOn}
                onQtyChange={setAddOnQty}
              />
            </section>
          )}

          <section aria-labelledby="conditions-heading" className="panel">
            <h2 id="conditions-heading">Conditions</h2>
            <ul>
              <li>1 to 6 family members</li>
              <li>Candidate must be 18+</li>
              <li>Book at least 48 hours ahead</li>
              <li>{formatRs(TRAVEL_CHARGE)} travel outside {aunty.homeArea}</li>
              <li>10% off packages for visits from October to January. Rs 1,000 off on Fridays in November.</li>
            </ul>
          </section>
        </div>

        <div className="summary-col">
          <SummaryPanel packageId={isThis ? booking.packageId : null} summary={isThis ? summary : null} area={area}>
            {canContinue && <Link to="/booking" className="btn">Continue to booking form</Link>}
          </SummaryPanel>
        </div>
      </div>

      {isThis && summary && (
        <div className="total-bar">
          <span>Total so far: {formatRs(summary.total)}</span>
          <a href="#summary">See breakdown</a>
        </div>
      )}
    </>
  )
}

export default AuntyDetailsPage
