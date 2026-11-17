import { ADD_ONS } from '../data/catalog.js'
import { formatRs } from '../rules/pricing.js'
import QuantityStepper from './QuantityStepper.jsx'

// addOns is the list of lines in the booking, like [{ id: 'followup', qty: 2 }]
function AddOnPicker({ addOns, onAdd, onRemove, onQtyChange }) {
  return (
    <ul className="addons">
      {ADD_ONS.map((addOn) => {
        const line = addOns.find((l) => l.id === addOn.id)
        return (
          <li key={addOn.id} className="panel addon">
            <h3>{addOn.name} · {formatRs(addOn.price)}</h3>
            <p>{addOn.description}</p>
            {line ? (
              <>
                {addOn.maxQty > 1 && (
                  <QuantityStepper
                    id={`qty-${addOn.id}`}
                    value={line.qty}
                    min={1}
                    max={addOn.maxQty}
                    label={`${addOn.name} quantity`}
                    onChange={(qty) => onQtyChange(addOn.id, qty)}
                  />
                )}
                <button type="button" className="btn btn--secondary" onClick={() => onRemove(addOn.id)}>
                  Remove
                </button>
              </>
            ) : (
              <button type="button" className="btn" onClick={() => onAdd(addOn.id)}>
                Add
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default AddOnPicker
