# TOOLS.md - Local Notes

## GitHub Workflow (Strict)

When using the GitHub CLI (`gh`) or Git:
1. **Never** assume the local workspace is in sync with the remote.
2. **Before every `git push`**, you MUST:
   - `git fetch` to get the latest remote info.
   - `git status` to check for discrepancies.
3. **Push immediately** after any relevant changes are successfully executed.

## Other Notes

(Add specific camera names, SSH hosts, or other environment details here.)
