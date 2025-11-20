#!/usr/bin/env python3
"""
Script to extract bill text from PDFs/HTML and use OpenAI to fill required fields.
"""

import json
import os
import re
import requests
from pathlib import Path
from typing import Dict, List, Optional, Any
from urllib.parse import urlparse
import time

from dotenv import load_dotenv

load_dotenv()

# PDF and HTML extraction libraries
try:
    import PyPDF2
except ImportError:
    PyPDF2 = None

try:
    from bs4 import BeautifulSoup
except ImportError:
    BeautifulSoup = None

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

# State code to full name mapping
STATE_NAMES = {
    "AK": "Alaska", "AL": "Alabama", "AR": "Arkansas", "AZ": "Arizona",
    "CA": "California", "CO": "Colorado", "CT": "Connecticut", "DE": "Delaware",
    "FL": "Florida", "GA": "Georgia", "HI": "Hawaii", "IA": "Iowa",
    "ID": "Idaho", "IL": "Illinois", "IN": "Indiana", "KS": "Kansas",
    "KY": "Kentucky", "LA": "Louisiana", "MA": "Massachusetts", "MD": "Maryland",
    "ME": "Maine", "MI": "Michigan", "MN": "Minnesota", "MO": "Missouri",
    "MS": "Mississippi", "MT": "Montana", "NC": "North Carolina", "ND": "North Dakota",
    "NE": "Nebraska", "NH": "New Hampshire", "NJ": "New Jersey", "NM": "New Mexico",
    "NV": "Nevada", "NY": "New York", "OH": "Ohio", "OK": "Oklahoma",
    "OR": "Oregon", "PA": "Pennsylvania", "RI": "Rhode Island", "SC": "South Carolina",
    "SD": "South Dakota", "TN": "Tennessee", "TX": "Texas", "UT": "Utah",
    "VA": "Virginia", "VT": "Vermont", "WA": "Washington", "WI": "Wisconsin",
    "WV": "West Virginia", "WY": "Wyoming", "DC": "District of Columbia"
}

# Reverse mapping: state name (lowercase) to state code
# Includes common misspellings found in filenames
STATE_NAME_TO_CODE = {
    'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
    'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
    'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID',
    'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS',
    'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
    'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
    'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV',
    'new hampshire': 'NH', 'new jersey': 'NJ', 'new mexico': 'NM', 'new york': 'NY',
    'north carolina': 'NC', 'north dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK',
    'oregon': 'OR', 'pennsylvania': 'PA', 'rhode island': 'RI', 'south carolina': 'SC',
    'south dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
    'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west virginia': 'WV',
    'wisconsin': 'WI', 'wyoming': 'WY', 'district of columbia': 'DC',
    # Handle common misspellings found in filenames
    'illionois': 'IL',  # Illinois misspelling
    'massachusets': 'MA',  # Massachusetts misspelling
    'missisipi': 'MS',  # Mississippi misspelling
}


def normalize_state_code(state_input: str) -> Optional[str]:
    """Normalize state input to standard 2-letter state code.
    
    Handles:
    - Already valid state codes (e.g., "CA", "NY")
    - Full state names (e.g., "California", "New York")
    - Misspelled state names (e.g., "Illionois")
    - Case variations
    
    Returns:
        Standard 2-letter state code in uppercase, or None if not found
    """
    if not state_input:
        return None
    
    state_input = state_input.strip()
    
    # If already a 2-letter code (case-insensitive), validate and return
    if len(state_input) == 2 and state_input.isalpha():
        state_code = state_input.upper()
        if state_code in STATE_NAMES:
            return state_code
    
    # Try to match full state name (case-insensitive)
    state_lower = state_input.lower()
    
    # Direct lookup
    if state_lower in STATE_NAME_TO_CODE:
        return STATE_NAME_TO_CODE[state_lower]
    
    # Try partial match for multi-word states (e.g., "new york", "north carolina")
    for state_name, code in STATE_NAME_TO_CODE.items():
        if state_lower in state_name or state_name in state_lower:
            return code
    
    return None


# Status mapping from data.json statuses to app statuses
STATUS_MAPPING = {
    "Intro": "Introduced",
    "Intro  Recessed": "Introduced",
    "Intro  Sine Die": "Introduced",
    "Intro 25%": "In Committee",
    "Engross 50%": "Passed House",
    "Engross  Sine Die": "Passed House",
    "Engross  Recessed": "Passed House",
    "Engross": "Passed House",
    "Pass": "Enacted",
    "Veto": "Failed",
    "Fail": "Failed",
    "Failed": "Failed",
    "Enacted": "Enacted",
    "Chapter": "Enacted",  # Some states use "Chapter" for enacted bills
}


