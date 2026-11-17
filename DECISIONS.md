# Frontend decisions

## 1. Price shown late (interaction/state)

**Problem:** Fiverr cards show "Estimated price PKR X". The real package price and service fee appear only at checkout, so the family cannot compare the real cost while browsing.

**Decision:** Every aunty card shows an all-in price, "From Rs X all-in for <area>", with travel included and "no service fee". The details page has a live receipt (package, add-ons, travel, season discounts, service fee Rs 0, total). It updates on every change. It sticks to the side on desktop and to a total bar at the bottom on phones.

**Alternative:** Show the base price on the card and reveal travel and fees on the review page.

**Reason:** The audience is parents who find service apps confusing. A price that changes at the last step makes them stop and check everything again. The card and the receipt use the same functions in `src/rules/pricing.js`, so the travel and discount rules are written once.

**Tradeoff:** The family must choose an area before the price is exact. The card text is longer. The receipt needs to read the booking state on every render.

**Code location:**
- `src/rules/pricing.js`: `getFromPrice`, `getTravelCharge`, `getDiscounts`, `calculateSummary`
- `src/components/AuntyCard.jsx`: all-in price line
- `src/components/SummaryPanel.jsx`: receipt

**Evidence:**

Screenshot: (add)

1. Open `/aunties` at 390px width and note the "From Rs X all-in" price on a card.
2. Open `/aunties/nasreen-qureshi`, choose a package and an area outside her home area. Check that the travel line and total change.
3. Scroll down on the phone width and check that the total bar stays at the bottom.

## 2. Cards leave out facts needed to compare (information hierarchy / mobile layout)

**Problem:** Fiverr cards are mostly image. They show a title, a rating and an "estimated price". They do not show availability, the areas served or what is included.

**Decision:** Each aunty card is compact. It has a 56px avatar, an availability badge ("3 visits left this week" or "Fully booked this week"), the areas served, what the cheapest package includes, and the all-in price.

**Alternative:** Keep large photos and put the facts behind a hover or expand control.

**Reason:** The family compares several aunties before choosing. The facts they need to compare are on the card, so they do not have to open each profile. A hover control does not work on touch screens.

**Tradeoff:** The cards are text-heavy and less visual. Aunties without a photo look plainer than aunties with one.

**Code location:**
- `src/components/AuntyCard.jsx`: card layout and availability badge
- `src/components/Avatar.jsx`: 56px avatar and initials fallback
- `src/styles/global.css`: `.card` rules (around line 245)

**Evidence:**

Screenshot: (add)

1. Open `/aunties` at 390px width and check the avatar, the badge and the areas on each card.
2. Set "Make an aunty fully booked" to Nasreen Baji in Demo controls and reload. Check that her card shows "Fully booked this week".
3. Compare the card with the Fiverr gig card at the same width.

## 3. Unexplained labels and badges (information hierarchy)

**Problem:** Fiverr shows "Fiverr's Choice", "Vetted Pro", "Level 2 ◆◆◇" and "Top Rated ◆◆◆" on the results page with no explanation. A first-time family cannot tell what they mean.

**Decision:** Labels use plain words, such as "Visited in person by our team", "142 rishtas arranged" and "4.9 out of 5 from families". Each label has a "What does this mean?" button. The button opens a one-line explanation and sets `aria-expanded`.

**Alternative:** Show the explanation as a tooltip on hover.

**Reason:** Tooltips do not open on touch screens and cannot be reached with a keyboard. The parents this app serves often use phones, and a button works there where a tooltip does not.

**Tradeoff:** Each label adds a button, which makes the card longer. The explanation text must be kept in one place so the card and the details page stay the same.

**Code location:**
- `src/components/LabelWithHelp.jsx`: label and help button
- `src/rules/labelHelp.js`: `getLabels`

**Evidence:**

Screenshot: (add)

1. Open `/aunties` and find the "Visited in person by our team" label on a card.
2. Press "What does this mean?". The explanation opens and the button shows `aria-expanded="true"`.
3. Press the button again to close the explanation.
