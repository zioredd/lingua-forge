# LinguaForge

A scalable, AI-powered, gamified language learning platform inspired by Duolingo, with enhanced personalization, community, and advanced features.

## Tech Stack
- **Frontend:** React.js (Next.js), TypeScript, Tailwind CSS, Lottie, PWA
- **Backend:** Node.js + Express, TypeScript, REST API, Websockets
- **Database:** PostgreSQL, Redis (cache), Firebase/AWS S3 (media)
- **AI/NLP:** OpenAI GPT-4, Google Cloud Speech-to-Text
- **DevOps:** Docker, Kubernetes, GitHub Actions, Cloudflare

## Monorepo Structure
```
lingua-forge/
├── backend/
├── frontend/
├── devops/
├── README.md
└── .gitignore
```

## Getting Started
1. `cd backend && npm install`
2. `cd frontend && npm install`
3. See each subfolder README for details.

## Workflow (Solo Developer)
- Work directly on the `main` branch.
- Create temporary branches for major features or experiments if needed.
- Use `docs/backlog.md` as your personal todo list.
- Run tests and lint scripts manually as needed.
- Update docs as you go for future reference.

## Features
- Secure OAuth2/JWT authentication
- Adaptive AI learning engine
- Gamified lessons, leaderboards, streaks
- Community & social features
- Real-time notifications
- Monetization (freemium, premium, IAP)
- Accessibility & privacy by design

---
For detailed requirements, see the project specification.
