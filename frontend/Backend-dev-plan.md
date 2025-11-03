# Backend Development Plan - LegiTrack AI

## 1️⃣ Executive Summary

### What Will Be Built
A FastAPI backend for LegiTrack AI - an AI legislation tracking and compliance analysis platform that helps companies identify applicable bills and generate compliance checklists.

### Why
The frontend displays legislative bills with filtering, analytics, and company profile matching. The backend will replace mock data with real database operations, enabling persistent storage and dynamic data management.

### Constraints
- **Backend:** FastAPI (Python 3.13, async)
- **Database:** MongoDB Atlas using Motor and Pydantic v2
- **No Docker**
- **Testing:** Manual via frontend UI after each task
- **Git:** Single branch `main` only
- **API Base:** `/api/v1/*`
- **No pagination** (frontend shows all results)

### Sprint Structure
Dynamic sprints (S0 → S4) covering:
- S0: Environment setup and frontend connection
- S1: Basic authentication (signup/login/logout)
- S2: Bills management (CRUD operations)
- S3: Analytics aggregation
- S4: Company profile analysis

---

## 2️⃣ In-Scope & Success Criteria

### In-Scope Features
- User authentication (signup, login, logout)
- Bills CRUD operations (create, read, update, delete)
- Bills filtering (by state, status, search query)
- Analytics aggregation (state counts, status distribution, requirement analysis)
- Company profile matching (identify applicable bills based on company criteria)
- Health check endpoint

### Success Criteria
- All frontend features functional end-to-end
- All task-level manual tests pass via UI
- Each sprint's code pushed to `main` after verification
- Frontend connects to live backend (no mock data)
- MongoDB Atlas stores all data persistently

---

## 3️⃣ API Design

### Base Path
`/api/v1`

### Error Envelope
```json
{ "error": "message" }
```

### Endpoints

#### Health Check
- **GET /healthz**
- Purpose: Verify backend and database connectivity
- Response: `{ "status": "ok", "database": "connected" }`

#### Authentication
- **POST /api/v1/auth/signup**
- Purpose: Register new user
- Request: `{ "email": "user@example.com", "password": "secure123", "name": "John Doe" }`
- Response: `{ "id": "...", "email": "...", "name": "...", "created_at": "..." }`

- **POST /api/v1/auth/login**
- Purpose: Authenticate user and issue JWT
- Request: `{ "email": "user@example.com", "password": "secure123" }`
- Response: `{ "access_token": "jwt...", "token_type": "bearer", "user": {...} }`

- **POST /api/v1/auth/logout**
- Purpose: Invalidate token (client-side token removal)
- Response: `{ "message": "Logged out successfully" }`

- **GET /api/v1/auth/me**
- Purpose: Get current user info
- Headers: `Authorization: Bearer <token>`
- Response: `{ "id": "...", "email": "...", "name": "..." }`

#### Bills
- **GET /api/v1/bills**
- Purpose: List all bills with optional filtering
- Query params: `state`, `status`, `search` (all optional)
- Response: `{ "bills": [...], "total": 42 }`

- **GET /api/v1/bills/{id}**
- Purpose: Get single bill details
- Response: Bill object

- **POST /api/v1/bills**
- Purpose: Create new bill (admin only)
- Request: Full bill object
- Response: Created bill with ID

- **PUT /api/v1/bills/{id}**
- Purpose: Update existing bill (admin only)
- Request: Partial or full bill object
- Response: Updated bill

- **DELETE /api/v1/bills/{id}**
- Purpose: Delete bill (admin only)
- Response: `{ "message": "Bill deleted" }`

#### Analytics
- **GET /api/v1/analytics/overview**
- Purpose: Get aggregated statistics
- Response: `{ "total_bills": 42, "active_bills": 15, "enacted_bills": 3, "states_count": 8 }`

- **GET /api/v1/analytics/states**
- Purpose: Get bill counts by state
- Response: `{ "states": [{"state": "California", "count": 5}, ...] }`

- **GET /api/v1/analytics/status**
- Purpose: Get bill counts by status
- Response: `{ "statuses": [{"status": "In Committee", "count": 10}, ...] }`

- **GET /api/v1/analytics/requirements**
- Purpose: Get common requirement themes
- Response: `{ "requirements": [{"theme": "Bias Testing", "count": 25}, ...] }`

