// @ts-check
import { expect, test } from '@playwright/test'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
const LOCALHOST_URL = 'http://localhost:5173'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent).not.toEqual('')
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})

test('app refreshes image when button clicked', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const image = await page.getByRole('img')
  const initialImageSrc = await image.getAttribute('src')

  const button = await page.getByRole('button')
  await button.click()
  await expect(image).not.toHaveAttribute('src', initialImageSrc)
})
