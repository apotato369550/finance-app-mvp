# FinanceEd PH - Personal Finance Education MVP

A mobile-responsive Filipino personal finance education platform built with Next.js, React, Supabase, and Tailwind CSS.

## Features

### ✅ Implemented (MVP Ready)
- **User Authentication** - Login/signup with mock and real Supabase auth
- **Financial Analysis Quiz** - Multi-step quiz with personalized recommendations
- **Fund Analysis Tool** - Analyze investment funds with scores and insights
- **Content Repository** - Curated books, videos, and articles with filtering
- **Settings & Dev Mode** - Toggle between mock and real data
- **Mobile Responsive** - Hamburger menu, 44px touch targets, optimized for 375px+ screens
- **Dev Mode Indicator** - Visual indicator when using mock data

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (configured, ready for production)
- **Authentication**: Supabase Auth with localStorage fallback
- **UI**: React with mobile-first responsive design

## Project Structure

```
finance-app-mvp/
├── app/                        # Next.js app router pages
│   ├── api/
│   │   ├── analyze-fund/       # API route for fund analysis (TODO: AI integration)
│   │   └── analyze-user/       # API route for user analysis (TODO: AI integration)
│   ├── content/                # Content repository page ✅
│   ├── dashboard/              # User dashboard with analysis results ✅
│   ├── fund-analysis/          # Fund analysis tool ✅
│   ├── login/                  # Login page ✅
│   ├── quiz/                   # Financial analysis quiz ✅
│   ├── settings/               # Settings and dev mode toggle ✅
│   ├── signup/                 # Sign up page ✅
│   ├── layout.tsx              # Root layout with header/footer
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles with Tailwind
├── components/                 # React components
│   ├── Header.tsx              # Navigation header with dev mode indicator ✅
│   └── Footer.tsx              # Site footer
├── lib/                        # Utilities
│   ├── auth-context.tsx        # Authentication context provider
│   ├── mockAnalysis.ts         # Mock user analysis function ✅
│   ├── mockFundAnalysis.ts     # Mock fund analysis function ✅
│   └── supabase.ts             # Supabase client configuration
└── README.md                   # This file
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Enable Dev Mode (Recommended for Testing)

1. Navigate to [http://localhost:3000/settings](http://localhost:3000/settings)
2. Toggle **"Developer Mode"** to **ON**
3. You'll see a yellow "DEV" badge appear in the header
4. Now you can test all features with mock data:
   - Login with any email/password (e.g., test@example.com / password123)
   - Complete the quiz and get instant mock analysis
   - Analyze any fund and get instant mock results

### 4. Configure Environment Variables (Optional for Production)

Create a `.env.local` file for production mode:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Note**: For MVP testing, Supabase setup is optional. Dev mode works without it!

## How Dev Mode Works

The app includes a runtime dev mode toggle accessible in `/settings`:

### When Dev Mode is ON (Yellow "DEV" badge visible):
- ✅ Mock authentication (any email/password works)
- ✅ Instant quiz analysis using `mockAnalysis.ts`
- ✅ Instant fund analysis using `mockFundAnalysis.ts`
- ✅ No API calls, no AI needed
- ✅ Data stored in localStorage

### When Dev Mode is OFF:
- Real Supabase authentication required
- API routes call AI services (needs configuration)
- Production-ready behavior

## Available Routes

- `/` - Home page with feature overview
- `/login` - User login page
- `/signup` - User signup page
- `/dashboard` - Protected dashboard with analysis results
- `/quiz` - Financial analysis quiz (3-step form)
- `/fund-analysis` - Fund analysis tool with mock/AI results
- `/content` - Curated learning content with filters
- `/settings` - Dev mode toggle and app settings

## Manual Testing Checklist

Use this checklist to verify all features are working:

### Authentication Flow
- [ ] Navigate to /login
- [ ] Enable dev mode in /settings
- [ ] Login with test@example.com / password123
- [ ] Verify redirect to dashboard
- [ ] Check user email is displayed
- [ ] Click Sign Out, verify redirect to home
- [ ] Try signup with new credentials
- [ ] Verify new user can login

### Quiz Flow
- [ ] Login first
- [ ] Navigate to /quiz
- [ ] Fill out section 1: Select occupation
- [ ] Click Next, verify section 2 loads
- [ ] Enter monthly income and expenses
- [ ] Select bank account status (Yes/No buttons)
- [ ] Click Next, verify section 3 loads
- [ ] Type essay response (test minimum 1 character)
- [ ] Click Submit
- [ ] Verify redirect to dashboard
- [ ] Check analysis results display:
  - User type badge
  - Financial health badge
  - Risk profile badge
  - 3-5 recommendations listed

### Fund Analysis Flow
- [ ] Navigate to /fund-analysis
- [ ] Leave input empty and click Analyze
- [ ] Verify error message appears
- [ ] Enter "BPI Equity Fund"
- [ ] Click Analyze Fund
- [ ] Verify loading spinner appears
- [ ] After 1 second, check results show:
  - Fund name as heading
  - Fundamental score (X.X/10)
  - Recommendation badge (color-coded)
  - Summary paragraph
  - Strengths section with 3-5 bullet points
  - Weaknesses section with 2-4 bullet points
- [ ] Try another fund name (e.g., "FMETF")
- [ ] Verify different results appear

### Content Repository
- [ ] Navigate to /content
- [ ] Verify 8 content items display
- [ ] Check mix of Books, Videos, Articles
- [ ] Click "Books" filter button
- [ ] Verify only books show
- [ ] Click "Videos" filter
- [ ] Verify only videos show
- [ ] Click "Articles" filter
- [ ] Verify only articles show
- [ ] Click "All" filter
- [ ] Verify all 8 items return
- [ ] Click any "View Resource" button
- [ ] Verify link opens (may be placeholder)

### Settings Page
- [ ] Navigate to /settings
- [ ] Toggle dev mode OFF
- [ ] Verify DEV badge disappears from header
- [ ] Toggle dev mode ON
- [ ] Verify DEV badge appears
- [ ] Check environment information shows
- [ ] Click "Clear localStorage" button
- [ ] Confirm dialog appears
- [ ] Click OK
- [ ] Verify page redirects to home

### Mobile Responsiveness (375px width)
- [ ] Open browser DevTools (F12)
- [ ] Toggle device mode (Ctrl+Shift+M)
- [ ] Set to iPhone SE or 375px width
- [ ] Navigate to home page
- [ ] Verify hamburger menu appears (3 lines icon)
- [ ] Click hamburger menu
- [ ] Verify menu opens with all links
- [ ] Click each nav link
- [ ] Verify content stacks vertically
- [ ] Test login form
  - Check input fields are at least 16px font
  - Verify button is at least 44px tall
  - Try tapping all inputs
- [ ] Test quiz page
  - Verify sections display well
  - Check all buttons are tappable
- [ ] Test fund analysis page
  - Verify form is usable
  - Check results card layout
- [ ] Test content page
  - Verify cards stack on mobile
  - Check filter buttons work
- [ ] Test settings page
  - Verify toggle switch is tappable
  - Check all buttons work

### Navigation Links
- [ ] Test home page card links (Quiz, Funds, Learn)
- [ ] Test header navigation on all pages
- [ ] Test dashboard quick action cards
- [ ] Verify all links go to correct pages
- [ ] Test back button works on all pages

### Error Handling
- [ ] Try accessing /quiz without login
- [ ] Verify redirect to /login
- [ ] Try accessing /dashboard without login
- [ ] Verify redirect to /login
- [ ] Try submitting empty forms
- [ ] Verify error messages display

## Next Steps (Phase 2 - Future Development)

### 1. AI Integration
- [ ] Connect OpenAI or Anthropic API
- [ ] Update `/api/analyze-user/route.ts` with real AI calls
- [ ] Update `/api/analyze-fund/route.ts` with real AI calls
- [ ] Add streaming responses for better UX
- [ ] Implement rate limiting and caching

### 2. Database Integration
- [ ] Set up Supabase tables:
  - `content` table for dynamic content items
  - `user_analyses` table to persist quiz results
  - `fund_analyses` table to cache fund analysis
  - `user_favorites` table for saved funds
- [ ] Update content page to fetch from database
- [ ] Store quiz results in database instead of localStorage
- [ ] Add admin panel to manage content

### 3. Additional Features
- [ ] Portfolio tracker
- [ ] Investment calculator
- [ ] Community discussion forum
- [ ] Push notifications for market updates
- [ ] Email newsletter integration
- [ ] Social sharing for quiz results
- [ ] PDF export of analysis results
- [ ] Multi-language support (English/Tagalog)

## Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Troubleshooting

### Dev Mode Not Working
1. Clear browser cache and localStorage
2. Go to /settings and toggle dev mode
3. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
4. Check browser console for errors

### Authentication Issues
- **In Dev Mode**: Any email/password will work
- **In Production Mode**: Requires valid Supabase credentials in `.env.local`
- Make sure you've enabled dev mode in /settings for testing

### Quiz Results Not Showing
1. Complete all 3 sections of the quiz
2. Make sure you clicked Submit on section 3
3. Check browser localStorage for 'userAnalysis' key
4. If missing, retake the quiz

### Fund Analysis Not Working
1. Make sure dev mode is enabled
2. Enter a fund name (any text works in dev mode)
3. Check browser console for errors
4. Try refreshing the page

### Mobile Menu Not Appearing
1. Resize browser to less than 768px width
2. Use browser DevTools device mode
3. Clear cache and hard refresh
4. Check that JavaScript is enabled

### Page Styling Issues
1. Make sure Tailwind CSS is properly installed
2. Run `npm install` to reinstall dependencies
3. Restart the dev server
4. Check `tailwind.config.ts` is properly configured

## Key Features Breakdown

### 1. Fund Analysis Tool
**Location**: `/app/fund-analysis/page.tsx`

**What it does**:
- Accepts fund name input
- Shows loading state while analyzing
- Displays results in clean card layout with:
  - Fundamental score (1-10)
  - Investment recommendation (Strong Buy/Buy/Hold/Avoid)
  - Summary paragraph
  - 3-5 strengths
  - 2-4 weaknesses

**Mock Function**: `lib/mockFundAnalysis.ts`
- Generates deterministic but random-looking results
- Uses fund name as seed for consistency

### 2. User Analysis Quiz
**Location**: `/app/quiz/page.tsx`

**What it does**:
- 3-step progressive form
- Section 1: Occupation
- Section 2: Financial snapshot (income, expenses, bank account)
- Section 3: Essay response
- Stores results in localStorage
- Redirects to dashboard with analysis

**Mock Function**: `lib/mockAnalysis.ts`
- Calculates savings rate
- Determines user type and risk profile
- Generates 3-5 personalized recommendations

### 3. Content Repository
**Location**: `/app/content/page.tsx`

**What it does**:
- Displays 8 hardcoded content items
- Filter by: All, Books, Videos, Articles
- Each item has: title, author, description, external link
- Grid layout, responsive design

### 4. Settings Page
**Location**: `/app/settings/page.tsx`

**What it does**:
- Toggle switch for dev mode
- Shows current dev mode status
- Lists mock data being used
- Clear localStorage button
- Environment information display
- Logout functionality

## Supabase Setup Instructions

### Option 1: Development Mode (Recommended for Testing)

The app is configured to work with mock authentication by default. You can start developing immediately without setting up Supabase:

1. Keep `NEXT_PUBLIC_DEV_MODE=true` in your `.env.local`
2. Any email/password combination will work for login/signup
3. User data is stored in browser localStorage

### Option 2: Production Mode with Supabase

To use real Supabase authentication:

#### Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `finance-app-mvp` (or any name you prefer)
   - Database Password: Create a strong password (save this!)
   - Region: Choose the closest to your location
5. Click "Create new project" and wait for setup to complete

#### Step 2: Get Your API Credentials

1. Once your project is ready, go to **Settings** (gear icon in sidebar)
2. Navigate to **API** section
3. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

#### Step 3: Update Environment Variables

1. Open `.env.local` in your project
2. Replace the placeholder values:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   NEXT_PUBLIC_DEV_MODE=false
   ```
3. Save the file and restart your dev server

#### Step 4: Configure Authentication (Optional)

Supabase Auth works out of the box! No database tables needed. However, you can customize:

1. Go to **Authentication** > **Providers** in your Supabase dashboard
2. Configure email settings:
   - Enable "Enable email confirmations" if you want email verification
   - Or disable it for faster testing
3. You can also enable social providers (Google, GitHub, etc.) later

#### Step 5: Test Your Setup

1. Go to `/signup` and create a new account
2. Check **Authentication** > **Users** in Supabase dashboard to see your user
3. All user management is handled automatically by Supabase!

### Database Schema (Future)

For now, authentication uses Supabase's built-in `auth.users` table. When you're ready to add features like quiz results or fund analysis, you can create additional tables:

```sql
-- Example: Quiz results table (create this later when needed)
create table quiz_results (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  answers jsonb not null,
  analysis text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Example: Fund favorites table
create table fund_favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  fund_id text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

You can create these tables in **SQL Editor** in your Supabase dashboard when ready.

## Notes

- The app is configured for mobile-responsive design
- Authentication works in both dev mode (mock) and production mode (Supabase)
- Basic layout (header/footer) is ready
- Supabase client is configured and ready to use
- TypeScript types are defined for core features
