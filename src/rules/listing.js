import { getFromPrice } from './pricing.js'

export const defaultFilters = { search: '', sort: 'rating', onlyAvailable: false }

// search + area + availability filters, then sort. Pure, so it can be tested in node.
export function filterAndSort(aunties, filters, area) {
  const text = filters.search.trim().toLowerCase()
  const visible = aunties
    .filter((a) => {
      // glue all the searchable text together and look for the search words in it
      const searchable = [a.name, a.tagline, a.bio, ...a.specialities, ...a.languages, ...a.areasServed]
      return !text || searchable.join(' ').toLowerCase().includes(text)
    })
    .filter((a) => !area || a.areasServed.includes(area))
    .filter((a) => !filters.onlyAvailable || a.slotsLeft > 0)

  // copy first, sort() changes the array
  return [...visible].sort((a, b) => {
    if (filters.sort === 'price') return getFromPrice(a, area) - getFromPrice(b, area)
    if (filters.sort === 'rishtas') return b.rishtasCompleted - a.rishtasCompleted
    if (filters.sort === 'slots') return b.slotsLeft - a.slotsLeft
    return b.rating - a.rating
  })
}
