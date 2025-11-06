# /lib - Shared Utilities and Configuration

## Purpose
Contains reusable utility functions, configuration files, React contexts, and helper modules used throughout the application.

## Key Files

**Authentication:**
- `auth-utils.ts` - Authentication helper functions for both mock and production modes
- `auth-context.tsx` - React Context for managing authentication state globally
- `supabase.ts` - Supabase client initialization and configuration

**Onboarding:**
- `onboarding-questions.ts` - Complete quiz question configuration (14 questions, 4 categories)
- `profileAnalyzer.ts` - Analyzes completed quiz responses to generate personalized recommendations

**Mock Data (Development):**
- `mockAnalysis.ts` - Mock user analysis data for development
- `mockFundAnalysis.ts` - Mock investment fund analysis data for development

## Key Patterns

**Dual-Mode Support:**
Most utilities support both development (mock) and production modes:
- Check for environment variables (Supabase credentials)
- Gracefully degrade to mock data if unavailable
- Log current mode for debugging

**Authentication Pattern:**
Functions in auth-utils.ts handle:
- Extracting user info from JWT tokens (production)
- Reading mock user from headers (development)
- Consistent user object shape regardless of mode

**Configuration Files:**
- Export constant objects (not classes)
- Use TypeScript interfaces for type safety
- Keep configuration separate from logic

## Common Tasks

**Adding a utility function:**
1. Determine appropriate file (or create new if unrelated)
2. Export function with clear TypeScript types
3. Document with JSDoc comments
4. Import and use in relevant components/routes
5. Update this CLAUDE.md if new file created
6. Update CHANGELOG.md

**Adding mock data:**
1. Create or edit mock*.ts file
2. Export data matching production shape
3. Use TypeScript interfaces from /types
4. Reference in API routes for dev mode

**Creating a context:**
1. Create [name]-context.tsx
2. Export Provider and custom hook (e.g., useAuth)
3. Wrap app in layout.tsx if global
4. Document usage pattern in this file

## Authentication Context Usage

**Provider:** Wraps entire app in app/layout.tsx
**Hook:** `useAuth()` returns `{ user, loading, signIn, signOut }`
**Pattern:** Client Components can access auth state without prop drilling

## Profile Analyzer

Analyzes onboarding responses to generate:
- Risk tolerance assessment
- Investment strategy recommendations
- Personalized educational content suggestions
- Financial health score

**Input:** User's quiz answers (all 14 questions)
**Output:** Structured analysis object with recommendations

## Gotchas
- auth-context.tsx is a Client Component ('use client')
- Contexts can't be used in Server Components directly
- Mock data should match production data shape exactly
- Always handle missing environment variables gracefully

## File Organization
- Keep related utilities together
- Use descriptive file names (e.g., onboarding-questions.ts not questions.ts)
- Export multiple related functions from same file when logical
- Separate concerns (auth separate from onboarding separate from mock data)

## Related Files
- API Routes: `/app/api/` - Consumers of these utilities
- Types: `/types/` - TypeScript interfaces used here
- Root Config: `/CLAUDE.md` - Project-wide standards

**Remember:** Update CHANGELOG.md after adding or modifying utility functions.
