# Validator Logs

This directory contains validation reports created by the Validator agent.

## Purpose

Validator logs document:
- Test results (automated and manual)
- Issues found during testing
- Pass/fail status for features
- Quality assurance verification
- Detailed bug reports for Debugger

## File Naming Convention

`dd-mm-yyyy_[feature-name].md`

Example: `03-11-2025_user-dashboard.md`

## When Logs Are Created

A new validator log is created when:
- A feature is ready for testing
- QA verification is performed
- Bugs are found and need documentation
- Acceptance criteria are being verified

## Log Structure

Each validator log should include:
1. Acceptance criteria checklist
2. Automated test results
3. Manual testing results (dev and production modes)
4. UI/UX testing results
5. Issues found (with reproduction steps)
6. Overall pass/fail result
7. Next steps

## Issue Documentation

For each bug found, include:
- Severity (critical/major/minor)
- Location (file and line)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or logs
- Environment details

## Usage

These logs provide Debugger with complete information needed to fix issues. Be thorough and specific in bug documentation.
