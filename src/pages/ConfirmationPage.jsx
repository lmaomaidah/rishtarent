import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'
import { VISIT_TIMES } from '../data/catalog.js'
import { formatRs } from '../rules/pricing.js'
import StatusMessage from '../components/StatusMessage.jsx'

function ConfirmationPage() {
  const { confirmation } = useBooking()

  if (!confirmation) {
    return (
      <>
        <h1>Confirmation</h1>
        <StatusMessage title="No booking to show yet">
          <Link to="/aunties" className="btn">Find an aunty</Link>
        </StatusMessage>
      </>
    )
  }

  const { ref, auntyName, packageName, summary, form } = confirmation
  const time = VISIT_TIMES.find((t) => t.value === form.visitTime)

  return (
    <>
      <h1>Confirmation</h1>
      <section className="panel notice notice--ok" aria-labelledby="done-heading">
        <h2 id="done-heading" className="ribbon ribbon--teal">Booking confirmed (simulated)</h2>
        <p>Reference: <strong>{ref}</strong></p>
        <dl>
          <dt>Aunty</dt>
          <dd>{auntyName}</dd>
          <dt>Package</dt>
          <dd>{packageName}</dd>
          <dt>Visit</dt>
          <dd>{form.visitDate}, {time ? time.label : form.visitTime}</dd>
          <dt>Family members</dt>
          <dd>{form.partySize}</dd>
          <dt>Area</dt>
          <dd>{form.area}</dd>
          <dt>Total</dt>
          <dd>{formatRs(summary.total)}</dd>
        </dl>
        <p>Simulated booking. No real aunty will arrive and no money is taken.</p>
        <Link to="/aunties" className="btn">Book another aunty</Link>
      </section>
    </>
  )
}

export default ConfirmationPage
