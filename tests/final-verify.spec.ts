import { test, expect } from '@playwright/test';

test('Final Deployment Verification', async ({ page }) => {
  const url = 'https://fridgechef-6rv8haroc-serens-projects-5e739c5c.vercel.app';
  console.log('🎯 Testing final deployment:', url);
  
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(5000);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/final-deployment-verify.png', fullPage: true });
  console.log('Screenshot saved');
  
  // Get page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Check if it's Vercel auth page
  const isVercelAuth = await page.evaluate(() => {
    return document.body.innerText.includes('Vercel') && document.body.innerText.includes('Login');
  });
  console.log('Is Vercel Auth page:', isVercelAuth);
  
  // Check for orange theme
  const htmlContent = await page.content();
  const hasOrange = htmlContent.includes('orange-50') || htmlContent.includes('amber-50');
  console.log('Has orange theme:', hasOrange);
  
  // Check for FridgeChef content
  const hasFridgeChef = htmlContent.includes('冰箱') || htmlContent.includes('FridgeChef') || htmlContent.includes('拍照识别');
  console.log('Has FridgeChef content:', hasFridgeChef);
  
  // Summary
  if (isVercelAuth) {
    console.log('❌ Still protected by Vercel auth');
  } else if (hasOrange && hasFridgeChef) {
    console.log('✅ SUCCESS: Deployment working with correct theme!');
  } else {
    console.log('⚠️ Deployment accessible but content issue');
  }
});
