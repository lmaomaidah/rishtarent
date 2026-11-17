import { useEffect, useState } from 'react'
import { BookingContext } from './BookingContext.js'
import { loadAunties } from '../api/loadAunties.js'
import { defaultFilters } from '../rules/listing.js'

const emptyBooking = {
  auntyId: null,
  packageId: null,
  addOns: [], // [{ id: 'followup', qty: 2 }]
  form: { familyName: '', phone: '', candidateAge: '', partySize: 2, area: '', visitDate: '', visitTime: '' },
}
const emptyDemo = { failLoad: false, emptyData: false, fullyBookedId: '' }

function BookingProvider({ children }) {
  const [aunties, setAunties] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'ready'
  const [reloadCount, setReloadCount] = useState(0)
  const [demo] = useState(emptyDemo)
  const [booking, setBooking] = useState(emptyBooking)
  const [filters, setFilters] = useState(defaultFilters)

  // load (and re-load) the list when the demo flags change or the user hits Retry
  useEffect(() => {
    let cancelled = false // so a slow old request can't overwrite a newer one
    loadAunties(demo)
      .then((list) => {
        if (!cancelled) {
          setAunties(list)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [demo, reloadCount])

  // the click starts the loading, not the effect
  function reload() {
    setStatus('loading')
    setReloadCount((c) => c + 1)
  }

  function updateForm(field, value) {
    setBooking((prev) => ({ ...prev, form: { ...prev.form, [field]: value } }))
  }

  const selectedAunty = aunties.find((a) => a.id === booking.auntyId) || null

  const value = { aunties, status, demo, booking, filters, setFilters, selectedAunty, reload, updateForm }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export default BookingProvider