#### Company Profile
- **POST /api/v1/company/analyze**
- Purpose: Analyze company profile and return applicable bills
- Request: `{ "name": "...", "revenue": "...", "employee_count": "...", "states": [...], "industries": [...], "ai_use_cases": [...] }`
- Response: `{ "applicable_bills": [{"bill": {...}, "reasons": [...], "confidence": "High"}, ...], "total": 15 }`

### Validation Notes
- Email format validation on signup/login
- Password minimum 8 characters
- JWT expiry: 7 days
- All bill fields required except `id` (auto-generated)
- Company profile requires at least one state and one AI use case

---

## 4️⃣ Data Model (MongoDB Atlas)

### Collection: users
```json
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "password_hash": "argon2...",
  "name": "John Doe",
  "role": "user",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```
- Fields: email (string, unique, required), password_hash (string, required), name (string, required), role (string, default="user"), created_at (datetime), updated_at (datetime)
- Embedded: None
- Referenced: None

### Collection: bills
```json
{
  "_id": "ObjectId",
  "bill_number": "CA AB 2013",
  "title": "Artificial Intelligence: Automated Decision Systems",
  "state": "California",
  "status": "In Committee",
  "date_introduced": "2024-02-15",
  "last_updated": "2024-03-20",
  "summary": "This bill establishes...",
  "scope": "Applies to developers...",
  "models_covered": "High-risk automated...",
  "key_requirements": ["Conduct annual...", "Perform bias testing..."],
  "sponsor": "Assembly Member Rebecca Bauer-Kahan",
  "original_link": "https://...",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```
- Fields: bill_number (string, unique, required), title (string, required), state (string, required), status (enum: Introduced|In Committee|Passed House|Passed Senate|Enacted|Failed, required), date_introduced (date, required), last_updated (date, required), summary (string, required), scope (string, required), models_covered (string, required), key_requirements (array of strings, required), sponsor (string, required), original_link (string, required), created_at (datetime), updated_at (datetime)
- Embedded: key_requirements array
- Referenced: None

---

## 5️⃣ Frontend Audit & Feature Map

### Dashboard (`/`)
- **Route:** `/`
- **Component:** [`dashboard.tsx`](src/pages/dashboard.tsx:1)
- **Purpose:** Display bills with filtering and stats
- **Data Needed:** All bills, filtered bills, aggregate stats
- **Backend Endpoints:** `GET /api/v1/bills`, `GET /api/v1/analytics/overview`
- **Auth:** None (public view)

### Bill Detail (`/bill/:id`)
- **Route:** `/bill/:id`
- **Component:** [`bill-detail.tsx`](src/pages/bill-detail.tsx:1)
- **Purpose:** Show full bill details
- **Data Needed:** Single bill by ID
- **Backend Endpoints:** `GET /api/v1/bills/{id}`
- **Auth:** None (public view)

### Analytics (`/analytics`)
- **Route:** `/analytics`
- **Component:** [`analytics.tsx`](src/pages/analytics.tsx:1)
- **Purpose:** Display aggregated analytics and trends
- **Data Needed:** State counts, status distribution, requirement themes
- **Backend Endpoints:** `GET /api/v1/analytics/states`, `GET /api/v1/analytics/status`, `GET /api/v1/analytics/requirements`
- **Auth:** None (public view)

### Company Profile (`/company-profile`)
- **Route:** `/company-profile`
- **Component:** [`company-profile.tsx`](src/pages/company-profile.tsx:1)
- **Purpose:** Analyze company profile and identify applicable bills
- **Data Needed:** Applicable bills based on company criteria
- **Backend Endpoints:** `POST /api/v1/company/analyze`
- **Auth:** None (public analysis)

---

## 6️⃣ Configuration & ENV Vars

### Core Environment Variables
- `APP_ENV` — environment (development, production)
- `PORT` — HTTP port (default: 8000)
- `MONGODB_URI` — MongoDB Atlas connection string
- `JWT_SECRET` — token signing key (min 32 chars)
- `JWT_EXPIRES_IN` — seconds before JWT expiry (default: 604800 = 7 days)
- `CORS_ORIGINS` — allowed frontend URL(s) (comma-separated)

---

## 7️⃣ Background Work

Not required for MVP. All operations are synchronous.

---

## 8️⃣ Integrations

No external integrations required for MVP.

---

## 9️⃣ Testing Strategy (Manual via Frontend)

### Validation Approach
- Every task includes Manual Test Step and User Test Prompt
- Test via frontend UI after each task completion
- Verify expected behavior matches actual result
- Fix any issues before proceeding to next task

