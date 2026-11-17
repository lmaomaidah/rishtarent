// only the helpers the listing needs so far; the rest of the pricing rule comes later
export const TRAVEL_CHARGE = 1500

export function formatRs(amount) {
  return 'Rs ' + amount.toLocaleString('en-US')
}

// 0 if no area or the aunty's home area, else the flat charge
export function getTravelCharge(aunty, area) {
  if (!area || area === aunty.homeArea) return 0
  return TRAVEL_CHARGE
}

// cheapest package plus travel
export function getFromPrice(aunty, area) {
  const cheapest = Math.min(...aunty.packages.map((p) => p.price))
  return cheapest + getTravelCharge(aunty, area)
}
