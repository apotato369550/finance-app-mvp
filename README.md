# FinanceEd PH - Personal Finance Education MVP

A mobile-responsive Filipino personal finance education platform built with Next.js, React, Supabase, and Tailwind CSS.

## Features

- AI user analysis quiz
- Fund analysis tool
- Curated content repository
- Development mode with mock responses

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **UI**: React

## Project Structure

```
finance-app-mvp/
├── app/                  # Next.js app router pages
│   ├── layout.tsx       # Root layout with Header/Footer
│   ├── page.tsx         # Home page
│   ├── login/           # Login page
│   ├── signup/          # Signup page
│   ├── dashboard/       # Protected dashboard page
│   └── globals.css      # Global styles with Tailwind
├── components/          # React components
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
├── lib/                 # Utilities
│   ├── supabase.ts      # Supabase client setup
│   └── auth-context.tsx # Authentication context provider
├── types/               # TypeScript type definitions
│   └── index.ts         # Common types
└── .env.local          # Environment variables
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and update the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_DEV_MODE=true
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development Mode

The app includes a `DEV_MODE` environment variable that toggles between mock data and real API calls:

- `NEXT_PUBLIC_DEV_MODE=true` - Use mock responses (default)
- `NEXT_PUBLIC_DEV_MODE=false` - Use real Supabase API

## Available Routes

- `/` - Home page with feature overview
- `/login` - User login page
- `/signup` - User signup page
- `/dashboard` - Protected dashboard (requires authentication)
- `/quiz` - AI user analysis quiz (to be implemented)
- `/funds` - Fund analysis tool (to be implemented)
- `/learn` - Curated content repository (to be implemented)

## Next Steps

1. Implement the quiz feature with questions and mock AI responses
2. Create the fund analysis tool
3. Build the learning content repository
4. Set up Supabase database schema
5. Integrate AI for quiz analysis

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run linting

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
