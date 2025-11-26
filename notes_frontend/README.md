# Notes Frontend (React)

A modern, lightweight UI for managing notes using the Ocean Professional theme.

## Quick start

1) Configure environment
- Copy `.env.example` to `.env`. If your backend runs on a different host/port, update:
  - `REACT_APP_API_BASE` (defaults to `http://localhost:3001` if not set)
- The API base is normalized (trailing slash removed) and joined with paths safely.

2) Install and run
- `npm install`
- `npm start`
- Open http://localhost:3000 in your browser

You should see the API base shown in the top toolbar (e.g., `API: http://localhost:3001`).

## Configuration

- REACT_APP_API_BASE
  - Base URL for the FastAPI backend. If not set, the app uses `http://localhost:3001` by default.
  - Example: `REACT_APP_API_BASE=https://your-backend.example.com`
- See `.env.example` for optional variables used by some platforms.

## CORS and base URL notes

- The frontend calls the backend using `REACT_APP_API_BASE`. Ensure the backend allows requests from your frontend origin.
- If you serve the frontend on http://localhost:3000 and the backend on http://localhost:3001, typical FastAPI CORS config should include:
  - `allow_origins` including `http://localhost:3000`
  - `allow_methods=["*"]`, `allow_headers=["*"]`
- If you deploy behind HTTPS or a different domain, update `REACT_APP_API_BASE` accordingly.

## Backend and persistence

- The backend is a FastAPI service (see the backend container) with SQLite persistence.
- On first run, the backend will create a SQLite database file (commonly `notes.db` or similar) in its working directory.
- To run the backend locally (example):
  - Ensure dependencies are installed (see backend README)
  - Start the API on port 3001
  - Verify the docs at http://localhost:3001/docs
- Persistence: all created notes are stored in the SQLite database file, so data remains across backend restarts.

### Verify persistence quickly
- Create a few notes in the UI
- Restart the backend service
- Refresh the frontend; previously created notes should still appear (confirm `notes.db` exists in backend working directory)

## Features

- Two‑pane layout: sidebar list + main editor
- Create, search, update, delete notes
- Loading/error states, basic validation, delete confirmations
- Keyboard: Save with Ctrl/Cmd+S
- Theme toggle (light/dark)
- Visible API base indicator in the toolbar for quick verification

## API

The app uses the backend OpenAPI (FastAPI):
- GET/POST `/notes`
- GET/PUT/DELETE `/notes/{note_id}`

Configure base URL via `REACT_APP_API_BASE`.
