# Builder Logs

This directory contains implementation logs created by the Builder agent.

## Purpose

Builder logs document:
- What was implemented
- Files created or modified
- Key implementation decisions
- Deviations from plan (if any)
- Issues encountered
- Next steps for validation

## File Naming Convention

`dd-mm-yyyy_[feature-name].md`

Example: `03-11-2025_user-dashboard.md`

## When Logs Are Created

A new builder log is created when:
- A feature implementation is completed
- Code changes are made following a Planner's plan
- Significant development work is done

## Log Structure

Each builder log should be CONCISE and include:
1. Completed steps (bullet points)
2. Key decisions made
3. Files modified/created
4. Deviations from plan (if any)
5. Issues encountered
6. Next steps

## Best Practices

- Keep logs brief - use bullet points
- Use Gemini to generate logs when possible
- Focus on what was done, not how
- Document deviations and why
- Flag issues for Validator or Debugger
