// label + Urdu hint + help text + error message around one control (the children)
function FormField({ id, label, urdu, help, error, children }) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label} <span lang="ur" dir="rtl">{urdu}</span>
      </label>
      {help && <p id={`${id}-help`} className="field-help">{help}</p>}
      {children}
      {error && <p id={`${id}-error`} className="field-error">{error}</p>}
    </div>
  )
}

export default FormField
