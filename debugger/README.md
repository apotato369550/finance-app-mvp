# Debugger Logs

This directory contains debug logs created by the Debugger agent.

## Purpose

Debugger logs document:
- Issues investigated
- Root causes identified
- Fixes applied
- Verification results
- Resolution details

## File Naming Convention

`dd-mm-yyyy_[issue-name].md`

Example: `03-11-2025_auth-failure-fix.md`

## When Logs Are Created

A new debugger log is created when:
- A bug is fixed
- An issue is investigated and resolved
- A Validator-reported problem is addressed

## Log Structure

Each debugger log should be CONCISE and include:
1. Issue summary
2. Root cause identified
3. Fix applied (what changed)
4. Files modified
5. Verification checklist
6. Notes or considerations

## Best Practices

- Keep logs brief - use bullet points
- Use Gemini to generate logs when possible
- Focus on root cause, not symptoms
- Document what was changed and why
- Verify fix works in both dev and prod modes
- Note any additional issues discovered
