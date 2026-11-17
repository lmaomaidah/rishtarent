import { useEffect, useState } from 'react'
import { BookingContext } from './BookingContext.js'
import { loadAunties } from '../api/loadAunties.js'
import { ADD_ONS } from '../data/catalog.js'
import { defaultFilters } from '../rules/listing.js'
import { calculateSummary } from '../rules/pricing.js'
import { checkSelection } from '../rules/validateBooking.js'

const STORAGE_KEY = 'rishtarent-v1'
const emptyBooking = {
  auntyId: null,
  packageId: null,
  addOns: [], // [{ id: 'followup', qty: 2 }]
  form: { familyName: '', phone: '', candidateAge: '', partySize: 2, area: '', visitDate: '', visitTime: '' },
}
const emptyDemo = { failLoad: false, emptyData: false, fullyBookedId: '' }

// read once at startup; bad JSON or missing keys fall back to the defaults
function readSaved() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY))
    const booking = {
      ...emptyBooking,
      ...data.booking,
      form: { ...emptyBooking.form, ...data.booking?.form },
    }
    if (!Array.isArray(booking.addOns)) booking.addOns = []
    return { booking, confirmation: data.confirmation || null, demo: { ...emptyDemo, ...data.demo } }
  } catch {
    return { booking: emptyBooking, confirmation: null, demo: emptyDemo }
  }
}
const saved = readSaved()

function BookingProvider({ children }) {
  const [aunties, setAunties] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'ready'
  const [reloadCount, setReloadCount] = useState(0)
  const [demo, setDemo] = useState(saved.demo)
  const [booking, setBooking] = useState(saved.booking)
  const [confirmation, setConfirmation] = useState(saved.confirmation)
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

  // save the useful bits so a refresh doesn't lose the booking
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ booking, confirmation, demo }))
    } catch {
      // storage can be full or blocked, the app still works without it
    }
  }, [booking, confirmation, demo])

  // the click starts the loading, not the effect
  function reload() {
    setStatus('loading')
    setReloadCount((c) => c + 1)
  }

  // one booking at a time: a different aunty replaces the old one, add-ons and form stay
  function selectPackage(auntyId, packageId) {
    setBooking((prev) => ({ ...prev, auntyId, packageId }))
  }

  // forget the aunty but keep what the user typed in the form
  function clearSelection() {
    setBooking((prev) => ({ ...prev, auntyId: null, packageId: null, addOns: [] }))
  }

  function addAddOn(id) {
    setBooking((prev) => ({ ...prev, addOns: [...prev.addOns, { id, qty: 1 }] }))
  }

  function removeAddOn(id) {
    setBooking((prev) => ({ ...prev, addOns: prev.addOns.filter((line) => line.id !== id) }))
  }

  function setAddOnQty(id, qty) {
    setBooking((prev) => ({
      ...prev,
      addOns: prev.addOns.map((line) => (line.id === id ? { ...line, qty } : line)),
    }))
  }

  function updateForm(field, value) {
    setBooking((prev) => ({ ...prev, form: { ...prev.form, [field]: value } }))
  }

  // keep only the area so the listing still knows it
  function confirmBooking(details) {
    setConfirmation(details)
    setBooking((prev) => ({ ...emptyBooking, form: { ...emptyBooking.form, area: prev.form.area } }))
  }

  function updateDemo(changes) {
    setStatus('loading')
    setDemo((prev) => ({ ...prev, ...changes }))
  }

  function resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // nothing to remove if storage is blocked
    }
    setBooking(emptyBooking)
    setConfirmation(null)
    setStatus('loading')
    setDemo(emptyDemo)
    setReloadCount((c) => c + 1) // demo may already equal emptyDemo in value, so force a reload
  }

  // derived, no state needed
  const selectedAunty = aunties.find((a) => a.id === booking.auntyId) || null
  const summary = selectedAunty ? calculateSummary(selectedAunty, booking, ADD_ONS) : null
  const selectionCheck = status === 'ready' ? checkSelection(booking, aunties) : { ok: true, message: '' }

  const value = {
    aunties,
    status,
    demo,
    booking,
    confirmation,
    filters,
    setFilters,
    selectedAunty,
    summary,
    selectionCheck,
    reload,
    selectPackage,
    clearSelection,
    addAddOn,
    removeAddOn,
    setAddOnQty,
    updateForm,
    confirmBooking,
    updateDemo,
    resetAll,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export default BookingProvider
