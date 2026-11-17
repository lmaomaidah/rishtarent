import { useId, useState } from 'react'

// a plain-language label with a button that shows or hides an explanation
function LabelWithHelp({ label, help }) {
  const [open, setOpen] = useState(false)
  const helpId = useId() // unique id so aria-controls points at the right paragraph

  return (
    <span className="label-help">
      <span>{label}</span>{' '}
      <button
        type="button"
        className="label-help__btn"
        aria-expanded={open}
        aria-controls={helpId}
        onClick={() => setOpen((o) => !o)}
      >
        What does this mean?
      </button>
      {open && <span id={helpId} className="label-help__text">{help}</span>}
    </span>
  )
}

export default LabelWithHelp