def check_dependencies():
    """Check if all required dependencies are installed."""
    missing = []
    if PyPDF2 is None:
        missing.append("PyPDF2")
    if BeautifulSoup is None:
        missing.append("beautifulsoup4")
    if OpenAI is None:
        missing.append("openai")
    
    if missing:
        print(f"ERROR: Missing required dependencies: {', '.join(missing)}")
        print(f"Please install them with: pip install {' '.join(missing)} requests")
        return False
    return True


def extract_text_from_pdf(url: str, max_pages: int = 50) -> Optional[str]:
    """Extract text from a PDF URL."""
    try:
        session = requests.Session()
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/pdf,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
        }
        response = session.get(url, timeout=30, headers=headers, allow_redirects=True)
        response.raise_for_status()
        
        from io import BytesIO
        pdf_file = BytesIO(response.content)
        pdf_reader = PyPDF2.PdfReader(pdf_file)
        
        text_parts = []
        total_pages = len(pdf_reader.pages)
        pages_to_read = min(total_pages, max_pages)
        
        for i in range(pages_to_read):
            page = pdf_reader.pages[i]
            text = page.extract_text()
            if text:
                text_parts.append(text)
        
        if pages_to_read < total_pages:
            print(f"  Warning: PDF has {total_pages} pages, only extracted first {pages_to_read}")
        
        return "\n\n".join(text_parts)
    except Exception as e:
        print(f"  Error extracting PDF: {e}")
        return None


def extract_text_from_html(url: str) -> Optional[str]:
    """Extract text from an HTML URL."""
    try:
        # Use a session to maintain cookies and better headers
        session = requests.Session()
        
        # More complete browser headers to avoid 403 errors
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Cache-Control': 'max-age=0',
        }
        
        # Add referer if we can extract domain
        parsed = urlparse(url)
        if parsed.netloc:
            headers['Referer'] = f'{parsed.scheme}://{parsed.netloc}/'
        
        response = session.get(url, timeout=30, headers=headers, allow_redirects=True)
        response.raise_for_status()
        
        # Check if the response is actually a PDF (sometimes HTML URLs serve PDFs)
        content_type = response.headers.get('Content-Type', '').lower()
        if 'pdf' in content_type or response.content[:4] == b'%PDF':
            print(f"  Note: HTML URL actually serves PDF, trying PDF extraction...")
            # Convert to PDF extraction
            from io import BytesIO
            pdf_file = BytesIO(response.content)
            try:
                pdf_reader = PyPDF2.PdfReader(pdf_file)
                text_parts = []
                total_pages = len(pdf_reader.pages)
                pages_to_read = min(total_pages, 50)
                for i in range(pages_to_read):
                    page = pdf_reader.pages[i]
                    text = page.extract_text()
                    if text:
                        text_parts.append(text)
                return "\n\n".join(text_parts)
            except Exception as e:
                print(f"  Error extracting PDF from HTML URL: {e}")
                return None
        
        # Try to detect encoding
        if response.encoding is None or response.encoding == 'ISO-8859-1':
            # Try to detect encoding from content
            try:
                import chardet
                detected = chardet.detect(response.content)
                encoding = detected.get('encoding', 'utf-8')
                if encoding and encoding != 'ISO-8859-1':
                    response.encoding = encoding
                else:
                    response.encoding = 'utf-8'
            except ImportError:
                # chardet not installed, use utf-8
                response.encoding = 'utf-8'
            except:
                # Fallback to utf-8 with error handling
                response.encoding = 'utf-8'
        
        # Decode content with proper encoding
        try:
            html_content = response.content.decode(response.encoding or 'utf-8', errors='replace')
        except:
            # Last resort: try utf-8 with error replacement
            html_content = response.content.decode('utf-8', errors='replace')
        
        soup = BeautifulSoup(html_content, 'html.parser')
        
        # Remove script and style elements
        for script in soup(["script", "style", "nav", "header", "footer"]):
            script.decompose()
        
        # Get text
        text = soup.get_text()
        
        # Clean up whitespace
        lines = (line.strip() for line in text.splitlines())
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        text = ' '.join(chunk for chunk in chunks if chunk)
        
        return text
    except requests.exceptions.HTTPError as e:
        if e.response.status_code == 403:
            print(f"  Error: 403 Forbidden - Website may be blocking requests. Try:")
            print(f"    1. Check if URL requires authentication")
            print(f"    2. Website may require JavaScript rendering (consider using Selenium)")
            print(f"    3. Rate limiting may be in effect")
        print(f"  Error extracting HTML: {e}")
        return None
    except Exception as e:
        print(f"  Error extracting HTML: {e}")
        return None


