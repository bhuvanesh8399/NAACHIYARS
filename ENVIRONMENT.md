# Environment Setup

## Backend (`apps/api`)

- Copy `.env.example` to `.env` and set:
  - `API_SECRET_KEY` – strong secret for JWT signing.
  - `API_JWT_ALGORITHM` – defaults to HS256.
  - `API_ACCESS_TOKEN_EXPIRE_MINUTES` – token lifetime (minutes).
- Run with `uvicorn main:app --reload` from `apps/api`.

## Frontend (`apps/web`)

- Copy `.env.example` to `.env` and set:
  - `VITE_API_URL` – URL of the FastAPI service (e.g., `http://localhost:8000`).
- Start with `npm install && npm run dev`.

## Tooling

- Node.js 18+ and npm for the frontend.
- Python 3.11+ recommended for the backend.
- TailwindCSS and Vite are configured; ESLint is included for TS/JS linting.
