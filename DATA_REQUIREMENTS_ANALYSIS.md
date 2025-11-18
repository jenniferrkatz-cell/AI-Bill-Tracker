# Data Requirements Analysis

## Current App Requirements

The frontend app expects bills with the following structure (from `Bill` interface):

### Required Fields

1. **id** (string) - Unique identifier for routing
2. **billNumber** (string) - Display format like "CA AB 2013"
3. **title** (string) - Full bill title/name
4. **state** (string) - Full state name (e.g., "California", not "CA")
5. **status** (enum) - One of: 'Introduced' | 'In Committee' | 'Passed House' | 'Passed Senate' | 'Enacted' | 'Failed'
6. **dateIntroduced** (string) - ISO date string
7. **lastUpdated** (string) - ISO date string
8. **summary** (string) - Brief description of the bill
9. **scope** (string) - Who the bill applies to (detailed description)
10. **modelsCovered** (string) - What AI models/systems are covered
11. **keyRequirements** (string[]) - Array of compliance requirements
12. **sponsor** (string) - Bill sponsor name
13. **originalLink** (string) - URL to original bill text

### Where These Fields Are Used

- **Dashboard**: Filters by state/status, displays billNumber, title, summary, state, lastUpdated
- **Bill Detail Page**: Shows all fields including scope, modelsCovered, keyRequirements, sponsor
- **Analytics Page**: Analyzes keyRequirements for common themes, counts by state/status
- **Company Profile**: Uses billNumber, title, state for matching

---

## Data.json Structure

Your `data.json` contains:

```json
{
  "bill": "HCR3",                    // Bill identifier
  "bill_url": "https://...",         // URL to bill
  "status": "Intro  Recessed",       // Status text
  "summary": "...",                   // Summary text
  "last_action_date": "2025-05-16",  // Date string
  "last_action_text": "...",          // Last action description
  "summary_links.detail": "https://...",
  "summary_links.text": "https://...",
  "summary_links.discuss": "https://...",
  "state": "AK"                      // State code (2 letters)
}
```

---

## Coverage Analysis

### ✅ Available in data.json (can be mapped)

| App Field | data.json Field | Mapping Notes |
|-----------|----------------|---------------|
| `id` | - | Can generate from `bill` + `state` |
| `billNumber` | `bill` | Format: "{state} {bill}" (e.g., "AK HCR3") |
| `summary` | `summary` | Direct match (may need cleanup) |
| `lastUpdated` | `last_action_date` | Direct match |
| `originalLink` | `bill_url` | Direct match |
| `state` | `state` | Need to convert state codes to full names |

### ⚠️ Partially Available (needs transformation)

| App Field | data.json Field | Issue |
|-----------|----------------|-------|
| `status` | `status` | Values don't match expected enum. Current: "Intro  Recessed", "Pass", "Veto", "Fail", "Engross 50%", etc. Need mapping logic |
| `title` | `summary` | Summary exists but may not be a proper title. Could use first line of summary or extract from bill text |

### ❌ Missing Fields (Critical for app functionality)

| App Field | Required For | Impact |
|-----------|--------------|--------|
| `dateIntroduced` | Bill detail page, sorting | Can use `last_action_date` as fallback but not ideal |
| `scope` | Bill detail page - "Who Does This Apply To?" section | **High impact** - This section will be empty |
| `modelsCovered` | Bill detail page - "AI Models Covered" section | **High impact** - This section will be empty |
| `keyRequirements` | Bill detail page, Analytics page | **High impact** - Analytics won't work properly, detail page missing key section |
| `sponsor` | Bill detail page | Medium impact - Sponsor field will be empty |

---

## Status Mapping Challenge

The app expects these statuses:
- 'Introduced'
- 'In Committee'
- 'Passed House'
- 'Passed Senate'
- 'Enacted'
- 'Failed'

Your data.json has statuses like:
- "Intro  Recessed"
- "Pass"
- "Veto"
- "Fail"
- "Engross 50%"
- "Engross  Sine Die"
- "Intro  Sine Die"

**Solution**: Need a mapping function to convert your statuses to app statuses.

---

## Recommendations

### Option 1: Minimal Changes (Quick Fix)
- Use `summary` as `title` (first sentence or first 100 chars)
- Use `last_action_date` for both `dateIntroduced` and `lastUpdated`
- Map status values with a function
- Leave `scope`, `modelsCovered`, `keyRequirements`, `sponsor` as empty strings/arrays
- **Result**: App works but detail pages will have empty sections

### Option 2: Enhanced Data (Recommended)
Add these fields to your data.json:

```json
{
  // ... existing fields ...
  "title": "Full bill title",
  "date_introduced": "2025-01-15",
  "sponsor": "Representative John Doe",
  "scope": "Applies to companies with more than 50 employees...",
  "models_covered": "High-risk AI systems including...",
  "key_requirements": [
    "Conduct annual impact assessments",
    "Perform bias testing",
    "Maintain documentation"
  ]
}
```

### Option 3: AI Enhancement (Future)
Use AI to extract:
- `scope` from bill text
- `modelsCovered` from bill text
- `keyRequirements` from bill text
- `sponsor` from bill metadata

---

## Priority Missing Fields

1. **keyRequirements** (HIGH) - Used in analytics and detail page
2. **scope** (HIGH) - Important section in detail page
3. **modelsCovered** (MEDIUM) - Important section in detail page
4. **sponsor** (MEDIUM) - Displayed in detail page
5. **dateIntroduced** (LOW) - Can use last_action_date as fallback
6. **title** (LOW) - Can derive from summary

---

## Next Steps

1. I can create a data transformation layer that:
   - Maps your data.json structure to the app's Bill interface
   - Handles status mapping
   - Converts state codes to full names
   - Generates IDs
   - Provides fallbacks for missing fields

2. You can enhance data.json with the missing fields (especially keyRequirements, scope, modelsCovered)

3. Or we can implement both - transformation layer now, enhanced data later

