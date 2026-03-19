import { test, expect } from '@playwright/test';

test('Test SEO page with English slug', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🎯 Testing SEO page at /zh/seo/test...\n');
  
  await page.goto(`${baseUrl}/zh/seo/test`, { 
    waitUntil: 'networkidle', 
    timeout: 30000 
  });
  
  await page.waitForTimeout(3000);
  
  const title = await page.title();
  console.log('Title:', title);
  
  const h1 = await page.locator('h1').textContent();
  console.log('H1:', h1);
  
  if (title.includes('鸡蛋') || (h1 && h1.includes('鸡蛋'))) {
    console.log('✅ SEO page working!');
  } else {
    console.log('❌ Still not working');
  }
  
  await page.screenshot({ path: 'test-results/seo-english-slug.png', fullPage: true });
});