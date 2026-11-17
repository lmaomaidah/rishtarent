// plain-language labels and their explanations, shared by the card and the details page
export function getLabels(aunty) {
  return [
    {
      key: 'verified',
      label: aunty.verified ? 'Visited in person by our team' : 'New here, not yet visited by our team',
      help: aunty.verified
        ? 'Someone from RishtaRent met this aunty at her home and spoke to two families she has worked with.'
        : 'She has registered with us but we have not met her in person yet. Her prices are usually lower.',
    },
    {
      key: 'rishtas',
      label: `${aunty.rishtasCompleted} rishtas arranged`,
      value: aunty.rishtasCompleted, // big number on the details page stat tile
      caption: 'rishtas arranged',
      help: 'The number of engagements this aunty has told us about. We confirm it for visited aunties only.',
    },
    {
      key: 'rating',
      label: `${aunty.rating} out of 5 from families`,
      value: `${aunty.rating}/5`,
      caption: 'rating from families',
      help: 'The average score given by families after a visit. 5 is the best.',
    },
  ]
}
