import { aunties } from '../data/aunties.js'

// pretend network call, the demo flags come from the Demo controls panel
export function loadAunties({ failLoad = false, emptyData = false, fullyBookedId = '' } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failLoad) {
        reject(new Error('Could not load the aunties list.'))
        return
      }
      if (emptyData) {
        resolve([])
        return
      }
      // demo: the chosen aunty comes back with 0 slots (copied, the original data stays the same)
      resolve(aunties.map((a) => (a.id === fullyBookedId ? { ...a, slotsLeft: 0 } : a)))
    }, 900)
  })
}
