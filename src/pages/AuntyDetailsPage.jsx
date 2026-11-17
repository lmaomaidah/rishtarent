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
  const canContinue = isThis && !full && !areaProblem && booking.packageId

  return (
    <>
      <header className="details-header">
        <Avatar name={aunty.name} photo={aunty.photo} size="large" />
        <div>
          <h1>{aunty.name}</h1>
          <p>{aunty.tagline}</p>
          <ul className="details-labels">
            {getLabels(aunty).map((item) => (
              <li key={item.key}><LabelWithHelp label={item.label} help={item.help} /></li>
            ))}
          </ul>
          <p>Experience: {aunty.yearsExperience === null ? 'Not provided' : `${aunty.yearsExperience} years`}</p>
          {full ? (
            <p className="badge badge--error">Fully booked this week</p>
          ) : (
            <p className="badge badge--ok">{aunty.slotsLeft} visits left this week</p>
          )}
        </div>
      </header>

      <div className="two-col">
        <div>
          <section aria-labelledby="about-heading">
            <h2 id="about-heading" className="ribbon">About her</h2>
            <p>{aunty.bio}</p>
            <p>Speaks: {aunty.languages.join(', ')}</p>
            <p>Good with: {aunty.specialities.join(', ')}</p>
          </section>

          <section aria-labelledby="areas-heading">
            <h2 id="areas-heading" className="ribbon">Where she visits</h2>
            <ul>
              {aunty.areasServed.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p>No travel charge in {aunty.homeArea}. Anywhere else she visits adds {formatRs(TRAVEL_CHARGE)}.</p>

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
