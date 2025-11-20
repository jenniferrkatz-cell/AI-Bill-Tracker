#!/usr/bin/env python3
"""
Quick test to verify HTML extraction improvements.
"""

import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from extract_bill_data import extract_text_from_html, extract_text_from_document

# Test URL that was failing
test_url = "https://legiscan.com/CA/text/AB1064/id/3269436/California-2025-AB1064-Enrolled.html"

print("Testing improved HTML extraction...")
print(f"URL: {test_url}")
print("-" * 60)

try:
    text = extract_text_from_html(test_url)
    
    if text:
        print(f"\n✓ SUCCESS!")
        print(f"Extracted {len(text)} characters")
        print(f"\nFirst 500 characters:")
        print(text[:500])
        print("\n...")
        print(f"\nLast 200 characters:")
        print(text[-200:])
    else:
        print("\n✗ FAILED - No text extracted")
        print("\nPossible reasons:")
        print("1. Website is blocking automated requests (403 Forbidden)")
        print("2. Website requires JavaScript rendering")
        print("3. Website requires authentication/cookies")
        print("\nSolutions:")
        print("- Try accessing the URL in a browser first to get cookies")
        print("- Consider using Selenium for JavaScript-heavy sites")
        print("- Check if PDF version is available instead")
        
except Exception as e:
    print(f"\n✗ ERROR: {e}")
    import traceback
    traceback.print_exc()