### Sprint Completion
- After all tasks in sprint pass manual tests
- Commit changes with descriptive message
- Push to `main` branch
- Proceed to next sprint

---

## 🔟 Dynamic Sprint Plan & Backlog

---

## 🧱 S0 – Environment Setup & Frontend Connection

### Objectives
- Create FastAPI skeleton with `/api/v1` and `/healthz`
- Connect to MongoDB Atlas using `MONGODB_URI`
- `/healthz` performs DB ping and returns JSON status
- Enable CORS for frontend
- Initialize Git at root, set default branch to `main`, push to GitHub
- Create single `.gitignore` at root

### User Stories
- As a developer, I need a working FastAPI server so I can build endpoints
- As a developer, I need MongoDB Atlas connection so I can store data
- As a developer, I need CORS enabled so frontend can call backend
- As a developer, I need Git initialized so I can track changes

### Tasks

#### Task 1: Create FastAPI project structure
- Create `backend/` directory at project root
- Create `backend/main.py` with FastAPI app
- Create `backend/requirements.txt` with dependencies: `fastapi`, `uvicorn[standard]`, `motor`, `pydantic`, `pydantic-settings`, `python-jose[cryptography]`, `passlib[argon2]`, `python-multipart`
- Create `backend/.env.example` with all required env vars
- Create `backend/config.py` for settings management using Pydantic Settings

**Manual Test Step:** Run `pip install -r requirements.txt` and `uvicorn main:app --reload` → server starts on port 8000

**User Test Prompt:** "Install dependencies and start the server. Confirm it runs without errors."

#### Task 2: Implement health check endpoint
- Add `GET /healthz` endpoint in `backend/main.py`
- Connect to MongoDB Atlas using Motor
- Ping database and return `{ "status": "ok", "database": "connected" }` or error

**Manual Test Step:** Visit `http://localhost:8000/healthz` → returns JSON with status and database connection

**User Test Prompt:** "Open http://localhost:8000/healthz in browser. Confirm you see status 'ok' and database 'connected'."

#### Task 3: Enable CORS for frontend
- Add CORS middleware to FastAPI app
- Allow origins from `CORS_ORIGINS` env var
- Allow credentials, all methods, all headers

**Manual Test Step:** Frontend can call `/healthz` without CORS errors

**User Test Prompt:** "Open frontend dev tools Network tab, refresh page. Confirm no CORS errors when calling backend."

#### Task 4: Initialize Git and push to GitHub
- Create `.gitignore` at project root (ignore `__pycache__`, `.env`, `*.pyc`, `venv/`, `.venv/`, `node_modules/`)
- Run `git init` at project root
- Set default branch to `main`: `git branch -M main`
- Create initial commit
- Create GitHub repo and push

**Manual Test Step:** Check GitHub repo → code is visible on `main` branch

**User Test Prompt:** "Visit your GitHub repository. Confirm the code is pushed to the main branch."

### Definition of Done
- Backend runs locally and connects to MongoDB Atlas
- `/healthz` returns success with DB status
- Frontend can call backend without CORS errors
- Repo live on GitHub `main` branch
- `.gitignore` prevents sensitive files from being committed

---

## 🧩 S1 – Basic Auth (Signup / Login / Logout)

### Objectives
- Implement JWT-based signup, login, and logout
- Store users in MongoDB with hashed passwords (Argon2)
- Protect one backend route + one frontend page (optional for MVP)

### User Stories
- As a user, I can sign up with email and password
- As a user, I can log in and receive a JWT token
- As a user, I can log out and invalidate my session