def extract_text_from_document(url: str) -> Optional[str]:
    """Extract text from a document URL (PDF or HTML)."""
    parsed = urlparse(url)
    path = parsed.path.lower()
    
    if path.endswith('.pdf'):
        return extract_text_from_pdf(url)
    elif path.endswith('.html') or path.endswith('.htm'):
        return extract_text_from_html(url)
    else:
        # Try to determine from content type
        try:
            response = requests.head(url, timeout=10, allow_redirects=True)
            content_type = response.headers.get('Content-Type', '').lower()
            if 'pdf' in content_type:
                return extract_text_from_pdf(url)
            elif 'html' in content_type:
                return extract_text_from_html(url)
        except:
            pass
        
        print(f"  Warning: Unknown document type for {url}, trying as HTML")
        return extract_text_from_html(url)


def map_status(status: str) -> str:
    """Map data.json status to app status enum."""
    # Check exact match first
    if status in STATUS_MAPPING:
        return STATUS_MAPPING[status]
    
    # Check partial matches
    for key, value in STATUS_MAPPING.items():
        if key in status:
            return value
    
    # Default fallback
    if "intro" in status.lower():
        return "Introduced"
    elif "committee" in status.lower() or "engross" in status.lower():
        return "In Committee"
    elif "pass" in status.lower() or "enact" in status.lower():
        return "Enacted"
    elif "fail" in status.lower() or "veto" in status.lower():
        return "Failed"
    else:
        return "Introduced"  # Default


