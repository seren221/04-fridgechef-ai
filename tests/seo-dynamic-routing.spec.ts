import { test, expect } from '@playwright/test';

test('SEO Dynamic Routing - Test Long-tail Keywords', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🎯 Testing SEO Dynamic Routing...\n');
  
  // Test keywords - with zh locale prefix
  const testKeywords = [
    { keyword: '冰箱剩余食材做菜', slug: '冰箱剩余食材做菜' },
    { keyword: '鸡蛋做法', slug: '鸡蛋做法' },
    { keyword: '减肥瘦身菜', slug: '减肥瘦身菜' },
    { keyword: '5 分钟快手菜', slug: '5 分钟快手菜' },
  ];
  
  for (const test of testKeywords) {
    console.log(`📝 Testing: ${test.keyword}`);
    
    // Use zh locale prefix for next-intl
    await page.goto(`${baseUrl}/zh/seo/${test.slug}`, { 
      waitUntil: 'domcontentloaded',
      timeout: 15000 
    });
    
    await page.waitForTimeout(2000);
    
    // Check page title
    const title = await page.title();
    console.log(`   Title: ${title}`);
    expect(title).toContain(test.keyword);
    
    // Check H1 heading
    const h1 = await page.locator('h1').first().textContent();
    console.log(`   H1: ${h1}`);
    expect(h1).toContain(test.keyword);
    
    // Check orange theme
    const hasOrange = await page.evaluate(() => {
      const html = document.documentElement.innerHTML;
      return html.includes('orange-50') || html.includes('amber-50');
    });
    console.log(`   Theme: ${hasOrange ? '✅ Orange' : '❌ Missing'}`);
    expect(hasOrange).toBe(true);
    
    // Check FridgeHeroTool component
    const hasTool = await page.evaluate(() => {
      return document.body.innerText.includes('拍照识别') || 
             document.body.innerText.includes('Upload') ||
             document.body.innerText.includes('冰箱');
    });
    console.log(`   Tool: ${hasTool ? '✅ Present' : '❌ Missing'}`);
    expect(hasTool).toBe(true);
    
    console.log(`   ✅ Passed\n`);
  }
  
  console.log('🎉 All SEO pages working correctly!\n');
});