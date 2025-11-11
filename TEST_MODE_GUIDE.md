# TEST_MODE Guide

## Overview
The FinanceEd PH app now supports three testing modes:

- **MOCK**: No authentication, uses mock data only (fastest for UI development)
- **DEV**: Uses local Supabase instance (requires `supabase start`)
- **LIVE**: Uses remote Supabase server (production/staging)

## Configuration

### Environment Variables
Edit `.env.local` to set your test mode:

```bash
# Set to MOCK, DEV, or LIVE
NEXT_PUBLIC_TEST_MODE=DEV
```

### Supabase Credentials

**DEV Mode** (Local Supabase):
```bash
NEXT_PUBLIC_SUPABASE_URL_DEV=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

**LIVE Mode** (Remote Supabase):
```bash
NEXT_PUBLIC_SUPABASE_URL_LIVE=YOUR_REMOTE_SUPABASE_URL_HERE
NEXT_PUBLIC_SUPABASE_ANON_KEY_LIVE=YOUR_REMOTE_SUPABASE_ANON_KEY_HERE
```

## Testing Each Mode

### 1. Testing MOCK Mode

**Setup:**
```bash
# In .env.local
NEXT_PUBLIC_TEST_MODE=MOCK

# Start the dev server
npm run dev
```

**Expected Behavior:**
- ✅ No Supabase connection required
- ✅ Any email/password works for login/signup
- ✅ User data stored in localStorage only
- ✅ API endpoints return mock data
- ✅ Console shows: `🎭 Using mock data (no database connection)`
- ✅ Console shows: `[MOCK] Mock login for <email>`

**Test Steps:**
1. Open http://localhost:3000
2. Navigate to /login
3. Enter any email (e.g., test@example.com) and password
4. Click "Login" - should succeed immediately
5. Check browser console for MOCK mode logs
6. Navigate to /quiz and try answering questions
7. Check that responses are "saved" (mock)

---

### 2. Testing DEV Mode

**Setup:**
```bash
# Start local Supabase (in a separate terminal)
supabase start

# In .env.local
NEXT_PUBLIC_TEST_MODE=DEV

# Start the dev server
npm run dev
```

**Expected Behavior:**
- ✅ Connects to local Supabase at http://127.0.0.1:54321
- ✅ Real authentication (email/password validation)
- ✅ Data persisted to local PostgreSQL database
- ✅ Console shows: `📡 Connected to local Supabase: http://127.0.0.1:54321`
- ✅ Console shows: `[DEV] Real signup for <email>`
- ✅ Console shows: `[DEV] Saving answer for user <id>, question <id>`

**Test Steps:**

**A. Test Signup:**
1. Open http://localhost:3000/signup
2. Enter email: `test@example.com` and password: `password123`
3. Click "Sign Up"
4. Should receive confirmation (check Mailpit at http://127.0.0.1:54324)
5. Check browser console for DEV mode logs

**B. Test Login:**
1. Open http://localhost:3000/login
2. Use the same email/password
3. Should successfully log in
4. Should see user dashboard

**C. Test Data Persistence:**
1. Complete onboarding quiz
2. Answer a few questions
3. Refresh the page
4. Your answers should persist

**D. Verify Database:**
```bash
# Connect to local database
supabase db connect

# Check tables
\dt

# Check onboarding responses
SELECT * FROM onboarding_response;

# Check profiles
SELECT * FROM profiles;
```

**E. View Supabase Studio:**
- Open http://127.0.0.1:54323
- Explore tables and data visually

---

### 3. Testing LIVE Mode

**Setup:**
```bash
# In .env.local
NEXT_PUBLIC_TEST_MODE=LIVE
NEXT_PUBLIC_SUPABASE_URL_LIVE=<your-remote-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY_LIVE=<your-remote-key>

# Start the dev server
npm run dev
```

**Expected Behavior:**
- ✅ Connects to remote Supabase instance
- ✅ Real authentication against production database
- ✅ Data persisted to remote PostgreSQL
- ✅ Console shows: `🌐 Connected to remote Supabase: <your-url>`
- ✅ Console shows: `[LIVE] Real signup for <email>`

**Test Steps:**
1. Follow same steps as DEV mode
2. Data will be saved to remote database
3. Use Supabase dashboard to verify data

---

## Troubleshooting

### Mode not switching?
- Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache and localStorage
- Restart dev server

### DEV mode: "Connection refused"?
- Make sure `supabase start` is running
- Check http://127.0.0.1:54321 is accessible
- Verify SUPABASE_URL_DEV and SUPABASE_ANON_KEY_DEV are correct

### LIVE mode not working?
- Verify your remote Supabase credentials are correct
- Check Supabase dashboard for errors
- Ensure database migrations are applied

### Authentication failing?
- Check console logs for mode confirmation
- Verify correct credentials for DEV/LIVE modes
- In MOCK mode, any credentials work

---

## Console Logs Reference

You should see different log messages based on mode:

**MOCK Mode:**
```
🎭 Using mock data (no database connection)
[MOCK] Mock login for test@example.com
[MOCK] Mock save: answer for user mock-123, question q1
```

**DEV Mode:**
```
📡 Connected to local Supabase: http://127.0.0.1:54321
[DEV] Using Supabase authentication
[DEV] Real signup for test@example.com
[DEV] Saving answer for user abc-123, question q1
```

**LIVE Mode:**
```
🌐 Connected to remote Supabase: https://xxx.supabase.co
[LIVE] Using Supabase authentication
[LIVE] Real signup for test@example.com
[LIVE] Saving answer for user abc-123, question q1
```

---

## Quick Mode Switching

To quickly switch between modes, just edit `.env.local`:

```bash
# Switch to MOCK
NEXT_PUBLIC_TEST_MODE=MOCK

# Switch to DEV
NEXT_PUBLIC_TEST_MODE=DEV

# Switch to LIVE
NEXT_PUBLIC_TEST_MODE=LIVE
```

Then restart your dev server:
```bash
# Stop current server (Ctrl+C)
# Start again
npm run dev
```

---

## Summary

✅ **MOCK Mode**: Fast UI development, no database needed
✅ **DEV Mode**: Full local testing with Supabase, data persists locally
✅ **LIVE Mode**: Production testing with remote Supabase

All three modes work seamlessly with the same codebase!
