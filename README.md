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
│   └── globals.css      # Global styles with Tailwind
├── components/          # React components
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
├── lib/                 # Utilities
│   └── supabase.ts      # Supabase client setup
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

## Notes

- The app is configured for mobile-responsive design
- Basic layout (header/footer) is ready
- Supabase client is configured and ready to use
- TypeScript types are defined for core features
