import { useBooking } from '../context/BookingContext.js'
import { defaultFilters, filterAndSort } from '../rules/listing.js'
import AuntyCard from '../components/AuntyCard.jsx'
import ListControls from '../components/ListControls.jsx'
import StatusMessage from '../components/StatusMessage.jsx'

function AuntiesPage() {
  const { aunties, booking, filters, setFilters, updateForm, reload } = useBooking()
  const area = booking.form.area

  // derived in render, no state for the result
  const sorted = filterAndSort(aunties, filters, area)

  function clearFilters() {
    setFilters(defaultFilters)
    updateForm('area', '')
  }

  // say which filters are on, for the no-match message
  const active = []
  if (filters.search.trim()) active.push(`search "${filters.search.trim()}"`)
  if (area) active.push(`area ${area}`)
  if (filters.onlyAvailable) active.push('only aunties with visits left')

  return (
    <>
      <h1>Find an aunty</h1>

      {aunties.length === 0 ? (
        <StatusMessage
          title="No aunties are listed right now"
          text="Please try again in a little while."
        >
          <button type="button" className="btn" onClick={reload}>Reload</button>
        </StatusMessage>
      ) : (
        <>
          <ListControls
            filters={filters}
            area={area}
            onFiltersChange={setFilters}
            onAreaChange={(value) => updateForm('area', value)}
            resultCount={sorted.length}
            total={aunties.length}
          />

          {sorted.length === 0 ? (
            <StatusMessage
              title="No aunty matches your search"
              text={active.length > 0 ? `Filters on: ${active.join(', ')}.` : ''}
            >
              <button type="button" className="btn" onClick={clearFilters}>Clear filters</button>
            </StatusMessage>
          ) : (
            <>
            <h2 className="visually-hidden">Aunties</h2>
            <div className="cards-grid">
              {sorted.map((aunty) => (
                <AuntyCard
                  key={aunty.id}
                  aunty={aunty}
                  area={area}
                  isSelected={aunty.id === booking.auntyId}
                />
              ))}
            </div>
            </>
          )}
        </>
      )}
    </>
  )
}

export default AuntiesPage
