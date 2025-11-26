# notes-management-system-46547-46557

This workspace contains the React frontend for the Notes app.

Quick links:
- Frontend: notes_frontend (React)
- Backend: See sibling workspace notes-management-system-46547-46556 (FastAPI). API docs typically at http://localhost:3001/docs

Run locally:
1) Backend (FastAPI)
- Start the backend on port 3001 (see backend README in its workspace).
- Confirm API is reachable at http://localhost:3001 and docs at /docs.
- The backend persists data in a SQLite database file created on first run (e.g., notes.db in the backend working directory).

2) Frontend (React)
- cd notes_frontend
- cp .env.example .env (adjust REACT_APP_API_BASE if backend is not on http://localhost:3001)
- npm install
- npm start
- Open http://localhost:3000
- Verify the top toolbar shows the correct API base (e.g., API: http://localhost:3001).

CORS/Base URL
- Frontend uses REACT_APP_API_BASE to call the backend. Ensure CORS on the backend allows http://localhost:3000 during development.
  Typical FastAPI CORS settings:
  - allow_origins=["http://localhost:3000"]
  - allow_methods=["*"], allow_headers=["*"]
- For deployments, set REACT_APP_API_BASE to your backend URL (https recommended).

Persistence
- Notes are stored by the backend in SQLite. The DB file is created automatically (e.g., notes.db).
- Quick check: create notes in UI, restart backend, refresh UI — notes should still be present.
