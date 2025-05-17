# LinguaForge Backend

## Tech
- Node.js + Express
- TypeScript
- PostgreSQL (via Prisma or Sequelize)
- Redis (cache)
- JWT/OAuth2.0 Auth

## Getting Started
1. `npm install`
2. `cp .env.example .env` and set DB credentials
3. `npm run dev` for development

## Structure
- `src/controllers/` — API logic
- `src/models/` — Database models
- `src/routes/` — Express routes
- `src/services/` — Business logic, AI, gamification
- `src/utils/` — Helpers

## Features
- User authentication (JWT/OAuth2.0)
- User profiles, XP, leaderboards
- Lesson endpoints
- Real-time notifications (Websockets)

---
See root README for project-wide info.
