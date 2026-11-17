import { PACKAGE_TYPES } from '../data/catalog.js'
import { formatRs } from '../rules/pricing.js'

function PackagePicker({ aunty, selectedPackageId, onSelect, disabled }) {
  return (
    <div className="packages">
      {aunty.packages.map((p) => {
        const type = PACKAGE_TYPES[p.id]
        const selected = p.id === selectedPackageId
        return (
          <div key={p.id} className={`panel package${selected ? ' package--selected' : ''}`}>
            {selected && <p className="ribbon ribbon--teal">Selected</p>}
            <h3>{type.name}</h3>
            <p>{type.duration} · {formatRs(p.price)}</p>
            <ul>
              {type.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {!disabled && (
              <button type="button" className="btn" aria-pressed={selected} onClick={() => onSelect(p.id)}>
                {selected ? 'Chosen' : 'Choose this package'}
              </button>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default PackagePicker
