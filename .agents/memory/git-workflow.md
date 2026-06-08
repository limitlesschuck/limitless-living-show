---
name: Git workflow preference
description: User manages all git commits and pushes manually — agent must never run git add/commit/push
---

**Rule:** Never run `git add`, `git commit`, or `git push`. Make code changes only. The user will run all git commands themselves after testing.

**Why:** User explicitly instructed this on 2026-06-07. They want to review and test changes before committing.

**How to apply:** After completing any code change task, do not suggest or attempt a git push. If a prompt instructs a git push as a step, skip that step and note that the user will handle it manually.
