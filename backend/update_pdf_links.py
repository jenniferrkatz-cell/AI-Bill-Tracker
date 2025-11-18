#!/usr/bin/env python3
"""
Script to update extracted_bills.json with PDF/text URLs from document_urls.
"""

import json
from pathlib import Path

def main():
    # Load the source data with PDF URLs
    source_file = Path("data with urls.json")
    if not source_file.exists():
        print(f"ERROR: {source_file} not found")
        return
    
    print(f"Loading {source_file}...")
    with open(source_file, 'r', encoding='utf-8') as f:
        source_bills = json.load(f)
    
    # Create a mapping from bill_id to PDF/text URL
    bill_to_pdf = {}
    for bill in source_bills:
        bill_id = f"{bill['state']}-{bill['bill']}"
        document_urls = bill.get('document_urls', [])
        if document_urls:
            # Use the first document URL (usually the PDF/text)
            bill_to_pdf[bill_id] = document_urls[0]
        else:
            # Fallback to summary_links.text if available
            summary_links = bill.get('summary_links', {})
            if isinstance(summary_links, dict) and 'text' in summary_links:
                bill_to_pdf[bill_id] = summary_links['text']
    
    print(f"Found {len(bill_to_pdf)} bills with PDF/text URLs")
    
    # Load the extracted bills
    extracted_file = Path("../extracted_bills.json")
    if not extracted_file.exists():
        print(f"ERROR: {extracted_file} not found")
        return
    
    print(f"Loading {extracted_file}...")
    with open(extracted_file, 'r', encoding='utf-8') as f:
        extracted_bills = json.load(f)
    
    # Update originalLink for each bill
    updated_count = 0
    for bill in extracted_bills:
        bill_id = bill.get('id', '')
        if bill_id in bill_to_pdf:
            old_link = bill.get('originalLink', '')
            new_link = bill_to_pdf[bill_id]
            if old_link != new_link:
                bill['originalLink'] = new_link
                updated_count += 1
                print(f"Updated {bill_id}: {old_link} -> {new_link}")
        else:
            print(f"Warning: No PDF/text URL found for {bill_id}")
    
    # Save updated bills
    print(f"\nUpdating {extracted_file}...")
    with open(extracted_file, 'w', encoding='utf-8') as f:
        json.dump(extracted_bills, f, indent=2, ensure_ascii=False)
    
    print(f"\nDone! Updated {updated_count} bills with PDF/text URLs.")
    print(f"Also update frontend copy: cp {extracted_file} ../frontend/src/data/extracted_bills.json")

if __name__ == "__main__":
    main()

