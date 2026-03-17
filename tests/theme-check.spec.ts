import { test, expect } from '@playwright/test';

test('Check FridgeChef Theme', async ({ page }) => {
  const url = 'https://fridgechef-5yybsg8ai-serens-projects-5e739c5c.vercel.app/zh';
  console.log('Testing:', url);
  
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(5000);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/fridge-theme-check.png', fullPage: true });
  console.log('Screenshot saved');
  
  // Check background color
  const bodyBg = await page.evaluate(() => {
    const body = document.body;
    const style = window.getComputedStyle(body);
    return {
      background: style.background,
      backgroundColor: style.backgroundColor
    };
  });
  console.log('Body background:', bodyBg);
  
  // Check if orange colors are present
  const hasOrange = await page.evaluate(() => {
    const html = document.documentElement.innerHTML;
    return html.includes('orange-50') || html.includes('amber-50');
  });
  console.log('Has orange theme:', hasOrange);
  
  // Check for dark background
  const hasDarkBg = await page.evaluate(() => {
    const html = document.documentElement.innerHTML;
    return html.includes('#1A1A1A') || html.includes('gray-900');
  });
  console.log('Has dark background:', hasDarkBg);
  
  expect(hasOrange).toBe(true);
  expect(hasDarkBg).toBe(false);
});
