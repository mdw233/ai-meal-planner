---
name: explore-issue
description: Explore a GitHub issue before creating an OpenSpec proposal
argument-hint: "[issue-number]"
disable-model-invocation: true
---

Explore GitHub issue $ARGUMENTS.

1. Fetch the issue using GitHub CLI.
2. Read its description, labels, and project status.
3. Read CLAUDE.md and relevant existing code/specs.
4. Move the GitHub Project item to Exploring.
5. Enter the OpenSpec exploration workflow,
   following the installed openspec-explore skill.

During exploration:

- Discuss the problem and desired outcome.
- Investigate the existing codebase.
- Offer implementation alternatives.
- Explain tradeoffs and risks.
- Identify missing requirements.
- Recommend a sensible MVP scope.
- Do not implement application code.
- Do not create a formal proposal automatically.

When we agree on an approach:

- Summarize the decisions.
- Suggest an OpenSpec change name.
- Ask whether to create the proposal.

Do not move the issue to Ready.
