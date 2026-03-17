import os
import sys
import time
from playwright.sync_api import sync_playwright

# ==============================================================================
# AUTO ENGINE TEST (Self-Healing Protocol)
# 
# 1. Persistence Test
# 2. Paywall Test
# 3. Ghost Pay Test
# ==============================================================================

TARGET_URL = os.getenv("TARGET_URL", "http://localhost:3000")

# Selectors
INPUT_SELECTOR = "input[type='text']"
GENERATE_BUTTON_SELECTOR = "[data-testid='generate-button']"
PAYWALL_MODAL_SELECTOR = "#paywall-modal"
UPGRADE_BUTTON_SELECTOR = "button:has-text('Upgrade')" # Generic upgrade button if any
GHOST_PAY_MODAL_SELECTOR = "div:has-text('内测彩蛋触发')" 
GHOST_PAY_BUTTON_IN_MODAL = "#paywall-modal button:has-text('Buy')" # Or inside the paywall

TEST_PROMPT = "Test Message"

def run_auto_engine_test():
    print(f"🚀 Starting Auto Engine Test on: {TARGET_URL}")
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        
        try:
            # ==================================================================
            # 1. Persistence Test
            # ==================================================================
            print("Step 1: Testing Persistence (Sending 3 messages and reloading)...")
            page.goto(TARGET_URL)
            page.wait_for_load_state("networkidle")
            
            # Send 3 messages
            for i in range(1, 4):
                print(f"   Sending message {i}...")
                page.fill(INPUT_SELECTOR, f"Message {i}")
                # Try specific button first, fallback to generic
                try:
                    page.click(GENERATE_BUTTON_SELECTOR, timeout=2000)
                except:
                    page.click("input[type='text'] + button")
                
                # Wait for result to appear in history (assuming result adds to DOM)
                # We wait for the 'Thinking...' to disappear or result to appear.
                # Since we don't have a specific selector for the Nth message, we wait a bit or wait for loading state.
                time.sleep(3.5) # Wait for "2s simulated delay" + UI update

            # Reload
            print("   Reloading page...")
            page.reload()
            page.wait_for_load_state("networkidle")
            
            # Check if messages exist
            content = page.content()
            if "Message 1" in content and "Message 3" in content:
                print("   ✅ Persistence Test Passed: Messages restored from LocalStorage.")
            else:
                print("   ❌ Persistence Test Failed: Messages not found after reload.")
                sys.exit(1)

            # ==================================================================
            # 2. Paywall Test
            # ==================================================================
            print("Step 2: Testing Paywall (Sending until 10 messages)...")
            
            # We already sent 3. Need 7 more to reach 10.
            # Actually, let's just loop until we see the paywall or hit a limit (e.g. 15)
            
            paywall_triggered = False
            for i in range(4, 15):
                if page.is_visible(PAYWALL_MODAL_SELECTOR):
                    paywall_triggered = True
                    print(f"   Paywall appeared at message count attempt {i-1} (or before).")
                    break
                
                print(f"   Sending message {i}...")
                page.fill(INPUT_SELECTOR, f"Message {i}")
                try:
                    page.click(GENERATE_BUTTON_SELECTOR, timeout=2000)
                except:
                    page.click("input[type='text'] + button")
                
                # Wait for potential paywall or result
                time.sleep(0.5) 
                
                if page.is_visible(PAYWALL_MODAL_SELECTOR):
                    paywall_triggered = True
                    print(f"   Paywall triggered after clicking generate for message {i}.")
                    break
                
                # If not paywall, wait for processing
                time.sleep(2) 

            if paywall_triggered:
                print("   ✅ Paywall Test Passed: Modal appeared.")
            else:
                print("   ❌ Paywall Test Failed: Modal did not appear after >10 messages.")
                # Optional: Debug by printing local storage
                ls = page.evaluate("() => localStorage.getItem('usage_count')")
                print(f"   Debug: usage_count in localStorage is {ls}")
                sys.exit(1)

            # ==================================================================
            # 3. Ghost Pay Test (Inside Paywall)
            # ==================================================================
            print("Step 3: Testing Ghost Pay inside Paywall...")
            
            # In the Paywall, there should be a GlobalPaySystem button.
            # We assume it's "Buy with Paddle" or similar, but since strategy is TEST (default), it's GhostPayButton.
            # GhostPayButton usually says "Upgrade for $..." or similar.
            
            # Let's find any button inside the paywall that is NOT the close button (if any).
            # The GlobalPaySystem usually renders a button.
            
            # Click the button inside the paywall
            # We need to be specific. The Paywall component renders GlobalPaySystem.
            # GlobalPaySystem (TEST) renders GhostPayButton.
            # GhostPayButton usually has text like "Upgrade" or the price.
            
            # Let's try to click the button inside #paywall-modal
            paywall_button = page.locator("#paywall-modal button").first
            if paywall_button.is_visible():
                paywall_button.click()
                
                # Check for Ghost Pay Modal (Email collection)
                try:
                    page.wait_for_selector(GHOST_PAY_MODAL_SELECTOR, timeout=5000)
                    print("   ✅ Ghost Pay Test Passed: Email modal appeared.")
                except:
                    print("   ❌ Ghost Pay Test Failed: Email modal not found.")
                    sys.exit(1)
            else:
                print("   ❌ Ghost Pay Test Failed: No button found in Paywall.")
                sys.exit(1)

            print("<promise>COMPLETE</promise>")

        except Exception as e:
            print(f"❌ Error during test: {e}")
            page.screenshot(path="auto_engine_error.png")
            sys.exit(1)
        finally:
            browser.close()

if __name__ == "__main__":
    run_auto_engine_test()
