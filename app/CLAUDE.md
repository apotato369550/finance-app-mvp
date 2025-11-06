# /app - Next.js Application Directory

## Purpose
Contains all Next.js 14 App Router pages, layouts, and API routes. This is the main application directory following Next.js conventions.

## Structure Overview

**Pages (Routes):**
- `page.tsx` - Landing/home page
- `layout.tsx` - Root layout with global providers and styles
- `globals.css` - Global Tailwind CSS styles

**Route Groups:**
- `/dashboard` - Main user dashboard after login
- `/onboarding` - Multi-step onboarding quiz flow
- `/quiz` - Quiz interface pages
- `/profile` - User profile and analysis results
- `/settings` - User account settings
- `/content` - Educational content library
- `/fund-analysis` - Investment fund analysis tools
- `/login` - Authentication login page
- `/signup` - New user registration

**API Routes:**
- `/api` - All backend API endpoints (see app/api/CLAUDE.md)

## Key Patterns

**File Conventions:**
- `page.tsx` - Route pages (publicly accessible)
- `layout.tsx` - Shared layouts for route segments
- `loading.tsx` - Loading states (if needed)
- `error.tsx` - Error boundaries (if needed)

**Server vs Client Components:**
- Default to Server Components for better performance
- Use `'use client'` directive only when needed (interactivity, hooks, browser APIs)
- Keep client components small and focused

**Routing:**
- File-system based routing (folders = routes)
- Dynamic routes use [param] syntax
- Route groups use (name) syntax (don't affect URL)

## Authentication Flow
- Unauthenticated users land on home page
- Login/signup handle authentication
- Dashboard requires authenticated user
- Auth state managed via lib/auth-context.tsx

## Common Tasks

**Adding a new page:**
1. Create folder with page.tsx inside
2. Export default React component
3. Add navigation link in components/Header.tsx if needed
4. Update CHANGELOG.md

**Modifying layout:**
- Edit layout.tsx for global changes
- Create layout.tsx in route folder for segment-specific layout

**Adding API endpoint:**
- See app/api/CLAUDE.md for API-specific guidance

## Gotchas
- All components are Server Components by default (no useState/useEffect without 'use client')
- Async Server Components are supported (can await data)
- Client Components can't import Server Components (but can accept as children)
- Metadata export only works in Server Components and layout/page files

## Related Files
- Root: `/CLAUDE.md` - Project overview and standards
- API: `/app/api/CLAUDE.md` - API endpoint patterns
- Components: `/components/CLAUDE.md` - Shared component library
- Lib: `/lib/CLAUDE.md` - Utility functions and context

**Remember:** Update CHANGELOG.md after making changes in this directory.
