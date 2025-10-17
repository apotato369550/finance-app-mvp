# Testing Guide - Authentication Flow

## Dev Mode Testing (Current Setup)

The app is currently configured with `NEXT_PUBLIC_DEV_MODE=true`, which means authentication uses mock data stored in localStorage.

### Test Scenario 1: Sign Up Flow

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click "Login" button in the header (or navigate to `/signup`)
3. Click "Sign up" link at the bottom of the login form
4. Enter any email (e.g., `test@example.com`)
5. Enter any password (minimum 6 characters, e.g., `password123`)
6. Confirm password with the same value
7. Click "Create Account"

**Expected Result:**
- You should be redirected to `/dashboard`
- The dashboard should show your email and a mock user ID
- The header should now show "Dashboard" button instead of "Login"
- A yellow banner indicates you're in DEV MODE

### Test Scenario 2: Login Flow

1. If you're logged in, sign out from the dashboard
2. Navigate to `/login`
3. Enter any email and password (6+ characters)
4. Click "Sign In"

**Expected Result:**
- You should be redirected to `/dashboard`
- Mock user data is created and stored in localStorage

### Test Scenario 3: Protected Route

1. Open a new incognito/private browser window
2. Navigate directly to [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

**Expected Result:**
- You should be redirected to `/login`
- After logging in, you're taken to the dashboard

### Test Scenario 4: Already Logged In

1. While logged in, try to navigate to `/login` or `/signup`

**Expected Result:**
- You should be immediately redirected to `/dashboard`

### Test Scenario 5: Sign Out

1. From the dashboard, click "Sign Out" button

**Expected Result:**
- Mock user data is removed from localStorage
- You're redirected to the home page
- Header shows "Login" button again

## Validation Testing

### Email Validation

Test these invalid inputs on signup/login:
- Empty email: Should show "Please fill in all fields"
- Invalid email (no @): Should show "Please enter a valid email"

### Password Validation

Test these invalid inputs:
- Empty password: Should show "Please fill in all fields"
- Password < 6 characters: Should show "Password must be at least 6 characters"
- Mismatched passwords (signup only): Should show "Passwords do not match"

## Browser Console Check

Open browser DevTools and check:
1. **localStorage**: Should contain `mockUser` key when logged in
2. **Console errors**: Should be none
3. **Network tab**: In dev mode, no Supabase API calls should be made

## Production Mode Testing (After Supabase Setup)

Once you've set up Supabase and set `NEXT_PUBLIC_DEV_MODE=false`:

1. Clear localStorage in browser DevTools
2. Restart the dev server (`npm run dev`)
3. Sign up with a real email
4. Check Supabase dashboard > Authentication > Users to see the new user
5. Try logging in with the credentials
6. Verify session persists across page refreshes

## Known Behaviors

- **Dev Mode**: Any email/password works, data stored in localStorage
- **Prod Mode**: Real Supabase auth, requires valid credentials
- **Session Persistence**: In prod mode, sessions persist across browser restarts
- **Email Verification**: Disabled by default in Supabase, can be enabled in dashboard

## Troubleshooting

### Issue: Stuck at loading screen
- Check browser console for errors
- Verify `.env.local` file exists and has `NEXT_PUBLIC_DEV_MODE=true`
- Clear browser cache and localStorage

### Issue: Can't access dashboard
- Make sure you're logged in (check if "Dashboard" appears in header)
- Clear localStorage and try logging in again

### Issue: Changes not reflecting
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Check if dev server is running
- Restart dev server if needed
