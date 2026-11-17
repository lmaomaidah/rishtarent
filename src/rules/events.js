import { SEASON_MONTHS } from './pricing.js'

// is "now" inside shaadi season (October to January)?
export function isSeasonOn(now) {
  return SEASON_MONTHS.includes(now.getMonth())
}

// the next Friday in November, counting today. Returns null once November is over.
export function nextBlessedFriday(now) {
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate()) // midnight today
  if (day.getMonth() > 10) return null // December: no more Blessed Fridays this year
  if (day.getMonth() < 10) day.setMonth(10, 1) // before November: start from 1 Nov
  while (day.getDay() !== 5) day.setDate(day.getDate() + 1) // 5 = Friday
  return day.getMonth() === 10 ? day : null
}

// whole days from today to the given date (0 means today)
export function daysUntil(date, now) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.round((date - today) / (24 * 60 * 60 * 1000))
}
