# Solo Development Process

## Git Branching
- Use a single `main` branch for all stable work.
- Create temporary branches for experiments or major features if needed (e.g., `temp/lesson-engine`).
- Merge back to `main` when ready. No need for PRs, reviews, or complex workflows.

## Workflow
- Use `docs/backlog.md` as your personal task list.
- Pick a task, implement it, test locally, and mark it done.
- Commit regularly with clear messages.
- No formal sprints, standups, or ceremonies—work at your own pace.

## CI/CD
- No automated CI/CD required while working solo. Run `npm run lint` and `npm test` manually as needed.

## Notes
- Update documentation as you go for future reference or if you add collaborators later.

---
See backlog.md for your personal roadmap.

