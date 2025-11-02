# FinanceEd PH - Personal Finance Education Platform MVP

## Vision & Goals

FinanceEd PH is a Filipino-focused personal finance education platform designed to improve financial literacy through:

- Personalized financial analysis and recommendations
- Curated educational content tailored to Filipino context
- Interactive fund analysis tools
- Accessible, mobile-first user experience

**Success Criteria:**
- Users complete onboarding quiz and receive personalized recommendations
- Users engage with curated educational content
- Platform works seamlessly in both mock (dev) and production modes
- Mobile-responsive design provides excellent UX on all devices

## Core Context

**Target Audience:** Filipino users seeking to improve financial literacy and make informed investment decisions.

**Development Philosophy:**
- Build an MVP with core features first
- Prioritize user experience and accessibility
- Support dual-mode architecture for rapid development and testing
- Follow modern web development best practices

**Key Technical Decisions:**
- Next.js 14 with App Router for modern React patterns and performance
- TypeScript for type safety and better developer experience
- Supabase for authentication and data persistence
- Tailwind CSS for rapid UI development and responsive design
- Mock mode for local development without database dependencies

## Architectural Principles

### Tech Stack
- **Framework:** Next.js 14 (App Router, Server Components, API Routes)
- **Language:** TypeScript (strict mode enabled)
- **UI:** React 18, Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth with mock mode fallback

### Dual-Mode Architecture

**Development Mode (Mock):**
- Uses mock data and simulated authentication
- No database connection required
- Rapid iteration and testing
- Mock user object passed via headers

**Production Mode:**
- Real Supabase authentication and database
- Proper JWT validation
- Data persistence to PostgreSQL

**Mode Detection:**
- Check for Supabase credentials in environment
- Graceful fallback to mock mode if credentials missing
- Clear logging of current mode in console

### Project Structure
```
/app                    # Next.js app directory
  /api                  # API route handlers
    /onboarding         # Onboarding quiz endpoints
  /(pages)              # Page routes
/lib                    # Shared utilities and configuration
  auth-utils.ts         # Authentication helpers
  onboarding-questions.ts # Quiz configuration
/supabase               # Database schema and migrations
  /migrations           # SQL migration files
/components             # React components
/public                 # Static assets
```

### Code Quality Standards

**TypeScript:**
- Use explicit types, avoid `any`
- Leverage interfaces for data structures
- Use type guards for runtime validation

**API Routes:**
- Validate all inputs
- Handle authentication consistently
- Return proper HTTP status codes
- Provide clear error messages
- Support both dev and prod modes

**Components:**
- Functional components with hooks
- Server Components by default, Client Components when needed
- Props typing with TypeScript interfaces
- Responsive design with Tailwind

**Database:**
- Use migrations for schema changes
- Follow Supabase best practices
- Index frequently queried columns
- Use RLS (Row Level Security) in production

### Current Features

**Onboarding Quiz:**
- 14 questions across 4 categories (mindset, behavior, numbers, goals)
- Progress tracking and completion percentage
- Ability to skip or complete
- API endpoints for questions, answers, status, skip, complete

**Authentication:**
- Mock mode for development
- Supabase Auth for production
- Utility functions in lib/auth-utils.ts

**Database Schema:**
- `onboarding_response` - Individual question answers
- `onboarding_profile` - Completion status and generated profiles
- `profiles` - User-level flags and metadata

## Agent Coordination Notes

**Working with this Project:**

1. **Check Mode:** Always verify if working in dev (mock) or production mode
2. **Read READMEs:** Check app/api/onboarding/README.md and lib/README-onboarding.md for context
3. **Follow Patterns:** Use existing code patterns for consistency
4. **Test Both Modes:** Ensure changes work in both mock and production modes
5. **Document Changes:** Keep READMEs updated if APIs or structures change

**Common Tasks:**

- **Adding API Endpoint:** Follow pattern in app/api/onboarding/, support both modes
- **Database Changes:** Create migration in supabase/migrations/, update types
- **New Components:** Place in /components, use TypeScript, make responsive
- **Utility Functions:** Add to appropriate file in /lib

**Quality Checks:**

- TypeScript compiles without errors
- API endpoints return proper status codes
- Authentication works in both modes
- Mobile responsive design verified
- Error handling implemented

**File Organization:**

- Keep API-related READMEs in app/api/
- Keep lib-related READMEs in lib/
- Use descriptive file names
- Group related functionality together
