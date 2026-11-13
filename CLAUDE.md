# Meal Planner — Development Workflow

## GitHub integration

GitHub Issues are our source of work.
GitHub Projects is our workflow board.

Use the GitHub CLI (`gh`) to read issues,
inspect Project fields, and update statuses.

Do not assume an issue's Project status from
whether the issue is open or closed.

## Project statuses

Backlog:
Work has not been prioritized.

Spec Needed:
Requirements need clarification.

Ready:
Approved and eligible for implementation.

In Progress:
Claude is actively implementing the issue.

In Review:
Implementation is ready for human review.

Done:
PR has been merged and work is complete.

## Implementation workflow

When asked to implement an issue:

1. Fetch the GitHub Issue using gh.
2. Find its Project and current status.
3. Only implement issues marked Ready.
4. Review requirements and acceptance criteria.
5. For substantial features, review or prepare OpenSpec. For simple features, just start to implement after asking any clarifying questions.
6. Move the issue to In Progress.
7. Create a feature branch named issue/N (where N is the gh issue number).
8. Implement the smallest complete solution.
9. Write appropriate tests.
10. Run lint, typecheck, tests, and build.
11. Commit and push the branch.
12. Create a pull request referencing the issue.
13. Move the issue to In Review.
14. Report the PR URL and test results.

## Conventions

- All API routes live under `/api`: create them as
  `app/api/<name>/route.ts` (the repo uses root-level
  `app/`, not `src/app/`).
- API routes require auth by default via the Supabase
  proxy (`lib/supabase/proxy.ts`). Only exempt a route
  when its issue explicitly says no auth is required.

## Rules

- Do not implement Backlog issues without approval.
- Do not change issue scope without approval.
- Do not move issues to Done until merged.
- Do not merge PRs automatically.
- Do not bypass failing tests.
- Do not claim completion if a required step failed.
- If GitHub access is unavailable, stop and report it.

## Engineering rules

- Prefer simple solutions over abstractions.
- Keep business logic separate from UI.
- Use Zod for input validation.
- Authenticate and authorize server mutations.
- Add tests for meaningful new behavior.
- Use migrations for schema changes.
- Never expose Supabase secret keys to clients.
- Use RLS for user-owned data.

## GitHub CLI

Use `gh issue view` to read issues.
Use `gh project` to inspect and update board items.
Use `gh pr create` to create pull requests.
