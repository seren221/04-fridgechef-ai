import { test, expect } from '@playwright/test';

test('Check Local Theme', async ({ page }) => {
  const url = 'http://localhost:3001';
  console.log('Testing local URL:', url);
  
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(5000);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/local-theme-check.png', fullPage: true });
  console.log('Screenshot saved');
  
  // Get page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check for orange theme in HTML
  const htmlContent = await page.content();
  const hasOrange = htmlContent.includes('orange-50') || htmlContent.includes('amber-50');
  console.log('Has orange theme:', hasOrange);
  
  // Check for dark background
  const hasDarkBg = htmlContent.includes('#1A1A1A') || htmlContent.includes('bg-gray-900');
  console.log('Has dark background:', hasDarkBg);
  
  // Check main section background
  const sectionBg = await page.evaluate(() => {
    const section = document.querySelector('section');
    if (section) {
      const style = window.getComputedStyle(section);
      return {
        background: style.background,
        class: section.className
      };
    }
    return null;
  });
  console.log('Section background:', sectionBg);
  
  expect(hasOrange).toBe(true);
  expect(hasDarkBg).toBe(false);
});
