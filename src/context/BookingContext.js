import { createContext, useContext } from 'react'

export const BookingContext = createContext(null)

export function useBooking() {
  return useContext(BookingContext)
}
