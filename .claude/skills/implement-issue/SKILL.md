---
name: implement-issue
description: Implement a Ready GitHub issue using an approved OpenSpec change when required
argument-hint: "[issue-number]"
disable-model-invocation: true
---

# Implement GitHub Issue

Implement issue #$ARGUMENTS using our established
GitHub Projects and OpenSpec workflow.

You are the implementation agent, not the product
owner or requirements designer.

Follow CLAUDE.md and the instructions below.

## 1. Discover the issue

Verify the working repository:

    gh repo view --json nameWithOwner

Fetch the requested issue:

    gh issue view $ARGUMENTS \
      --json number,title,body,url,state,labels,projectItems

Read the complete issue and its acceptance criteria.

Do not rely on the issue title alone.

## 2. Verify Project status

Identify the GitHub Project associated with the issue.

Inspect the issue's Project Status field using GitHub
CLI, fetching additional Project details if necessary.

The issue MUST be:

- Open
- Associated with the expected Project
- In status "Ready"

If any condition fails, STOP.

Do not automatically move an issue from Backlog,
Exploring, or Spec Review into Ready.

Only the human product owner can approve Ready.

## 3. Locate the approved OpenSpec change

Check whether the issue references an OpenSpec change.

Look for:

- An OpenSpec path in the issue body
- An approved specification link in issue comments
- A matching change in openspec/changes/

Use explicit issue references as the primary source.

If there are multiple possible matches, STOP and
ask which change applies.

If the issue requires a spec but none exists, STOP
and recommend running /explore_issue.

A spec is normally required for:

- New product functionality
- Database or schema changes
- Authentication or authorization changes
- Complex UI behavior
- Multi-component features
- Architectural changes

A spec may be skipped for:

- Very small, unambiguous changes
- Simple endpoints with complete acceptance criteria
- Minor styling or copy fixes
- Straightforward bug fixes

For spec-required issues, verify:

- proposal.md exists
- tasks.md exists
- Relevant specification artifacts exist
- The proposal covers the issue requirements
- Explicit approval is recorded in the issue

Do not interpret Project Status "Ready" alone as
proof of OpenSpec approval.

If approval is missing, STOP.

## 4. Inspect the repository

Read:

- CLAUDE.md
- Relevant source code
- Applicable tests
- Relevant OpenSpec artifacts
- Existing design and architectural conventions

Check for uncommitted changes.

Do not overwrite unrelated work.

If the worktree is dirty in a way that could conflict
with the implementation, STOP and explain.

Check whether an implementation branch or PR
already exists for this issue.

Reuse existing issue work where appropriate.
Do not create duplicate PRs.

## 5. Start implementation

Create a branch:

    issue-N-short-description

Use the actual issue number and a concise slug.

Before modifying application code:

1. Update the GitHub Project Status to "In Progress".
2. Verify the update succeeded.
3. Confirm the implementation plan and scope.

Use the GitHub CLI to update Project fields.

Example syntax:

    gh project item-edit PROJECT_NUMBER \
      --owner PROJECT_OWNER \
      --url ISSUE_URL \
      --field "Status" \
      --value "In Progress"

Discover actual owner, project number and issue URL.
Do not assume fixed project identifiers.

If the status update fails, STOP and report the error.

## 6. Implement the approved requirements

If an OpenSpec change exists:

- Follow the installed OpenSpec apply workflow.
- Use the approved change as the implementation contract.
- Implement tasks from tasks.md.
- Update task completion as work progresses.
- Do not rewrite approved requirements casually.

OpenSpec 2.x may expose this as the
openspec-apply-change skill.

Older installations may use /opsx:apply.

Use whichever workflow is installed in this repo.

If no spec is required:

- Implement directly from the GitHub issue.
- Follow its acceptance criteria exactly.

In both cases:

- Prefer the smallest complete implementation.
- Follow existing project conventions.
- Avoid unrelated refactoring.
- Write meaningful tests.
- Do not add unnecessary dependencies.

If implementation requires a major decision
not covered by the approved requirements, STOP.

Explain the decision needed rather than guessing.

## 7. Verify implementation

Run the available checks:

- Lint
- TypeScript typecheck
- Unit tests
- Relevant integration or browser tests
- Production build

Run the OpenSpec verification workflow if installed
and if this issue has an OpenSpec change.

Do not mark verification complete unless the checks
actually passed.

If a check fails:

1. Investigate the failure.
2. Fix failures caused by your changes.
3. Rerun the affected checks.
4. Clearly report unresolved failures.

Do not bypass checks to create a passing result.

## 8. Create the pull request

Once implementation and checks pass:

1. Commit the implementation.
2. Push the feature branch.
3. Create a pull request targeting main.
4. Include "Closes #N" in the PR body.

The PR description must include:

- Linked GitHub issue
- OpenSpec change path, if applicable
- Summary of implementation
- Files or components affected
- Tests executed and their results
- Any relevant design decisions
- Known risks or limitations
- Manual verification instructions

Do not merge the PR.

Do not deploy production manually.

## 9. Update Project status

After confirming that the PR exists:

Move the original GitHub issue to "In Review".

Verify the status update succeeded.

Do not mark the issue Done.

If the PR cannot be created, leave the issue
In Progress and report the blocker.

Do not claim the issue is In Review unless the
GitHub Project update actually succeeded.

## 10. Report results

Provide a concise completion report:

Issue: #N
Branch: issue-N-short-description
OpenSpec: change path or "Not required"
PR: URL
Project status: In Review

Implementation:

- Summary of what changed

Verification:

- Checks passed
- Checks failed or not executed

Review notes:

- Important implementation decisions
- Things the human reviewer should inspect

## Hard rules

NEVER:

- Start implementation unless status is Ready
- Approve your own specification
- Change product scope without approval
- Silently overwrite uncommitted work
- Merge a PR
- Mark an issue Done
- Hide failed tests or GitHub API errors
- Archive OpenSpec changes before review/merge

If a blocking condition is encountered, explain
the issue and stop rather than bypassing the rule.
