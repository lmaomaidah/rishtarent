// minus button, number input, plus button. The parent decides min and max.
function QuantityStepper({ id, value, onChange, min, max, label }) {
  function change(next) {
    onChange(Math.min(max, Math.max(min, next)))
  }

  return (
    <div className="stepper">
      <button type="button" className="btn btn--secondary" aria-label="One fewer" onClick={() => change(value - 1)}>
        −
      </button>
      <input
        id={id}
        type="number"
        min={min}
        max={max}
        aria-label={label}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <button type="button" className="btn btn--secondary" aria-label="One more" onClick={() => change(value + 1)}>
        +
      </button>
    </div>
  )
}

export default QuantityStepper
