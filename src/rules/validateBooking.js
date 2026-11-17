import { checkPartySize, checkSlots } from './capacity.js'
import { checkAge, checkServiceArea } from './eligibility.js'
import { checkNotice } from './pricing.js'

// returns one message per broken field; an empty object means all good
export function validateBooking(form, aunty, nowMs) {
  const errors = {}

  if (form.familyName.trim().length < 2) {
    errors.familyName = 'Please enter your family name (at least 2 letters).'
  }

  if (!/^03\d{9}$/.test(form.phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter an 11-digit mobile number starting with 03, e.g. 0300 1234567.'
  }

  const age = checkAge(form.candidateAge)
  if (!age.ok) errors.candidateAge = age.message

  const party = checkPartySize(form.partySize)
  if (!party.ok) errors.partySize = party.message

  const area = checkServiceArea(aunty, form.area)
  if (!area.ok) errors.area = area.message

  // missing date or time gives an invalid Date, and checkNotice reports it
  const visitMs = new Date(`${form.visitDate}T${form.visitTime}`).getTime()
  const notice = checkNotice(visitMs, nowMs)
  if (!notice.ok) errors.visitDate = notice.message

  return errors
}

// is the saved selection still bookable against the data we just loaded?
export function checkSelection(booking, aunties) {
  if (!booking.auntyId) return { ok: true, message: '' }

  const aunty = aunties.find((a) => a.id === booking.auntyId)
  if (!aunty) {
    return { ok: false, message: 'The aunty you chose is no longer listed on RishtaRent.' }
  }

  const slots = checkSlots(aunty)
  if (!slots.ok) {
    return { ok: false, message: `${slots.message} Your saved booking can't go ahead with her.` }
  }

  if (!aunty.packages.some((p) => p.id === booking.packageId)) {
    return { ok: false, message: 'The package you chose is no longer offered by this aunty.' }
  }

  return { ok: true, message: '' }
}