def extract_fields_with_openai(client: OpenAI, bill_text: str, bill_data: Dict) -> Dict[str, Any]:
    """Use OpenAI to extract required fields from bill text."""
    
    fallback_date = bill_data.get('last_action_date', '2025-01-01')
    prompt = f"""You are analyzing a legislative bill document. Extract the following information and return it as a JSON object.

Bill Information:
- Bill Number: {bill_data.get('bill', 'Unknown')}
- State: {bill_data.get('state', 'Unknown')}
- Current Summary: {bill_data.get('summary', 'N/A')}

Bill Text:
{bill_text[:50000]}

Extract and return a JSON object with these exact fields:
{{
  "title": "Full official title of the bill (string)",
  "dateIntroduced": "Date when bill was introduced in YYYY-MM-DD format (string, or use {fallback_date} if not found)",
  "scope": "Description of WHO this bill applies to - the types of entities, organizations, or individuals subject to the bill. Focus on: entity types (government agencies, private companies, social media platforms, healthcare providers, etc.), size thresholds (revenue, employee count, user base), industry sectors, geographic scope, or other qualifying characteristics. Do NOT include information about AI systems or technologies here. (string, 2-4 sentences)",
  "modelsCovered": "Description of WHAT AI systems, models, or technologies are covered by this bill. Focus on: types of AI (large language models, generative AI, automated decision systems, etc.), risk categories (high-risk AI, critical AI systems, etc.), specific use cases (healthcare AI, hiring AI, facial recognition, etc.), technical definitions or classifications of AI systems mentioned in the bill. Do NOT include information about which entities must comply. (string, 2-4 sentences)",
  "keyRequirements": ["Requirement 1", "Requirement 2", "Requirement 3", ...] (array of strings, 3-10 items),
  "sponsor": "Name of the primary sponsor or author of the bill (string, or 'Unknown' if not found)"
}}

CRITICAL DISTINCTION:
- "scope" (Who Does this Apply To): Focus ONLY on the ENTITIES/ORGANIZATIONS/INDIVIDUALS subject to the law (e.g., "government entities", "social media companies with over 1 million users", "private companies with more than $1M in revenue", "healthcare providers", "employers using automated systems").
- "modelsCovered" (AI Models Covered): Focus ONLY on the TYPES OF AI SYSTEMS/MODELS at issue (e.g., "high-risk AI systems defined as those used in critical infrastructure", "large language models", "automated decision-making systems in healthcare", "generative AI systems", "facial recognition technology").

These two fields should NOT repeat the same information. "scope" describes WHO must comply, while "modelsCovered" describes WHAT AI technologies are regulated.

Important:
- Extract actual information from the bill text, don't make up details
- For keyRequirements, list specific compliance requirements, obligations, or mandates mentioned in the bill
- Be specific and accurate
- Keep "scope" and "modelsCovered" distinct - do not overlap information between them
- If information is not available in the text, use reasonable defaults or "Unknown"
- Return ONLY valid JSON, no additional text or markdown formatting"""

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Using mini for cost efficiency, can change to gpt-4o if needed
            messages=[
                {"role": "system", "content": "You are a legal document analyst. Extract structured information from legislative bills and return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            response_format={"type": "json_object"}
        )
        
        result = json.loads(response.choices[0].message.content)
        return result
    except Exception as e:
        print(f"  Error calling OpenAI: {e}")
        return {}


def process_bill_entry(bill_data: Dict, client: OpenAI, output_dir: Path) -> Dict[str, Any]:
    """Process a single bill entry and extract all required fields."""
    # Normalize state code (handle both codes and full names)
    raw_state = bill_data.get('state', '')
    state_code = normalize_state_code(raw_state) or raw_state.upper() if raw_state else 'Unknown'
    
    bill_id = f"{state_code}-{bill_data['bill']}"
    print(f"\nProcessing {bill_id}...")
    
    # Start with existing data
    result = {
        "id": bill_id,
        "billNumber": f"{state_code} {bill_data['bill']}",
        "state": STATE_NAMES.get(state_code, raw_state if raw_state else 'Unknown'),
        "status": map_status(bill_data.get('status', 'Intro')),
        "lastUpdated": bill_data.get('last_action_date', '2025-01-01'),
        "summary": bill_data.get('summary', '').replace('\n\n[Detail]\n[Text]\n[Discuss]', '').strip(),
        "originalLink": bill_data.get('bill_url', ''),
    }
    
    # Try to extract text from documents
    bill_text = ""
    document_urls = bill_data.get('document_urls', [])
    
    # Also try summary_links.text as fallback
    summary_links = bill_data.get('summary_links', {})
    if isinstance(summary_links, dict) and 'text' in summary_links:
        text_url = summary_links['text']
        if text_url and text_url not in document_urls:
            document_urls.append(text_url)
    
    if not document_urls:
        print(f"  No document URLs found, using summary only")
        bill_text = result['summary']
    else:
        # Try each document URL until we get text
        for doc_url in document_urls:
            print(f"  Extracting text from: {doc_url}")
            text = extract_text_from_document(doc_url)
            if text and len(text) > 100:  # Ensure we got meaningful text
                bill_text = text
                print(f"  Successfully extracted {len(text)} characters")
                break
            elif text:
                print(f"  Warning: Extracted only {len(text)} characters, may be insufficient")
            time.sleep(1)  # Be nice to servers
        
        if not bill_text or len(bill_text) < 100:
            print(f"  Warning: Could not extract sufficient text from any document, using summary")
            bill_text = result['summary']
    
    # Use OpenAI to extract fields
    if bill_text and len(bill_text) > 100:  # Only call OpenAI if we have substantial text
        print(f"  Calling OpenAI to extract fields...")
        extracted = extract_fields_with_openai(client, bill_text, bill_data)
        
        # Merge extracted fields
        result.update({
            "title": extracted.get("title", result.get("summary", "Unknown Bill")),
            "dateIntroduced": extracted.get("dateIntroduced", bill_data.get('last_action_date', '2025-01-01')),
            "scope": extracted.get("scope", "Information not available in bill text."),
            "modelsCovered": extracted.get("modelsCovered", "Information not available in bill text."),
            "keyRequirements": extracted.get("keyRequirements", []),
            "sponsor": extracted.get("sponsor", "Unknown"),
        })
    else:
        # Fallback if no text extracted
        print(f"  Warning: Insufficient text, using fallback values")
        result.update({
            "title": result.get("summary", "Unknown Bill"),
            "dateIntroduced": bill_data.get('last_action_date', '2025-01-01'),
            "scope": "Information not available in bill text.",
            "modelsCovered": "Information not available in bill text.",
            "keyRequirements": [],
            "sponsor": "Unknown",
        })
    
    return result


def main():
    """Main function to process all bills."""
    print("Bill Data Extraction Script")
    print("=" * 50)
    
    # Check dependencies
    if not check_dependencies():
        return
    
    # Get OpenAI API key
    api_key = os.getenv('OPENAI_API_KEY')
    if not api_key:
        api_key = input("Enter your OpenAI API key: ").strip()
        if not api_key:
            print("ERROR: OpenAI API key is required")
            return
    
    client = OpenAI(api_key=api_key)
    
    # Load data.json
    data_file = Path("all_states.json")
    if not data_file.exists():
        print(f"ERROR: {data_file} not found")
        return
    
    print(f"Loading {data_file}...")
    with open(data_file, 'r', encoding='utf-8') as f:
        bills = json.load(f)
    
    print(f"Found {len(bills)} bills to process")
    
    # Create output directory for backups
    output_dir = Path("extracted_data")
    output_dir.mkdir(exist_ok=True)
    
    # Process each bill
    processed_bills = []
    failed_bills = []
    
    for i, bill_data in enumerate(bills, 1):
        try:
            print(f"\n[{i}/{len(bills)}] ", end="")
            processed = process_bill_entry(bill_data, client, output_dir)
            processed_bills.append(processed)
            
            # Save progress every 10 bills
            if i % 10 == 0:
                backup_file = output_dir / f"progress_{i}.json"
                with open(backup_file, 'w', encoding='utf-8') as f:
                    json.dump(processed_bills, f, indent=2, ensure_ascii=False)
                print(f"  Progress saved to {backup_file}")
            
            # Rate limiting - be nice to OpenAI API
            time.sleep(1)
            
        except Exception as e:
            print(f"  ERROR processing bill: {e}")
            failed_bills.append((bill_data.get('bill', 'Unknown'), str(e)))
            # Still add a basic entry so we don't lose the bill
            try:
                # Normalize state code
                raw_state = bill_data.get('state', '')
                state_code = normalize_state_code(raw_state) or raw_state.upper() if raw_state else 'Unknown'
                
                basic_entry = {
                    "id": f"{state_code}-{bill_data['bill']}",
                    "billNumber": f"{state_code} {bill_data['bill']}",
                    "title": bill_data.get('summary', 'Unknown Bill').replace('\n\n[Detail]\n[Text]\n[Discuss]', '').strip(),
                    "state": STATE_NAMES.get(state_code, raw_state if raw_state else 'Unknown'),
                    "status": map_status(bill_data.get('status', 'Intro')),
                    "dateIntroduced": bill_data.get('last_action_date', '2025-01-01'),
                    "lastUpdated": bill_data.get('last_action_date', '2025-01-01'),
                    "summary": bill_data.get('summary', '').replace('\n\n[Detail]\n[Text]\n[Discuss]', '').strip(),
                    "scope": "Error extracting data",
                    "modelsCovered": "Error extracting data",
                    "keyRequirements": [],
                    "sponsor": "Unknown",
                    "originalLink": bill_data.get('bill_url', ''),
                }
                processed_bills.append(basic_entry)
            except:
                pass
    
    # Save final results
    output_file = output_dir / "extracted_bills.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(processed_bills, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'=' * 50}")
    print(f"Processing complete!")
    print(f"  Successfully processed: {len(processed_bills)} bills")
    print(f"  Failed: {len(failed_bills)} bills")
    print(f"  Output saved to: {output_file}")
    
    if failed_bills:
        print(f"\nFailed bills:")
        for bill, error in failed_bills:
            print(f"  - {bill}: {error}")
    
    # Ask if user wants to update data.json
    response = input("\nDo you want to update data.json with the extracted data? (y/n): ").strip().lower()
    if response == 'y':
        backup_file = Path("data.json.backup")
        print(f"Creating backup: {backup_file}")
        with open(data_file, 'r', encoding='utf-8') as f:
            with open(backup_file, 'w', encoding='utf-8') as bf:
                bf.write(f.read())
        
        print(f"Updating {data_file}...")
        with open(data_file, 'w', encoding='utf-8') as f:
            json.dump(processed_bills, f, indent=2, ensure_ascii=False)
        print("Done!")
    else:
        print("Original data.json unchanged. Extracted data is in extracted_data/extracted_bills.json")


if __name__ == "__main__":
    main()

