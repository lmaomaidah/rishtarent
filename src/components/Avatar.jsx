import { useState } from 'react'

// initials in a retro circle, or a real photo if we have one that loads
function Avatar({ name, photo, size = 'small' }) {
  const [failed, setFailed] = useState(false)
  const initials = name.split(' ').slice(0, 2).map((word) => word[0]).join('')
  const tone = name.length % 2 === 0 ? 'teal' : 'orange' // just so the list isn't all one colour
  const sizeClass = size === 'large' ? ' avatar--large' : ''

  if (photo && !failed) {
    return (
      <img
        className={`avatar avatar--photo${sizeClass}`}
        src={photo}
        alt={`Photo of ${name}`}
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <span className={`avatar avatar--${tone}${sizeClass}`} aria-hidden="true">{initials}</span>
  )
}

export default Avatar
