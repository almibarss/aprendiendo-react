import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState()

  function updateFact () {
    getRandomFact().then(setFact)
  }
  useEffect(updateFact, [])
  return { fact, updateFact }
}
