import { test, expect } from '@playwright/test';

test('Verify Vercel Deployment Without Auth', async ({ page }) => {
  const url = 'https://fridgechef-6rv8haroc-serens-projects-5e739c5c.vercel.app';
  console.log('🎯 Testing Vercel deployment (no auth required):', url);
  
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(5000);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/vercel-no-auth-test.png', fullPage: true });
  console.log('✅ Screenshot saved');
  
  // Get page title
  const title = await page.title();
  console.log('📄 Page title:', title);
  
  // Check if it's Vercel auth page
  const isVercelAuth = await page.evaluate(() => {
    return document.body.innerText.includes('Vercel') && document.body.innerText.includes('Login');
  });
  console.log('🔒 Is Vercel Auth page:', isVercelAuth);
  
  // Check for orange theme
  const htmlContent = await page.content();
  const hasOrange = htmlContent.includes('orange-50') || htmlContent.includes('amber-50');
  console.log('🎨 Has orange theme:', hasOrange);
  
  // Check for FridgeChef content
  const hasFridgeChef = htmlContent.includes('冰箱') || htmlContent.includes('FridgeChef') || htmlContent.includes('拍照识别');
  console.log('🍳 Has FridgeChef content:', hasFridgeChef);
  
  // Check if we can see the main upload area
  const hasUploadArea = await page.evaluate(() => {
    return document.querySelector('input[type="file"]') !== null || 
           document.body.innerText.includes('拍照识别') ||
           document.body.innerText.includes('Upload');
  });
  console.log('📸 Has upload area:', hasUploadArea);
  
  // Summary
  if (isVercelAuth) {
    console.log('❌ FAILED: Still protected by Vercel auth');
    throw new Error('Vercel auth still enabled');
  } else if (hasOrange && hasFridgeChef) {
    console.log('✅ SUCCESS: Deployment working perfectly with correct theme!');
  } else {
    console.log('⚠️ Deployment accessible but content issue');
  }
  
  expect(isVercelAuth).toBe(false);
  expect(hasOrange || hasFridgeChef).toBe(true);
});
