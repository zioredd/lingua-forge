# Database Schema (Draft)

## Users
- id (UUID, PK)
- email (unique)
- name
- avatar_url
- xp
- streak
- created_at

## Lessons
- id (UUID, PK)
- language
- level
- content (JSON)
- created_at

## Progress
- id (UUID, PK)
- user_id (FK)
- lesson_id (FK)
- score
- completed_at

## Friends
- id (UUID, PK)
- user_id (FK)
- friend_id (FK)

## Leaderboard (cached)
- user_id (FK)
- xp

---
Use migrations and ERD tools for detailed schema.
