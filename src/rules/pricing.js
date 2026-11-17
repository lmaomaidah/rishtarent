export const TRAVEL_CHARGE = 1500
export const MIN_NOTICE_HOURS = 48
export const SEASON_MONTHS = [9, 10, 11, 0] // Oct, Nov, Dec, Jan (JS months start at 0)
export const SEASON_PERCENT = 10
export const BLESSED_FRIDAY_OFF = 1000

export function formatRs(amount) {
  return 'Rs ' + amount.toLocaleString('en-US')
}

// 0 if no area or the aunty's home area, else the flat charge
export function getTravelCharge(aunty, area) {
  if (!area || area === aunty.homeArea) return 0
  return TRAVEL_CHARGE
}

// cheapest package plus travel
export function getFromPrice(aunty, area) {
  const cheapest = Math.min(...aunty.packages.map((p) => p.price))
  return cheapest + getTravelCharge(aunty, area)
}

// visit must be at least 48 hours after "now". Both are millisecond timestamps.
export function checkNotice(visitMs, nowMs) {
  if (Number.isNaN(visitMs)) {
    return { ok: false, message: 'Please choose a visit date and time.' }
  }
  if (visitMs - nowMs < MIN_NOTICE_HOURS * 60 * 60 * 1000) {
    return { ok: false, message: `Aunties need at least ${MIN_NOTICE_HOURS} hours' notice. Please pick a later date or time.` }
  }
  return { ok: true, message: '' }
}

// discounts depend only on the package price and the visit date ('YYYY-MM-DD')
// no date yet means no discounts
export function getDiscounts(packagePrice, visitDate) {
  if (!visitDate) return []
  const [y, m, d] = visitDate.split('-').map(Number)
  const date = new Date(y, m - 1, d) // local date, so no timezone shift
  if (Number.isNaN(date.getTime())) return []

  const discounts = []
  if (SEASON_MONTHS.includes(date.getMonth())) {
    discounts.push({
      id: 'season',
      label: `Shaadi season discount (${SEASON_PERCENT}% off package)`,
      amount: Math.round((packagePrice * SEASON_PERCENT) / 100),
    })
  }
  if (date.getMonth() === 10 && date.getDay() === 5) {
    discounts.push({ id: 'blessed-friday', label: 'Blessed Friday discount', amount: BLESSED_FRIDAY_OFF })
  }
  return discounts
}

// the add-on catalog is passed in so this file imports nothing
// a package or add-on id we can't find counts as 0
export function calculateSummary(aunty, booking, addOnCatalog) {
  const pkg = aunty.packages.find((p) => p.id === booking.packageId)
  const packagePrice = pkg ? pkg.price : 0

  const addOnLines = []
  booking.addOns.forEach((line) => {
    const addOn = addOnCatalog.find((a) => a.id === line.id)
    if (!addOn) return
    addOnLines.push({ id: line.id, name: addOn.name, qty: line.qty, lineTotal: addOn.price * line.qty })
  })
  const addOnsTotal = addOnLines.reduce((sum, line) => sum + line.lineTotal, 0)

  const travelCharge = getTravelCharge(aunty, booking.form.area)
  const visitDate = booking.form.visitDate
  const discountLines = getDiscounts(packagePrice, visitDate)
  const discountTotal = discountLines.reduce((sum, line) => sum + line.amount, 0)
  const total = Math.max(0, packagePrice + addOnsTotal + travelCharge - discountTotal)
  return { packagePrice, addOnLines, addOnsTotal, travelCharge, visitDate, discountLines, discountTotal, total }
}
