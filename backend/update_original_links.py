#!/usr/bin/env python3
"""
Script to update originalLink in extracted_bills.json with PDF document URLs from all_states.json

Usage:
    python update_original_links.py [extracted_bills.json] [all_states.json]
    
If no arguments provided, uses default paths:
    - extracted_bills.json (in current directory)
    - backend/all_states.json (relative to script location)
"""

import json
import sys
import argparse
from pathlib import Path
from typing import Dict, List, Optional


def find_pdf_url(document_urls: List[str]) -> Optional[str]:
    """Find the first PDF URL from document_urls, or return the first URL if no PDF found."""
    if not document_urls:
        return None
    
    # First, try to find a PDF URL
    for url in document_urls:
        if url.lower().endswith('.pdf'):
            return url
    
    # If no PDF found, return the first URL (could be HTML)
    return document_urls[0]


def build_bill_lookup(all_states_data: List[Dict]) -> Dict[str, str]:
    """Build a lookup dictionary mapping bill IDs to document URLs.
    
    Returns:
        Dictionary mapping "{state}-{bill}" to document URL
    """
    lookup = {}
    
    for bill_data in all_states_data:
        state = bill_data.get('state', '').strip()
        bill = bill_data.get('bill', '').strip()
        
        if not state or not bill:
            continue
        
        # Create the ID in the same format as extracted_bills.json: "AK-HCR3"
        bill_id = f"{state}-{bill}"
        
        # Get document URLs
        document_urls = bill_data.get('document_urls', [])
        
        # Find PDF URL or first URL
        url = find_pdf_url(document_urls)
        
        if url:
            lookup[bill_id] = url
    
    return lookup


def update_extracted_bills(extracted_bills: List[Dict], lookup: Dict[str, str]) -> tuple[int, int]:
    """Update originalLink fields in extracted_bills.
    
    Returns:
        Tuple of (updated_count, not_found_count)
    """
    updated_count = 0
    not_found_count = 0
    
    for bill in extracted_bills:
        bill_id = bill.get('id', '')
        
        if bill_id in lookup:
            new_url = lookup[bill_id]
            old_url = bill.get('originalLink', '')
            
            if new_url != old_url:
                bill['originalLink'] = new_url
                updated_count += 1
        else:
            not_found_count += 1
            print(f"  Warning: No document URL found for {bill_id}")
    
    return updated_count, not_found_count


def main():
    """Main function to update originalLink fields."""
    parser = argparse.ArgumentParser(
        description="Update originalLink in extracted_bills.json with PDF URLs from all_states.json"
    )
    parser.add_argument(
        'extracted_bills',
        nargs='?',
        default='extracted_bills.json',
        help='Path to extracted_bills.json file (default: extracted_bills.json)'
    )
    parser.add_argument(
        'all_states',
        nargs='?',
        default=None,
        help='Path to all_states.json file (default: backend/all_states.json relative to script)'
    )
    
    args = parser.parse_args()
    
    print("Updating Original Links Script")
    print("=" * 50)
    
    # Get file paths
    extracted_bills_file = Path(args.extracted_bills)
    
    if args.all_states:
        all_states_file = Path(args.all_states)
    else:
        script_dir = Path(__file__).parent
        all_states_file = script_dir / "all_states.json"
    
    # Check if files exist
    if not all_states_file.exists():
        print(f"ERROR: {all_states_file} not found")
        print(f"Looking for: {all_states_file.absolute()}")
        return
    
    if not extracted_bills_file.exists():
        print(f"ERROR: {extracted_bills_file} not found")
        print(f"Looking for: {extracted_bills_file.absolute()}")
        return
    
    # Load all_states.json
    print(f"Loading {all_states_file}...")
    with open(all_states_file, 'r', encoding='utf-8') as f:
        all_states_data = json.load(f)
    
    print(f"Found {len(all_states_data)} bills in all_states.json")
    
    # Build lookup dictionary
    print("Building bill lookup dictionary...")
    lookup = build_bill_lookup(all_states_data)
    print(f"Created lookup for {len(lookup)} bills with document URLs")
    
    # Load extracted_bills.json
    print(f"\nLoading {extracted_bills_file}...")
    with open(extracted_bills_file, 'r', encoding='utf-8') as f:
        extracted_bills = json.load(f)
    
    print(f"Found {len(extracted_bills)} bills in extracted_bills.json")
    
    # Update originalLink fields
    print("\nUpdating originalLink fields...")
    updated_count, not_found_count = update_extracted_bills(extracted_bills, lookup)
    
    # Save updated file
    print(f"\nSaving updated {extracted_bills_file}...")
    with open(extracted_bills_file, 'w', encoding='utf-8') as f:
        json.dump(extracted_bills, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print(f"\n{'=' * 50}")
    print(f"Update complete!")
    print(f"  Total bills processed: {len(extracted_bills)}")
    print(f"  Links updated: {updated_count}")
    print(f"  Bills not found in all_states.json: {not_found_count}")
    print(f"  Updated file saved to: {extracted_bills_file.absolute()}")


if __name__ == "__main__":
    main()

