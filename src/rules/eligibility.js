export const MIN_AGE = 18

export function checkAge(age) {
  if (!Number.isInteger(age)) {
    return { ok: false, message: "Please enter the candidate's age in years." }
  }
  if (age < MIN_AGE) {
    return {
      ok: false,
      message: `The candidate must be ${MIN_AGE} or older (legal minimum in Islamabad). You entered ${age}.`,
    }
  }
  return { ok: true, message: '' }
}

export function checkServiceArea(aunty, area) {
  if (!area) {
    return { ok: false, message: 'Please choose your area.' }
  }
  if (!aunty.areasServed.includes(area)) {
    return {
      ok: false,
      message: `${aunty.name} does not visit ${area}. She visits: ${aunty.areasServed.join(', ')}.`,
    }
  }
  return { ok: true, message: '' }
}

// aunties who visit this area and still have slots, used for suggestions
export function findAuntiesForArea(aunties, area) {
  return aunties.filter((a) => a.areasServed.includes(area) && a.slotsLeft > 0)
}
