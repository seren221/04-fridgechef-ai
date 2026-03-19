import { test, expect } from '@playwright/test';

test('Test simple SEO page', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🔍 Testing simple SEO page...\n');
  
  // Test with a simpler keyword
  await page.goto(`${baseUrl}/zh/seo/懒人菜谱`, { 
    waitUntil: 'domcontentloaded', 
    timeout: 15000 
  });
  
  await page.waitForTimeout(3000);
  
  const title = await page.title();
  console.log('Title:', title);
  
  const content = await page.content();
  console.log('Content length:', content.length);
  
  // Check for compilation errors in content
  if (content.includes('Failed to compile') || content.includes('Error')) {
    console.log('❌ Found compilation error');
  } else {
    console.log('✅ No compilation error visible');
  }
  
  await page.screenshot({ path: 'test-results/simple-seo.png', fullPage: true });
  console.log('\nScreenshot saved to test-results/simple-seo.png');
});