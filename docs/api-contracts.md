# API Contracts (Section 1)

Base URL: `http://localhost:8000`

## Auth

- `POST /auth/login`
  - Body: `{ "email": string, "password": string, "role": "user" | "supervisor" | "admin" }`
  - Response: `{ "access_token": string, "token_type": "bearer", "role": string, "must_change_password": boolean }`
- `POST /auth/force-change-password`
  - Auth: `Bearer <token>`
  - Body: `{ "new_password": string }`
  - Response: `{ "status": "ok" }`
- `GET /auth/me`
  - Auth: `Bearer <token>`
  - Response: `{ "id": number, "email": string, "full_name": string, "role": string, "must_change_password": boolean }`

## Admin

- `GET /admin/overview`
  - Auth: `Bearer <token>` (role `admin`)
  - Response: `{ "status": "ok", "message": "Admin-only endpoint", "sections": string[] }`

## Health

- `GET /health`
  - Response: `{ "status": "ok" }`
