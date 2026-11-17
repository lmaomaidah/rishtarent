import { PACKAGE_TYPES } from '../data/catalog.js'
import { formatRs } from '../rules/pricing.js'

// summary comes from calculateSummary, children is the page's action button
function SummaryPanel({ packageId, summary, area, children }) {
  if (!packageId || !summary) {
    return (
      <section id="summary" className="panel summary" aria-labelledby="summary-heading">
        <h2 id="summary-heading">Your total so far</h2>
        <p>Choose a package to see your total.</p>
      </section>
    )
  }

  let travelRow = 'Travel: choose your area to see'
  if (area && summary.travelCharge > 0) travelRow = `Travel to ${area}: ${formatRs(summary.travelCharge)}`
  if (area && summary.travelCharge === 0) travelRow = 'Travel: Rs 0 (her home area)'

  return (
    <section id="summary" className="panel summary" aria-labelledby="summary-heading">
      <h2 id="summary-heading">Your total so far</h2>
      <ul className="summary__rows">
        <li>{PACKAGE_TYPES[packageId].name}: {formatRs(summary.packagePrice)}</li>
        {summary.addOnLines.map((line) => (
          <li key={line.id}>{line.name} × {line.qty}: {formatRs(line.lineTotal)}</li>
        ))}
        <li>{travelRow}</li>
        {summary.discountLines.map((line) => (
          <li key={line.id} className="summary__row--discount">{line.label}: −{formatRs(line.amount)}</li>
        ))}
        <li>Service fee: Rs 0</li>
      </ul>
      {!summary.visitDate && <p>Pick a visit date to see season discounts.</p>}
      <p className="summary__total">
        Total: <strong aria-live="polite">{formatRs(summary.total)}</strong>
      </p>
      <p>No service fee. The price you see is the price you pay.</p>
      {children}
    </section>
  )
}

export default SummaryPanel
