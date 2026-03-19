import { test, expect } from '@playwright/test';

test('Test SEO page without locale', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🎯 Testing SEO page at /seo/鸡蛋做法...\n');
  
  await page.goto(`${baseUrl}/seo/鸡蛋做法`, { 
    waitUntil: 'domcontentloaded', 
    timeout: 15000 
  });
  
  await page.waitForTimeout(3000);
  
  const title = await page.title();
  console.log('Title:', title);
  
  if (title.includes('鸡蛋')) {
    console.log('✅ SEO page working!');
  } else {
    console.log('❌ Still not working, title:', title);
  }
  
  await page.screenshot({ path: 'test-results/seo-final.png', fullPage: true });
});