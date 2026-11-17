import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'
import { PACKAGE_TYPES, VISIT_TIMES } from '../data/catalog.js'
import { validateBooking } from '../rules/validateBooking.js'
import SelectionConflict from '../components/SelectionConflict.jsx'
import StatusMessage from '../components/StatusMessage.jsx'
import SummaryPanel from '../components/SummaryPanel.jsx'

function ReviewPage() {
  const { booking, selectedAunty, summary, selectionCheck, confirmBooking } = useBooking()
  const navigate = useNavigate()
  const [now] = useState(() => Date.now())
  const [lateMessage, setLateMessage] = useState('')

  if (!selectedAunty) {
    return (
      <>
        <h1>Review your booking</h1>
        <StatusMessage title="You haven't chosen an aunty yet" text="Pick an aunty and a package first.">
          <Link to="/aunties" className="btn">Find an aunty</Link>
        </StatusMessage>
      </>
    )
  }

  if (!selectionCheck.ok) {
    return (
      <>
        <h1>Review your booking</h1>
        <SelectionConflict message={selectionCheck.message} />
      </>
    )
  }

  const form = booking.form
  const errors = validateBooking(form, selectedAunty, now)
  const errorKeys = Object.keys(errors)

  if (errorKeys.length > 0) {
    return (
      <>
        <h1>Review your booking</h1>
        <section className="panel notice notice--error" role="alert">
          <h2>Some details need fixing before you can confirm</h2>
          <ul>
            {errorKeys.map((field) => (
              <li key={field}>{errors[field]}</li>
            ))}
          </ul>
          <Link to="/booking" className="btn">Back to the form</Link>
        </section>
      </>
    )
  }

  const packageName = PACKAGE_TYPES[booking.packageId].name
  const timeLabel = VISIT_TIMES.find((t) => t.value === form.visitTime).label

  function handleConfirm() {
    // check again with the clock right now, the page may have been open a while
    const fresh = validateBooking(form, selectedAunty, Date.now())
    if (Object.keys(fresh).length > 0) {
      setLateMessage(Object.values(fresh).join(' '))
      return
    }
    confirmBooking({
      ref: 'RR-' + String(Date.now()).slice(-6),
      auntyName: selectedAunty.name,
      packageName,
      summary,
      form,
    })
    navigate('/confirmation')
  }

  return (
    <>
      <h1>Review your booking</h1>

      <div className="two-col">
        <section className="panel" aria-labelledby="details-heading">
          <h2 id="details-heading">Your details</h2>
          <dl>
            <dt>Aunty</dt>
            <dd>{selectedAunty.name}: {packageName} <Link to={`/aunties/${selectedAunty.id}`}>Edit</Link></dd>
            <dt>Family name</dt>
            <dd>{form.familyName} <Link to="/booking">Edit</Link></dd>
            <dt>Phone</dt>
            <dd>{form.phone}</dd>
            <dt>Candidate's age</dt>
            <dd>{form.candidateAge}</dd>
            <dt>Family members</dt>
            <dd>{form.partySize}</dd>
            <dt>Area</dt>
            <dd>{form.area}</dd>
            <dt>Visit</dt>
            <dd>{form.visitDate}, {timeLabel}</dd>
          </dl>
        </section>

        <div className="summary-col">
          <SummaryPanel packageId={booking.packageId} summary={summary} area={form.area}>
            <p>Simulated booking. No real aunty will arrive and no money is taken.</p>
            {lateMessage && <p className="notice notice--error" role="alert">{lateMessage}</p>}
            <button type="button" className="btn" onClick={handleConfirm}>Confirm simulated booking</button>
          </SummaryPanel>
        </div>
      </div>
    </>
  )
}

export default ReviewPage
