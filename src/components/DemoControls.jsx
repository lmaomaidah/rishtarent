import { useBooking } from '../context/BookingContext.js'
import { aunties } from '../data/aunties.js'

// testing panel: lets the marker switch on the failure cases
function DemoControls() {
  const { demo, updateDemo, resetAll } = useBooking()

  return (
    <details className="demo-controls">
      <summary>Demo controls (for testing)</summary>
      <p>These switches only exist to show how the app handles errors.</p>

      <p>
        <label>
          <input
            type="checkbox"
            checked={demo.failLoad}
            onChange={(e) => updateDemo({ failLoad: e.target.checked })}
          />{' '}
          Make the aunties list fail to load
        </label>
      </p>

      <p>
        <label>
          <input
            type="checkbox"
            checked={demo.emptyData}
            onChange={(e) => updateDemo({ emptyData: e.target.checked })}
          />{' '}
          Return an empty aunties list
        </label>
      </p>

      <p>
        <label htmlFor="demo-full">Make an aunty fully booked</label>
        <select
          id="demo-full"
          value={demo.fullyBookedId}
          onChange={(e) => updateDemo({ fullyBookedId: e.target.value })}
        >
          <option value="">None</option>
          {aunties.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </p>

      <button type="button" className="btn btn--secondary" onClick={resetAll}>Reset everything</button>
    </details>
  )
}

export default DemoControls
