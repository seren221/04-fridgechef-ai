import { test, expect } from '@playwright/test';

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000';

test('The Ralph Loop: Paywall & Ghost Pay Verification', async ({ page }) => {
  // 1. Go to page
  console.log(`🚀 Starting The Ralph Loop on: ${TARGET_URL}`);
  await page.goto(TARGET_URL);

  // 2. Send 10 messages to trigger paywall
  for (let i = 1; i <= 11; i++) {
    console.log(`   Sending message ${i}...`);
    
    // Fill input
    const input = page.locator('input[type="text"]');
    await input.fill(`Message ${i}`);
    
    // Click generate or send button
    // Try different selectors if one fails (Self-healing concept simulated here)
    const button = page.locator('[data-testid="generate-button"]');
    await button.click();

    if (i <= 10) {
        // Wait for response simulation (loading state)
        // Adjust wait time based on your app's "Thinking..." state
        await page.waitForTimeout(2000); 
    }
  }

  // 3. Verify Paywall Modal
  console.log('   Verifying Paywall Modal...');
  const paywallModal = page.locator('#paywall-modal');
  await expect(paywallModal).toBeVisible({ timeout: 5000 });

  // 4. Verify Ghost Pay (Test Strategy)
  console.log('   Verifying Ghost Pay (Email Collection)...');
  // Assuming the "Upgrade" or "Buy" button is inside the paywall
  const upgradeButton = paywallModal.locator('button:has-text("Upgrade"), button:has-text("Pro Access")');
  await upgradeButton.click();

  // Check for email input in the modal (Ghost Pay Logic)
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toBeVisible();

  console.log('<promise>COMPLETE</promise>');
});
