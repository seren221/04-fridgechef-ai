import { test, expect } from '@playwright/test';

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3001';

test('FridgeChef Page Loads', async ({ page }) => {
  console.log(`🚀 Testing FridgeChef on: ${TARGET_URL}`);
  
  // Go directly to the page
  const response = await page.goto(TARGET_URL, { waitUntil: 'domcontentloaded', timeout: 15000 });
  console.log('📡 Response status:', response?.status());
  
  // Wait a bit for React to hydrate
  await page.waitForTimeout(3000);
  
  // Get page content for debugging
  const content = await page.content();
  console.log('📄 Page length:', content.length);
  
  // Check for any visible text
  const body = page.locator('body');
  const bodyText = await body.textContent().catch(() => 'Could not get text');
  console.log('📝 Body text preview:', bodyText?.substring(0, 200));
  
  // Check console errors
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('❌ Console error:', msg.text());
    }
  });
  
  console.log('<promise>COMPLETE</promise>');
});
