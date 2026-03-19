import { test, expect } from '@playwright/test';

test('Test SEO page with simple slug', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🎯 Testing SEO page at /zh/seo/鸡蛋做法 (encoded: %E9%B8%A1%E8%9B%8B%E5%81%9A%E6%B3%95)...\n');
  
  // 使用 URL 编码
  await page.goto(`${baseUrl}/zh/seo/%E9%B8%A1%E8%9B%8B%E5%81%9A%E6%B3%95`, { 
    waitUntil: 'networkidle', 
    timeout: 30000 
  });
  
  await page.waitForTimeout(3000);
  
  const title = await page.title();
  console.log('Title:', title);
  
  const h1 = await page.locator('h1').textContent();
  console.log('H1:', h1);
  
  if (title.includes('鸡蛋') || (h1 && h1.includes('鸡蛋'))) {
    console.log('✅ SUCCESS! SEO page working!');
  } else {
    console.log('❌ FAILED - Title:', title, 'H1:', h1);
  }
  
  await page.screenshot({ path: 'test-results/seo-encoded.png', fullPage: true });
});