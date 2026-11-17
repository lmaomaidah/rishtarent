import { AREAS } from '../data/catalog.js'

function ListControls({ filters, area, onFiltersChange, onAreaChange, resultCount, total }) {
  return (
    <section className="panel list-controls" aria-label="Search and filter">
      <div className="field">
        <label htmlFor="search">Search by name, speciality, language or area</label>
        <input
          id="search"
          type="search"
          value={filters.search}
          onChange={(e) => onFiltersChange((prev) => ({ ...prev, search: e.target.value }))}
        />
      </div>

      <div className="field">
        <label htmlFor="area">Your area</label>
        <select id="area" value={area} onChange={(e) => onAreaChange(e.target.value)}>
          <option value="">All areas</option>
          {AREAS.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="sort">Sort by</label>
        <select
          id="sort"
          value={filters.sort}
          onChange={(e) => onFiltersChange((prev) => ({ ...prev, sort: e.target.value }))}
        >
          <option value="rating">Highest rated</option>
          <option value="price">Lowest price</option>
          <option value="rishtas">Most rishtas arranged</option>
          <option value="slots">Most visits left</option>
        </select>
      </div>

      <div className="field field--check">
        <input
          id="only-available"
          type="checkbox"
          checked={filters.onlyAvailable}
          onChange={(e) => onFiltersChange((prev) => ({ ...prev, onlyAvailable: e.target.checked }))}
        />
        <label htmlFor="only-available">Only show aunties with visits left</label>
      </div>

      <p aria-live="polite">Showing {resultCount} of {total} aunties</p>
    </section>
  )
}

export default ListControls
