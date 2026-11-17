# RishtaRent

**Student:** Maidah
**Roll number:** 24i-2116
**Section:** CY-5A
**Course:** CS4032 Web Programming, Assignment 02

## Description

RishtaRent is a simulated booking site where families book a rishta aunty (matchmaker) for a home visit in Islamabad and Rawalpindi. The full price, including travel and discounts, is shown before the family books. No real aunty, payment or personal data is involved.

## Setup and commands

```
npm install        # install dependencies
npm run dev        # start the dev server
npm run build      # build to dist/
npm run preview    # serve the built dist/
npm test           # run the rule tests (node --test)
npm run lint       # check the code with oxlint
```

## Links

- GitHub: https://github.com/lmaomaidah/rishtarent
- Live site: https://rishtarent.vercel.app

## Routes and features

| Route | Page | What it does |
|-------|------|--------------|
| `/` | Home | Hero slider, season events, how it works |
| `/aunties` | Aunties list | Search, area filter, sort, availability filter |
| `/aunties/:id` | Aunty details | Profile, packages, add-ons, live total |
| `/booking` | Booking | Package selection and the booking form |
| `/review` | Review | Final total and confirm button |
| `/confirmation` | Confirmation | Reference number |
| `*` | Not found | Any unknown URL |

### Operating rules

1. **Party size.** The visiting family has 1 to 6 people. The limit shows beside the stepper on the booking form ("1 to 6 people") and under Conditions on the details page. 0 or 7 shows a specific message and the form cannot continue. Boundary: 6 is accepted, 7 is blocked.
   Each aunty also has weekly slots. An aunty with 0 slots shows "Fully booked this week" and her packages cannot be chosen.
2. **Eligibility.** The candidate must be 18 or older, the legal minimum in Islamabad. Boundary: 18 is accepted, 17 is blocked. The aunty must serve the chosen area. If she does not, the page shows a message with links to aunties who do.
3. **Pricing and timing.** Travel outside the aunty's home area costs Rs 1,500. A visit must be booked at least 48 hours ahead. Boundary: exactly 48 hours is accepted, 47 hours is blocked. Season discounts give 10% off the package for visits in October to January, and Rs 1,000 off a Friday visit in November ("Blessed Friday").

Every change to the booking updates the receipt. On desktop the receipt stays visible beside the form. On phones a total bar stays at the bottom of the screen.

## Reproducing edge cases

Open "Demo controls (for testing)" at the bottom of any page first.

1. Loading failure and retry: Tick "Make the aunties list fail to load". Aunties, details, Booking and Review show "We couldn't load the aunties list" plus a note that the demo switch is on. "Try again" fails again while ticked. Untick it and the list loads.
2. Empty dataset: Tick "Return an empty aunties list" and open /aunties. It shows "No aunties are listed right now" with a Reload button. Untick to restore.
3. No-match search: open /aunties, type zzz. "No aunty matches your search" with Clear filters, which restores the list.
4. Invalid URL: /aunties/xyz shows "We couldn't find that aunty" with a link to all aunties. /nope shows the not-found page.
5. Aunty becomes fully booked after selection: choose a package on /aunties/nasreen-qureshi, then set "Make an aunty fully booked" to Nasreen Baji and refresh. The nav shows "Fix needed"; /booking and /review show "Your saved booking needs attention" with Choose another aunty / Remove this aunty. Form fields are kept.
6. Corrupt localStorage: DevTools → Application → Local Storage, set rishtarent-v1 to {oops, refresh. The app loads with defaults and no console error.
7. Missing photo: rename a file in public/aunties/. That aunty shows initials in a circle.
8. Long content: /aunties/zubaida-hashmi at 390px wraps the long name and folds the bio behind "Read full profile". /aunties/samina-chachi shows "Experience: Not provided".

"Reset everything" in Demo controls clears saved data and demo switches.

## Simulated operations and limitations

**Simulated:** bookings, reference numbers and availability. No data is sent anywhere. The phone number can be made up.

**Limitations:**
- One booking at a time.
- Slots do not go down after a booking.
- The 48-hour check and the season dates use the device clock.
- The phone number format is checked but not verified.
- 11 of 13 listings (11 aunties, 2 uncles) have photos supplied by the student, used with permission. Kulsoom Aunty and Samina Chachi use CSS initials.

## Concept map

| Concept | File | Component/function |
|---------|------|--------------------|
| Components and props | `src/components/AuntyCard.jsx` | `AuntyCard` (aunty, area, isSelected) |
| Callback props | `src/components/AddOnPicker.jsx`, `src/components/QuantityStepper.jsx` | `AddOnPicker` (onAdd, onRemove, onQtyChange), `QuantityStepper` (onChange) |
| Events and preventDefault | `src/pages/BookingPage.jsx` | `handleSubmit`, `jumpTo` |
| useState | `src/components/HeroSlider.jsx` | `HeroSlider` (index, paused) |
| Functional state updates | `src/components/HeroSlider.jsx`, `src/context/BookingProvider.jsx` | `setIndex((i) => ...)`, `setBooking((prev) => ...)` |
| Immutable object and array updates | `src/context/BookingProvider.jsx` | `updateForm`, `addAddOn`, `removeAddOn`, `setAddOnQty` |
| Lists and keys | `src/pages/AuntiesPage.jsx` | Aunty card list with `key={aunty.id}` |
| Conditional rendering | `src/components/DataGate.jsx`, `src/components/AuntyCard.jsx` | `DataGate`; availability badge in `AuntyCard` |
| Shared state (Context) | `src/context/BookingProvider.jsx`, `src/context/BookingContext.js` | `BookingProvider`, `useBooking` |
| Derived values | `src/rules/pricing.js`, `src/rules/listing.js`, `src/context/BookingProvider.jsx` | `calculateSummary`, `filterAndSort`, `selectedAunty` |
| useEffect with cleanup | `src/context/BookingProvider.jsx`, `src/components/HeroSlider.jsx` | Loader effect (`cancelled` flag); slider effect (`clearInterval`) |
| useEffect without cleanup | `src/components/Layout.jsx` | Scroll-to-top effect (`window.scrollTo`) |
| Async (Promise, then/catch) | `src/api/loadAunties.js`, `src/context/BookingProvider.jsx` | `loadAunties`; `.then` / `.catch` in the loader |
| localStorage | `src/context/BookingProvider.jsx` | `readSaved`; save effect |
| Routing | `src/App.jsx`, `src/pages/AuntyDetailsPage.jsx`, `src/components/Layout.jsx`, `src/pages/BookingPage.jsx` | `Routes` / `Route`; `useParams`; `NavLink`; `useNavigate` |
| Rule tests | `tests/rules.test.js` | `checkPartySize` (run with `npm test`) |

## Credits

- Fonts: Pacifico, Alfa Slab One and Nunito, from Google Fonts under the SIL Open Font License.
- Avatars: CSS initials for most aunties. Photos for 4 aunties were supplied by the student.
