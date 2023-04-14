import { useEffect, useState } from 'react'

const CAT_ENDPOINT_IMAGE_URL = 'https://cataas.com/cat/says/$firstWord?size=500&color=red&json=true'

// custom hook
export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if (!fact) return

    const firstThreeWords = fact.split(' ', 3).join(' ')
    const baseUrl = new URL(CAT_ENDPOINT_IMAGE_URL).origin
    fetch(CAT_ENDPOINT_IMAGE_URL.replace('$firstWord', firstThreeWords))
      .then((res) => res.json())
      .then((data) => setImageUrl(`${baseUrl}${data.url}`))
  }, [fact])

  return { imageUrl }
}
