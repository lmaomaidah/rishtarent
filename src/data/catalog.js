export const AREAS = [
  'F-7', 'F-10', 'G-11', 'G-13', 'I-8', 'E-11',          // Islamabad
  'DHA Phase II', 'Bahria Town',
  'Saddar', 'Satellite Town', 'Chaklala Scheme III', 'Westridge', // Rawalpindi
]

// same three package types for everyone, each aunty sets her own price
export const PACKAGE_TYPES = {
  basic: {
    name: 'Basic Visit', duration: '45 minutes',
    includes: ['One home visit', '2 suitable profiles within a week'],
  },
  chai: {
    name: 'Full Chai Session', duration: 'About 2 hours',
    includes: ['Everything in Basic Visit', 'Long sit-down with the whole family', '5 suitable profiles within a week', 'One follow-up phone call'],
  },
  premium: {
    name: 'Premium with Follow-ups', duration: '2 hours + 3 follow-up visits',
    includes: ['Everything in Full Chai Session', '3 follow-up visits', 'First meeting with the other family arranged', 'Aunty attends the first meeting with you'],
  },
}

export const ADD_ONS = [
  { id: 'biodata',     name: 'Biodata review',                price: 1000, maxQty: 1,
    description: 'Aunty tidies up the biodata: fewer adjectives, and hobbies other than "watching TV".' },
  { id: 'followup',    name: 'Extra follow-up visit',         price: 2500, maxQty: 3,
    description: 'One more home visit after the first. Up to 3.' },
  { id: 'negotiation', name: 'Negotiation session with the other family', price: 5000, maxQty: 1,
    description: 'Aunty sits in when both families talk dates and who is paying for the hall.' },
  { id: 'trolley',     name: 'Chai trolley inspection',       price: 800,  maxQty: 1,
    description: 'Aunty checks your trolley before the other family arrives. Samosas are judged honestly.' },
]

export const VISIT_TIMES = [
  { value: '11:00', label: 'Morning - 11:00 am' },
  { value: '16:00', label: 'Chai time - 4:00 pm' },
  { value: '19:00', label: 'Evening - 7:00 pm' },
]
