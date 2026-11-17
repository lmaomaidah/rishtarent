import { useBooking } from '../context/BookingContext.js'
import StatusMessage from './StatusMessage.jsx'

// shows loading or error instead of the page until the list is ready
function DataGate({ children }) {
  const { status, reload, demo } = useBooking()

  if (status === 'loading') {
    return (
      <p role="status" className="loading">
        <span className="spinner" aria-hidden="true"></span> Loading aunties…
      </p>
    )
  }

  if (status === 'error') {
    return (
      <StatusMessage
        title="We couldn't load the aunties list"
        text="This can be a connection problem. Your booking so far is saved."
      >
        {demo.failLoad && (
          <p>Demo: "Make the aunties list fail to load" is switched on in Demo controls at the bottom of the page.</p>
        )}
        <button type="button" className="btn" onClick={reload}>Try again</button>
      </StatusMessage>
    )
  }

  return children
}

export default DataGate
