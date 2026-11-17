import { Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext.js'

// shown when a saved selection no longer works (aunty full, package gone, aunty missing)
function SelectionConflict({ message }) {
  const { clearSelection } = useBooking()

  return (
    <section className="panel notice notice--warn" role="alert">
      <h2>Your saved booking needs attention</h2>
      <p>{message}</p>
      <p>
        <Link to="/aunties" className="btn">Choose another aunty</Link>{' '}
        <button type="button" className="btn btn--secondary" onClick={clearSelection}>
          Remove this aunty
        </button>
      </p>
    </section>
  )
}

export default SelectionConflict
