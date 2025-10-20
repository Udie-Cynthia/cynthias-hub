# Cynthias Hub (Docker)

## Quick start
cp .env.example .env   # fill real values
docker compose up --build
# App → http://localhost:3000

Notes:
- Secrets live in .env (not committed).
- public/uploads is mounted so user files persist.
