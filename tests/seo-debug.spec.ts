import { test, expect } from '@playwright/test';

test('Test SEO page with locale', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🎯 Testing SEO page at /zh/seo/鸡蛋做法...\n');
  
  await page.goto(`${baseUrl}/zh/seo/鸡蛋做法`, { 
    waitUntil: 'networkidle', 
    timeout: 30000 
  });
  
  await page.waitForTimeout(3000);
  
  const title = await page.title();
  console.log('Title:', title);
  
  // 获取 body 内容
  const bodyText = await page.locator('body').textContent();
  console.log('Body text (first 200 chars):', bodyText?.substring(0, 200));
  
  // 检查是否有错误信息
  const errorText = await page.locator('text=404').count();
  console.log('404 count:', errorText);
  
  // 检查 URL
  console.log('Current URL:', page.url());
  
  await page.screenshot({ path: 'test-results/seo-debug.png', fullPage: true });
});