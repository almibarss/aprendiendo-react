const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export function getRandomFact () {
  return fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then((res) => res.json())
    .then((data) => data.fact)
}
