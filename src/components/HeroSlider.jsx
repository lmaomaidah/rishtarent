import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { heroSlides } from '../data/heroSlides.js'
import { aunties } from '../data/aunties.js'

// people who asked their OS for less motion don't get the auto-advance
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(reduceMotion)

  // move to the next slide every 5 seconds unless paused
  useEffect(() => {
    if (paused) return
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer) // stop the old timer when paused or unmounted
  }, [paused])

  const slide = heroSlides[index]
  const aunty = aunties.find((a) => a.id === slide.auntyId)

  return (
    <section className="stage" aria-label="Featured aunties">
      <div className="stage__frame">
        {/* key makes React remount this block, so the slide-in animation plays again */}
        <div className="stage__text" key={'text' + index} aria-live={paused ? 'polite' : 'off'}>
          <p className="stage__question">{slide.question}</p>
          <p className="stage__banner">{slide.banner}</p>
          <Link className="stage__cta" to={`/aunties/${aunty.id}`}>
            {slide.cta} <span aria-hidden="true">▸</span>
          </Link>
        </div>

        <figure className="stage__photo" key={'photo' + index}>
          <img src={aunty.photo} alt={`Photo of ${aunty.name}`} />
          <figcaption>{aunty.name}</figcaption>
        </figure>

        <div className="stage__dots">
          {heroSlides.map((s, i) => (
            <button
              key={s.auntyId}
              type="button"
              className="stage__dot"
              aria-label={`Show slide ${i + 1}`}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              {i + 1}
            </button>
          ))}
          <button type="button" className="stage__pause" onClick={() => setPaused((p) => !p)}>
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSlider
