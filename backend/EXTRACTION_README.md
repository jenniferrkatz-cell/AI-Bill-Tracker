# Bill Data Extraction Script

This script extracts full text from PDF and HTML bill documents and uses OpenAI to fill all required fields for the app.

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r extraction_requirements.txt
   ```

2. **Set up OpenAI API key:**
   
   Option 1: Set as environment variable
   ```bash
   export OPENAI_API_KEY="your-api-key-here"
   ```
   
   Option 2: The script will prompt you to enter it when you run it

## Usage

Run the script:
```bash
python extract_bill_data.py
```

The script will:
1. Load `data.json` from the current directory
2. For each bill entry:
   - Download and extract text from PDF/HTML documents in `document_urls`
   - Use OpenAI to extract required fields:
     - `title` - Full official bill title
     - `dateIntroduced` - Introduction date
     - `scope` - Who the bill applies to
     - `modelsCovered` - What AI models/systems are covered
     - `keyRequirements` - Array of compliance requirements
     - `sponsor` - Bill sponsor name
3. Map status values to app-compatible enums
4. Convert state codes to full state names
5. Generate IDs and bill numbers
6. Save progress every 10 bills to `extracted_data/progress_*.json`
7. Save final results to `extracted_data/extracted_bills.json`
8. Optionally update `data.json` (with backup)

## Output Structure

The extracted data will match the `Bill` interface expected by the frontend:

```typescript
{
  id: string;                    // e.g., "AK-HCR3"
  billNumber: string;            // e.g., "AK HCR3"
  title: string;                 // Full bill title
  state: string;                  // Full state name, e.g., "Alaska"
  status: string;                 // One of: 'Introduced' | 'In Committee' | 'Passed House' | 'Passed Senate' | 'Enacted' | 'Failed'
  dateIntroduced: string;        // ISO date string
  lastUpdated: string;           // ISO date string
  summary: string;               // Brief description
  scope: string;                 // Who the bill applies to
  modelsCovered: string;         // What AI models/systems are covered
  keyRequirements: string[];     // Array of compliance requirements
  sponsor: string;               // Bill sponsor name
  originalLink: string;          // URL to original bill
}
```

## Features

- **PDF Extraction**: Uses PyPDF2 to extract text from PDF documents
- **HTML Extraction**: Uses BeautifulSoup to extract text from HTML documents
- **OpenAI Integration**: Uses GPT-4o-mini to intelligently extract structured data
- **Error Handling**: Continues processing even if individual bills fail
- **Progress Tracking**: Saves progress every 10 bills
- **Rate Limiting**: Includes delays to be respectful to APIs
- **Backup**: Creates backup before updating data.json

## Status Mapping

The script automatically maps various status formats to app-compatible values:

- "Intro", "Intro  Recessed", "Intro  Sine Die" → "Introduced"
- "Intro 25%", "Engross 50%", "Engross  Sine Die" → "In Committee" or "Passed House"
- "Pass" → "Enacted"
- "Veto", "Fail" → "Failed"

## Notes

- The script processes bills sequentially to avoid overwhelming APIs
- If a document cannot be downloaded/extracted, it falls back to using the summary
- If OpenAI extraction fails, it uses fallback values
- All errors are logged but don't stop the process
- The original `data.json` is backed up before any updates

## Cost Estimation

Using GPT-4o-mini:
- ~50k characters per bill (truncated if longer)
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens
- Estimated cost: ~$0.01-0.05 per bill (depending on bill length)

For ~50 bills: approximately $0.50-$2.50 total

## Troubleshooting

**"Missing required dependencies" error:**
- Run: `pip install -r extraction_requirements.txt`

**"OpenAI API key is required" error:**
- Set the `OPENAI_API_KEY` environment variable or enter it when prompted

**PDF extraction fails:**
- Some PDFs may be encrypted or have unusual formats
- The script will fall back to using the summary

**Rate limit errors:**
- The script includes delays, but if you hit rate limits, wait and re-run
- Progress is saved, so you can resume from where you left off