### Endpoints
- `POST /api/v1/auth/signup`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me` (optional)

### Tasks

#### Task 1: Create User model and database operations
- Create `backend/models/user.py` with Pydantic User model
- Create `backend/db/users.py` with async functions: `create_user()`, `get_user_by_email()`, `get_user_by_id()`
- Hash passwords using Argon2 via `passlib`

**Manual Test Step:** Create test user via Python shell → user stored in MongoDB with hashed password

**User Test Prompt:** "Use MongoDB Atlas web interface. Confirm a test user exists with hashed password."

#### Task 2: Implement signup endpoint
- Create `backend/routers/auth.py` with `POST /api/v1/auth/signup`
- Validate email format and password length (min 8 chars)
- Check if email already exists
- Create user and return user object (without password)

**Manual Test Step:** Use Postman/curl to POST signup → returns user object with ID

**User Test Prompt:** "Use Postman to sign up with email and password. Confirm you receive a user object with ID."

#### Task 3: Implement login endpoint with JWT
- Add `POST /api/v1/auth/login` to `backend/routers/auth.py`
- Verify email and password
- Generate JWT token with user ID and expiry
- Return `{ "access_token": "...", "token_type": "bearer", "user": {...} }`

**Manual Test Step:** Use Postman/curl to POST login → returns JWT token

**User Test Prompt:** "Use Postman to log in with your credentials. Confirm you receive an access_token."

#### Task 4: Implement logout endpoint
- Add `POST /api/v1/auth/logout` to `backend/routers/auth.py`
- Return success message (token invalidation handled client-side)

**Manual Test Step:** Use Postman/curl to POST logout → returns success message

**User Test Prompt:** "Use Postman to call logout endpoint. Confirm you receive a success message."

#### Task 5: Implement protected route (optional)
- Add `GET /api/v1/auth/me` to return current user info
- Create JWT dependency to extract user from token
- Protect endpoint with JWT authentication

**Manual Test Step:** Call `/api/v1/auth/me` with valid token → returns user info; without token → 401 error

**User Test Prompt:** "Use Postman to call /api/v1/auth/me with Authorization header. Confirm you receive your user info."

### Definition of Done
- Users can sign up via API
- Users can log in and receive JWT
- Users can log out
- Protected route requires valid JWT
- All auth flows work end-to-end

### Post-Sprint
- Commit and push to `main`

---

## 🧱 S2 – Bills Management (CRUD Operations)

### Objectives
- Implement full CRUD for bills
- Support filtering by state, status, and search query
- Seed database with mock bills data
- Connect frontend dashboard and bill detail pages

### User Stories
- As a user, I can view all bills
- As a user, I can filter bills by state and status
- As a user, I can search bills by text
- As a user, I can view individual bill details
- As an admin, I can create, update, and delete bills

### Endpoints
- `GET /api/v1/bills`
- `GET /api/v1/bills/{id}`
- `POST /api/v1/bills`
- `PUT /api/v1/bills/{id}`
- `DELETE /api/v1/bills/{id}`

### Tasks

#### Task 1: Create Bill model and database operations
- Create `backend/models/bill.py` with Pydantic Bill model
- Create `backend/db/bills.py` with async functions: `create_bill()`, `get_bills()`, `get_bill_by_id()`, `update_bill()`, `delete_bill()`
- Support filtering by state, status, and text search

**Manual Test Step:** Create test bill via Python shell → bill stored in MongoDB

**User Test Prompt:** "Use MongoDB Atlas web interface. Confirm a test bill exists in the bills collection."

#### Task 2: Implement GET /api/v1/bills with filtering
- Create `backend/routers/bills.py` with `GET /api/v1/bills`
- Accept query params: `state`, `status`, `search`
- Return filtered bills array and total count
- Text search across title, bill_number, and summary fields

**Manual Test Step:** Use Postman/curl to GET bills with filters → returns filtered results

**User Test Prompt:** "Use Postman to call GET /api/v1/bills?state=California. Confirm you receive only California bills."

#### Task 3: Implement GET /api/v1/bills/{id}
- Add `GET /api/v1/bills/{id}` to `backend/routers/bills.py`
- Return single bill by ID
- Return 404 if bill not found

**Manual Test Step:** Use Postman/curl to GET bill by ID → returns bill details

**User Test Prompt:** "Use Postman to call GET /api/v1/bills/{id} with a valid ID. Confirm you receive the bill details."

#### Task 4: Seed database with mock bills
- Create `backend/scripts/seed_bills.py`
- Read mock bills from `frontend/src/data/mockBills.ts`
- Convert TypeScript data to Python and insert into MongoDB
- Run seed script once

**Manual Test Step:** Run seed script → MongoDB contains all 42 bills from mock data

**User Test Prompt:** "Run the seed script. Check MongoDB Atlas to confirm 42 bills are now in the database."

#### Task 5: Implement POST /api/v1/bills (admin only)
- Add `POST /api/v1/bills` to `backend/routers/bills.py`
- Validate all required fields
- Create bill and return with generated ID
- Protect with JWT (admin role check optional for MVP)

**Manual Test Step:** Use Postman/curl to POST new bill → returns created bill with ID

**User Test Prompt:** "Use Postman to create a new bill. Confirm you receive the created bill with an ID."

#### Task 6: Implement PUT /api/v1/bills/{id} (admin only)
- Add `PUT /api/v1/bills/{id}` to `backend/routers/bills.py`
- Update bill fields
- Return updated bill
- Return 404 if bill not found

**Manual Test Step:** Use Postman/curl to PUT update bill → returns updated bill

**User Test Prompt:** "Use Postman to update a bill's status. Confirm you receive the updated bill."

#### Task 7: Implement DELETE /api/v1/bills/{id} (admin only)
- Add `DELETE /api/v1/bills/{id}` to `backend/routers/bills.py`
- Delete bill from database
- Return success message
- Return 404 if bill not found

**Manual Test Step:** Use Postman/curl to DELETE bill → bill removed from database

**User Test Prompt:** "Use Postman to delete a bill. Check MongoDB Atlas to confirm it's removed."

#### Task 8: Connect frontend dashboard to backend
- Update `frontend/src/pages/dashboard.tsx` to fetch from `GET /api/v1/bills`
- Replace mock data import with API call
- Handle loading and error states
- Apply filters via query params

**Manual Test Step:** Open frontend dashboard → displays bills from backend, filters work

**User Test Prompt:** "Open the dashboard in your browser. Confirm bills load from the backend and filters work correctly."

#### Task 9: Connect frontend bill detail page to backend
- Update `frontend/src/pages/bill-detail.tsx` to fetch from `GET /api/v1/bills/{id}`
- Replace mock data lookup with API call
- Handle loading and error states

**Manual Test Step:** Click on a bill card → detail page loads from backend

**User Test Prompt:** "Click on any bill card. Confirm the detail page loads with data from the backend."

### Definition of Done
- All CRUD operations work via API
- Frontend dashboard displays live bills from backend
- Frontend bill detail page displays live data
- Filtering and search work correctly
- Database seeded with 42 bills

### Post-Sprint
- Commit and push to `main`

---

## 🧱 S3 – Analytics Aggregation

### Objectives
- Implement analytics endpoints for aggregated statistics
- Support state counts, status distribution, and requirement themes
- Connect frontend analytics page

### User Stories
- As a user, I can view total bills, active bills, and enacted bills
- As a user, I can see which states have the most bills
- As a user, I can see bill status distribution
- As a user, I can see most common compliance requirements

### Endpoints
- `GET /api/v1/analytics/overview`
- `GET /api/v1/analytics/states`
- `GET /api/v1/analytics/status`
- `GET /api/v1/analytics/requirements`

### Tasks

#### Task 1: Implement GET /api/v1/analytics/overview
- Create `backend/routers/analytics.py` with `GET /api/v1/analytics/overview`
- Aggregate total bills, active bills (In Committee, Passed House, Passed Senate), enacted bills
- Count unique states
- Return `{ "total_bills": 42, "active_bills": 15, "enacted_bills": 3, "states_count": 8 }`

**Manual Test Step:** Use Postman/curl to GET overview → returns aggregated stats

**User Test Prompt:** "Use Postman to call GET /api/v1/analytics/overview. Confirm you receive total_bills, active_bills, enacted_bills, and states_count."

#### Task 2: Implement GET /api/v1/analytics/states
- Add `GET /api/v1/analytics/states` to `backend/routers/analytics.py`
- Aggregate bill counts by state
- Sort by count descending
- Return `{ "states": [{"state": "California", "count": 5}, ...] }`

**Manual Test Step:** Use Postman/curl to GET states → returns state counts sorted

**User Test Prompt:** "Use Postman to call GET /api/v1/analytics/states. Confirm you receive states with counts, sorted by count."

#### Task 3: Implement GET /api/v1/analytics/status
- Add `GET /api/v1/analytics/status` to `backend/routers/analytics.py`
- Aggregate bill counts by status
- Return `{ "statuses": [{"status": "In Committee", "count": 10}, ...] }`

**Manual Test Step:** Use Postman/curl to GET status → returns status counts

**User Test Prompt:** "Use Postman to call GET /api/v1/analytics/status. Confirm you receive statuses with counts."

#### Task 4: Implement GET /api/v1/analytics/requirements
- Add `GET /api/v1/analytics/requirements` to `backend/routers/analytics.py`
- Analyze key_requirements arrays across all bills
- Categorize into themes: Bias Testing, Human Oversight, Disclosure, Impact Assessments, Documentation, Reporting, User Rights, Security, Data Privacy, Explainability
- Count occurrences of each theme
- Return top 10 themes sorted by count
- Return `{ "requirements": [{"theme": "Bias Testing & Fairness", "count": 25}, ...] }`

**Manual Test Step:** Use Postman/curl to GET requirements → returns requirement themes with counts

**User Test Prompt:** "Use Postman to call GET /api/v1/analytics/requirements. Confirm you receive requirement themes with counts."

#### Task 5: Connect frontend analytics page to backend
- Update `frontend/src/pages/analytics.tsx` to fetch from analytics endpoints
- Replace mock data calculations with API calls
- Handle loading and error states
- Display aggregated data in charts and lists

**Manual Test Step:** Open frontend analytics page → displays live analytics from backend

**User Test Prompt:** "Open the analytics page in your browser. Confirm all statistics load from the backend."

### Definition of Done
- All analytics endpoints return correct aggregated data
- Frontend analytics page displays live data from backend
- Charts and statistics update based on database content

### Post-Sprint
- Commit and push to `main`

---

## 🧱 S4 – Company Profile Analysis

### Objectives
- Implement company profile analysis endpoint
- Match bills to company based on criteria (state, revenue, employees, industries, AI use cases)
- Return applicable bills with reasons and confidence levels
- Connect frontend company profile page

### User Stories
- As a user, I can enter my company profile
- As a user, I can see which bills apply to my company
- As a user, I can see why each bill applies (reasons)
- As a user, I can see confidence level for each match
- As a user, I can generate a compliance checklist

### Endpoints
- `POST /api/v1/company/analyze`

### Tasks

#### Task 1: Implement POST /api/v1/company/analyze
- Create `backend/routers/company.py` with `POST /api/v1/company/analyze`
- Accept company profile: name, revenue, employee_count, states, industries, ai_use_cases
- Validate at least one state and one AI use case provided
- Return `{ "applicable_bills": [...], "total": 15 }`

**Manual Test Step:** Use Postman/curl to POST company profile → returns applicable bills

**User Test Prompt:** "Use Postman to submit a company profile. Confirm you receive applicable bills."

#### Task 2: Implement bill matching logic
- Create `backend/services/company_analyzer.py` with matching logic
- Match bills by state (company operates in bill's state)
- Match bills by revenue threshold (parse scope text for revenue requirements)
- Match bills by employee threshold (parse scope text for employee requirements)
- Match bills by AI use cases (keyword matching in bill text)
- Match bills by industry (keyword matching in bill text)
- Assign confidence level: High (multiple matches), Medium (state match), Low (weak match)
- Generate reasons array for each match

**Manual Test Step:** Test matching logic with various profiles → returns correct matches with reasons

**User Test Prompt:** "Submit different company profiles via Postman. Confirm matching logic works correctly for various criteria."

#### Task 3: Connect frontend company profile page to backend
- Update `frontend/src/pages/company-profile.tsx` to call `POST /api/v1/company/analyze`
- Replace client-side matching logic with API call
- Handle loading and error states
- Display applicable bills with reasons and confidence

**Manual Test Step:** Fill out company profile form → displays applicable bills from backend

**User Test Prompt:** "Fill out the company profile form in the browser. Confirm applicable bills load from the backend with reasons and confidence levels."

#### Task 4: Optimize matching algorithm
- Review matching logic for accuracy
- Adjust keyword matching for better precision
- Test with edge cases (no matches, all matches, partial matches)
- Ensure confidence levels are assigned correctly

**Manual Test Step:** Test with various company profiles → matching results are accurate and logical

**User Test Prompt:** "Test the company profile feature with different combinations. Confirm the matching results make sense."

### Definition of Done
- Company profile analysis endpoint works correctly
- Matching logic accurately identifies applicable bills
- Reasons and confidence levels are meaningful
- Frontend company profile page displays live analysis from backend

### Post-Sprint
- Commit and push to `main`

---

## ✅ STYLE & COMPLIANCE CHECKS

- ✅ Bullets only — no tables or prose
- ✅ Mention only visible frontend features
- ✅ Minimal APIs/models aligned with UI
- ✅ MongoDB Atlas only
- ✅ Python 3.13 runtime
- ✅ Each task has Manual Test Step and User Test Prompt
- ✅ After all tests pass → commit & push to `main`
- ✅ Dynamic sprints (S0 → S4) cover all frontend features
- ✅ No Docker, no pagination, no background tasks
- ✅ Single branch `main` workflow
- ✅ API base path `/api/v1/*`

---

**END OF BACKEND DEVELOPMENT PLAN**