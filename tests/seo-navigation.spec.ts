import { test, expect } from '@playwright/test';

test('Test navigation from home page', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🎯 Testing navigation from home page...\n');
  
  // 先访问主页
  await page.goto(`${baseUrl}/zh`, { 
    waitUntil: 'networkidle', 
    timeout: 30000 
  });
  
  await page.waitForTimeout(2000);
  
  console.log('Home page loaded');
  
  // 直接导航到 SEO 页面
  await page.goto(`${baseUrl}/zh/seo/鸡蛋做法`, { 
    waitUntil: 'networkidle', 
    timeout: 30000 
  });
  
  await page.waitForTimeout(5000);
  
  const title = await page.title();
  console.log('Title:', title);
  
  // 截图
  await page.screenshot({ path: 'test-results/seo-from-home.png', fullPage: true });
  console.log('Screenshot saved');
});