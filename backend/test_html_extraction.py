#!/usr/bin/env python3
"""
Test script to verify HTML extraction functionality.
"""

import sys
from pathlib import Path

# Add current directory to path to import from extract_bill_data
sys.path.insert(0, str(Path(__file__).parent))

from extract_bill_data import extract_text_from_html, extract_text_from_document

def test_html_extraction():
    """Test HTML extraction with a real HTML URL from the data."""
    
    # Test URLs from the data
    test_urls = [
        "https://legiscan.com/CA/text/AB853/id/3273369/California-2025-AB853-Chaptered.html",
        "https://legiscan.com/CA/text/SB503/id/3267762/California-2025-SB503-Amended.htm",
        "https://legiscan.com/CA/text/SCR82/id/3238708/California-2025-SCR82-Introduced.html",
    ]
    
    print("Testing HTML Extraction")
    print("=" * 60)
    
    for i, url in enumerate(test_urls, 1):
        print(f"\nTest {i}/{len(test_urls)}: {url}")
        print("-" * 60)
        
        try:
            # Test direct HTML extraction
            print("Testing extract_text_from_html()...")
            text = extract_text_from_html(url)
            
            if text:
                print(f"✓ Successfully extracted text")
                print(f"  Length: {len(text)} characters")
                print(f"  First 200 chars: {text[:200]}...")
                
                # Check if text looks reasonable
                if len(text) > 100:
                    print(f"  ✓ Text length is reasonable")
                else:
                    print(f"  ⚠ Warning: Text seems too short")
                
                # Check for common bill-related keywords
                keywords = ['bill', 'act', 'section', 'legislature', 'law']
                found_keywords = [kw for kw in keywords if kw.lower() in text.lower()]
                if found_keywords:
                    print(f"  ✓ Found bill-related keywords: {', '.join(found_keywords)}")
                else:
                    print(f"  ⚠ Warning: No common bill keywords found")
            else:
                print(f"✗ Failed to extract text")
            
            # Test via extract_text_from_document
            print("\nTesting extract_text_from_document()...")
            text2 = extract_text_from_document(url)
            
            if text2:
                print(f"✓ Successfully extracted via extract_text_from_document()")
                print(f"  Length: {len(text2)} characters")
                
                if text == text2:
                    print(f"  ✓ Results match between both methods")
                else:
                    print(f"  ⚠ Results differ (may be due to different processing)")
            else:
                print(f"✗ Failed to extract via extract_text_from_document()")
                
        except Exception as e:
            print(f"✗ Error: {e}")
            import traceback
            traceback.print_exc()
        
        print()
    
    print("=" * 60)
    print("Test complete!")


if __name__ == "__main__":
    test_html_extraction()



