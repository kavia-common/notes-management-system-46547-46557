# Notes Frontend (React)

A modern, lightweight UI for managing notes using the Ocean Professional theme.

## Run

- Copy `.env.example` to `.env` and adjust if your backend runs on a different host/port.
  - REACT_APP_API_BASE defaults to `http://localhost:3001`
- Install and start:
  - `npm install`
  - `npm start`

## Features

- Two‑pane layout: sidebar list + main editor
- Create, search, update, delete notes
- Loading/error states, basic validation, delete confirmations
- Keyboard: Save with Ctrl/Cmd+S
- Theme toggle (light/dark)

## API

The app uses the backend OpenAPI (FastAPI):
- GET/POST `/notes`
- GET/PUT/DELETE `/notes/{note_id}`

Configure base URL via `REACT_APP_API_BASE`.
