import { test, expect } from '@playwright/test';

test('Debug SEO Routing', async ({ page }) => {
  const baseUrl = 'http://localhost:3000';
  
  console.log('\n🔍 Debug routing...\n');
  
  // Test 1: Main page
  console.log('Test 1: Main page /zh');
  await page.goto(`${baseUrl}/zh`, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('Title:', await page.title());
  await page.screenshot({ path: 'test-results/debug-zh.png' });
  
  // Test 2: SEO page
  console.log('\nTest 2: SEO page /zh/seo/鸡蛋做法');
  await page.goto(`${baseUrl}/zh/seo/鸡蛋做法`, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('Title:', await page.title());
  await page.screenshot({ path: 'test-results/debug-seo.png' });
  
  // Test 3: Check if tools page works
  console.log('\nTest 3: Tools page');
  await page.goto(`${baseUrl}/zh/tools/fridgechef-ai`, { waitUntil: 'domcontentloaded', timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log('Title:', await page.title());
  await page.screenshot({ path: 'test-results/debug-tools.png' });
  
  console.log('\n✅ Debug complete!\n');
});