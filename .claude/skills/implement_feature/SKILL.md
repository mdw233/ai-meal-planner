---
name: implement-issue
description: Implement a GitHub issue using our project workflow
argument-hint: "[issue-number]"
disable-model-invocation: true
---

Implement GitHub issue $ARGUMENTS.

Follow these steps exactly:

1. Identify the current repository with:
   gh repo view --json nameWithOwner

2. Read the issue:
   gh issue view $ARGUMENTS --json title,body,url,projectItems

3. Discover the GitHub Project and verify the issue
   is included. Inspect the Project Status field.

4. If its status is not Ready, stop and explain why.
   If no project is associated, stop and ask.

5. Read CLAUDE.md and any relevant OpenSpec change.

6. Move the issue's Project Status to In Progress.
   Use gh project item-edit with the correct project
   number, owner, issue URL, and Status field.

7. Create a branch named issue/gh-issue-number and check it out.
   Use gh pr checkout -b issue/$ARGUMENTS.

8. For substantial features, review or prepare OpenSpec. For simple features, just start to implement after asking any clarifying questions.

9. Implement the issue exactly as specified.
   Do not introduce unrelated functionality.

10. Add appropriate tests and run validation.

11. If validation fails, attempt to fix the problem.
    Never misrepresent failed validation as success.

12. Commit and push the changes.

13. Create a pull request using gh pr create.
    Include "Closes #$ARGUMENTS" in the PR body.

14. Confirm the PR exists, then move the Project
    Status to In Review.

15. Return:
    - PR URL
    - Files changed
    - Tests run and results
    - Any warnings or assumptions

Never merge the PR yourself.
Never mark an issue Done yourself.
