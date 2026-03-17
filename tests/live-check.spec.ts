import { test, expect } from '@playwright/test';

test('Check Live Deployment', async ({ page }) => {
  const url = 'https://fridgechef-cjrxns848-serens-projects-5e739c5c.vercel.app';
  console.log('Testing live URL:', url);
  
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(5000);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/live-deployment-check.png', fullPage: true });
  console.log('Screenshot saved');
  
  // Get page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check if it's Vercel auth page
  const isVercelAuth = await page.evaluate(() => {
    return document.body.innerText.includes('Vercel Authentication');
  });
  console.log('Is Vercel Auth page:', isVercelAuth);
  
  // Check for orange theme in HTML
  const htmlContent = await page.content();
  const hasOrange = htmlContent.includes('orange-50') || htmlContent.includes('amber-50');
  console.log('Has orange theme:', hasOrange);
});
