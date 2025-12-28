# Environment Setup

## Backend (`backend`)

- Copy `.env.example` to `.env` and set:
  - `SECRET_KEY` – strong secret for JWT signing.
  - `ALGORITHM` – defaults to HS256.
  - `ACCESS_TOKEN_EXPIRE_MINUTES` – token lifetime (minutes).
  - `DATABASE_URL` – SQLite by default.
- Run with `uvicorn backend.main:app --reload` from `backend`.

## Frontend (`frontend`)

- Copy `.env.example` to `.env` and set:
  - `VITE_API_URL` – URL of the FastAPI service (e.g., `http://localhost:8000`).
- Start with `npm install && npm run dev`.

## Tooling

- Node.js 18+ and npm for the frontend.
- Python 3.11+ recommended for the backend.
- TailwindCSS and Vite are configured; ESLint is included for TS/JS linting.
