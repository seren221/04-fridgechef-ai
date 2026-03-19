import { test, expect } from '@playwright/test';

test('Test tools page', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🎯 Testing tools page at /zh/tools/fridgechef-ai...\n');
  
  await page.goto(`${baseUrl}/zh/tools/fridgechef-ai`, { 
    waitUntil: 'domcontentloaded', 
    timeout: 20000 
  });
  
  await page.waitForTimeout(5000);
  
  const title = await page.title();
  console.log('Title:', title);
  
  await page.screenshot({ path: 'test-results/tools-page.png', fullPage: true });
  console.log('Screenshot saved');
  
  if (title.includes('冰箱') || title.includes('Fridge')) {
    console.log('✅ Tools page working!');
  } else {
    console.log('❌ Tools page not working');
  }
});