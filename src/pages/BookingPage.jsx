import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'
import { AREAS, PACKAGE_TYPES, VISIT_TIMES } from '../data/catalog.js'
import { formatRs, TRAVEL_CHARGE } from '../rules/pricing.js'
import { validateBooking } from '../rules/validateBooking.js'
import AddOnPicker from '../components/AddOnPicker.jsx'
import FormField from '../components/FormField.jsx'
import QuantityStepper from '../components/QuantityStepper.jsx'
import SelectionConflict from '../components/SelectionConflict.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import SummaryPanel from '../components/SummaryPanel.jsx'

const DAY_MS = 24 * 60 * 60 * 1000

function BookingPage() {
  const {
    booking, selectedAunty, summary, selectionCheck,
    clearSelection, addAddOn, removeAddOn, setAddOnQty, updateForm,
  } = useBooking()
  const navigate = useNavigate()
  const [now] = useState(() => Date.now()) // lazy initialiser keeps render pure
  const [showErrors, setShowErrors] = useState(false)

  if (!selectedAunty) {
    return (
      <>
        <h1>Your booking</h1>
        <StatusMessage title="You haven't chosen an aunty yet" text="Pick an aunty and a package first.">
          <Link to="/aunties" className="btn">Find an aunty</Link>
        </StatusMessage>
      </>
    )
  }

  if (!selectionCheck.ok) {
    return (
      <>
        <h1>Your booking</h1>
        <SelectionConflict message={selectionCheck.message} />
      </>
    )
  }

  const form = booking.form
  const errors = validateBooking(form, selectedAunty, now) // derived, no errors state
  const errorKeys = Object.keys(errors)
  // party size error is always live, the rest wait for the first submit
  const shown = (field) => (field === 'partySize' || showErrors ? errors[field] : undefined)
  const minDate = new Date(now + 2 * DAY_MS).toISOString().slice(0, 10)

  // aria attributes for a control, so screen readers read the help and the error
  function aria(field, hasHelp) {
    const ids = []
    if (hasHelp) ids.push(`${field}-help`)
    if (shown(field)) ids.push(`${field}-error`)
    return { 'aria-invalid': shown(field) ? 'true' : 'false', 'aria-describedby': ids.join(' ') || undefined }
  }

  function handleSubmit(event) {
    event.preventDefault()
    setShowErrors(true)
    // check again with the clock right now, not the time the page opened
    const fresh = validateBooking(form, selectedAunty, Date.now())
    if (Object.keys(fresh).length === 0) navigate('/review')
  }

  function jumpTo(event, field) {
    event.preventDefault()
    document.getElementById(field).focus()
  }

  return (
    <>
      <h1>Your booking</h1>

      <div className="two-col">
        <div>
          <section className="panel" aria-labelledby="selection-heading">
            <h2 id="selection-heading">Your selection</h2>
            <p>{selectedAunty.name}: {PACKAGE_TYPES[booking.packageId].name}</p>
            <p>
              <Link to={`/aunties/${selectedAunty.id}`}>Change package</Link>{' '}
              <button type="button" className="btn btn--link" onClick={clearSelection}>Remove</button>
            </p>
            <AddOnPicker
              addOns={booking.addOns}
              onAdd={addAddOn}
              onRemove={removeAddOn}
              onQtyChange={setAddOnQty}
            />
          </section>

          <form className="panel" onSubmit={handleSubmit} noValidate>
            <h2>Visit details</h2>

            {showErrors && errorKeys.length > 0 && (
              <div className="notice notice--error" role="alert">
                <p>Please fix {errorKeys.length} {errorKeys.length === 1 ? 'thing' : 'things'} below</p>
                <ul>
                  {errorKeys.map((field) => (
                    <li key={field}>
                      <a href={`#${field}`} onClick={(e) => jumpTo(e, field)}>{errors[field]}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <FormField id="familyName" label="Family name" urdu="خاندان کا نام" error={shown('familyName')}>
              <input
                id="familyName"
                type="text"
                value={form.familyName}
                onChange={(e) => updateForm('familyName', e.target.value)}
                {...aria('familyName', false)}
              />
            </FormField>

            <FormField
              id="phone"
              label="Phone number"
              urdu="فون نمبر"
              help="A made-up number is fine. This is a simulated booking."
              error={shown('phone')}
            >
              <input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => updateForm('phone', e.target.value)}
                {...aria('phone', true)}
              />
            </FormField>

            <FormField
              id="candidateAge"
              label="Candidate's age"
              urdu="امیدوار کی عمر"
              help="Must be 18 or older."
              error={shown('candidateAge')}
            >
              <input
                id="candidateAge"
                type="number"
                value={form.candidateAge}
                onChange={(e) => updateForm('candidateAge', e.target.value === '' ? '' : Number(e.target.value))}
                {...aria('candidateAge', true)}
              />
            </FormField>

            <FormField
              id="partySize"
              label="How many family members will be there"
              urdu="کتنے لوگ ہوں گے"
              help="1 to 6 people"
              error={shown('partySize')}
            >
              {/* min 0 and max 99 on purpose, so 0 and 7 can be reached and the rule message shows */}
              <QuantityStepper
                id="partySize"
                value={form.partySize}
                min={0}
                max={99}
                label="Number of family members"
                onChange={(value) => updateForm('partySize', value)}
              />
            </FormField>

            <FormField
              id="area"
              label="Your area"
              urdu="آپ کا علاقہ"
              help={`${formatRs(TRAVEL_CHARGE)} travel charge outside ${selectedAunty.homeArea}.`}
              error={shown('area')}
            >
              <select
                id="area"
                value={form.area}
                onChange={(e) => updateForm('area', e.target.value)}
                {...aria('area', true)}
              >
                <option value="">Choose your area</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </FormField>

            <FormField
              id="visitDate"
              label="Visit date"
              urdu="ملاقات کی تاریخ"
              help="At least 48 hours from now."
              error={shown('visitDate')}
            >
              <input
                id="visitDate"
                type="date"
                min={minDate}
                value={form.visitDate}
                onChange={(e) => updateForm('visitDate', e.target.value)}
                {...aria('visitDate', true)}
              />
            </FormField>

            <FormField id="visitTime" label="Visit time" urdu="وقت">
              <select
                id="visitTime"
                value={form.visitTime}
                onChange={(e) => updateForm('visitTime', e.target.value)}
              >
                <option value="">Choose a time</option>
                {VISIT_TIMES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </FormField>

            <button type="submit" className="btn">Review my booking</button>
          </form>
        </div>

        <div className="summary-col">
          <SummaryPanel packageId={booking.packageId} summary={summary} area={form.area} />
        </div>
      </div>

      <div className="total-bar">
        <span>Total so far: {formatRs(summary.total)}</span>
        <a href="#summary">See breakdown</a>
      </div>
    </>
  )
}

export default BookingPage
