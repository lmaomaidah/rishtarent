export const MIN_PARTY = 1
export const MAX_PARTY = 6

// family party must be 1 to 6 people
export function checkPartySize(size) {
  if (!Number.isInteger(size)) {
    return { ok: false, message: 'Please enter a whole number of people.' }
  }
  if (size < MIN_PARTY) {
    return { ok: false, message: 'At least 1 family member must be present for the visit.' }
  }
  if (size > MAX_PARTY) {
    return { ok: false, message: `Sorry, an aunty can meet at most ${MAX_PARTY} people in one visit. You entered ${size}.` }
  }
  return { ok: true, message: '' }
}

// an aunty with 0 slots left this week can't be booked
export function checkSlots(aunty) {
  if (aunty.slotsLeft <= 0) {
    return { ok: false, message: `${aunty.name} is fully booked this week.` }
  }
  return { ok: true, message: '' }
}
