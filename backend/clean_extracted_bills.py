#!/usr/bin/env python3
"""
Script to remove entries with title 'Unknown' and list all unique states from extracted_bills.json

Usage:
    python clean_extracted_bills.py [extracted_bills.json]
    
If no argument provided, uses default path:
    - frontend/src/data/extracted_bills.json (relative to project root)
"""

import json
import argparse
from pathlib import Path
from typing import List, Dict, Set


def remove_unknown_entries(bills: List[Dict]) -> tuple[List[Dict], int]:
    """Remove entries with title 'Unknown'.
    
    Returns:
        Tuple of (filtered_bills, removed_count)
    """
    filtered_bills = []
    removed_count = 0
    
    for bill in bills:
        title = bill.get('title', '').strip()
        if title.lower() == 'unknown':
            removed_count += 1
            print(f"  Removing: {bill.get('id', 'Unknown ID')} - {bill.get('billNumber', 'Unknown Bill')}")
        else:
            filtered_bills.append(bill)
    
    return filtered_bills, removed_count


def get_unique_states(bills: List[Dict]) -> Set[str]:
    """Get all unique states from the bills.
    
    Returns:
        Set of unique state names
    """
    states = set()
    for bill in bills:
        state = bill.get('state', '').strip()
        if state:
            states.add(state)
    return states


def main():
    """Main function to clean extracted_bills.json and list unique states."""
    parser = argparse.ArgumentParser(
        description="Remove entries with title 'Unknown' and list unique states"
    )
    parser.add_argument(
        'extracted_bills',
        nargs='?',
        default='../frontend/src/data/extracted_bills.json',
        help='Path to extracted_bills.json file (default: frontend/src/data/extracted_bills.json)'
    )
    
    args = parser.parse_args()
    
    print("Cleaning Extracted Bills Script")
    print("=" * 50)
    
    # Get file path
    extracted_bills_file = Path(args.extracted_bills)
    
    # Check if file exists
    if not extracted_bills_file.exists():
        print(f"ERROR: {extracted_bills_file} not found")
        print(f"Looking for: {extracted_bills_file.absolute()}")
        return
    
    # Load extracted_bills.json
    print(f"Loading {extracted_bills_file}...")
    with open(extracted_bills_file, 'r', encoding='utf-8') as f:
        bills = json.load(f)
    
    original_count = len(bills)
    print(f"Found {original_count} bills")
    
    # Get unique states before removal
    print("\n" + "=" * 50)
    print("UNIQUE STATES (before removal):")
    print("=" * 50)
    unique_states_before = get_unique_states(bills)
    for state in sorted(unique_states_before):
        print(f"  - {state}")
    print(f"\nTotal unique states: {len(unique_states_before)}")
    
    # Remove entries with title 'Unknown'
    print("\n" + "=" * 50)
    print("Removing entries with title 'Unknown'...")
    print("=" * 50)
    filtered_bills, removed_count = remove_unknown_entries(bills)
    
    # Get unique states after removal
    print("\n" + "=" * 50)
    print("UNIQUE STATES (after removal):")
    print("=" * 50)
    unique_states_after = get_unique_states(filtered_bills)
    for state in sorted(unique_states_after):
        print(f"  - {state}")
    print(f"\nTotal unique states: {len(unique_states_after)}")
    
    # Save updated file
    if removed_count > 0:
        print(f"\nSaving updated {extracted_bills_file}...")
        with open(extracted_bills_file, 'w', encoding='utf-8') as f:
            json.dump(filtered_bills, f, indent=2, ensure_ascii=False)
    
    # Print summary
    print(f"\n{'=' * 50}")
    print(f"Cleanup complete!")
    print(f"  Original bills: {original_count}")
    print(f"  Removed (title='Unknown'): {removed_count}")
    print(f"  Remaining bills: {len(filtered_bills)}")
    print(f"  Unique states: {len(unique_states_after)}")
    if removed_count > 0:
        print(f"  Updated file saved to: {extracted_bills_file.absolute()}")
    else:
        print(f"  No changes made - file unchanged")


if __name__ == "__main__":
    main()

