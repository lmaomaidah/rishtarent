function StatusMessage({ title, text, children }) {
  return (
    <section className="panel status-message">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      {children}
    </section>
  )
}

export default StatusMessage
