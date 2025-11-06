# /components - Shared React Components

## Purpose
Contains reusable React components used across multiple pages in the application. These are primarily layout and navigation components.

## Current Components

**Header.tsx**
- Main navigation header with logo and menu
- Responsive design (mobile hamburger menu, desktop navigation)
- Authentication-aware (shows different options for logged in/out users)
- Links to: Dashboard, Content, Fund Analysis, Profile, Settings
- Sign out functionality

**Footer.tsx**
- Simple footer with copyright and legal links
- Consistent branding
- Responsive layout

## Component Patterns

**Default to Server Components:**
- Most components should be Server Components unless they need:
  - State management (useState, useReducer)
  - Browser APIs (window, document)
  - Event handlers (onClick, onChange)
  - Lifecycle hooks (useEffect)
  - React Context (useContext)

**When to use 'use client':**
- Interactive elements (buttons with handlers, forms with validation)
- Components using React hooks
- Components consuming Context (e.g., useAuth from auth-context)

**TypeScript:**
- Always define prop interfaces
- Export interfaces for reusability
- Use explicit return types for clarity

**Styling:**
- Use Tailwind CSS utility classes
- Responsive design: mobile-first, use breakpoints (sm:, md:, lg:)
- Consistent spacing and colors from globals.css

## Common Tasks

**Adding a new component:**
1. Create [ComponentName].tsx in this directory
2. Define props interface
3. Implement component (Server Component by default)
4. Add 'use client' only if needed
5. Export default component
6. Import in pages that need it
7. Update this CLAUDE.md
8. Update CHANGELOG.md

**Modifying Header:**
- Add/remove navigation items
- Update authentication logic
- Change responsive breakpoints
- Maintain mobile menu functionality

**Creating a reusable UI component:**
- Keep it generic and flexible via props
- Don't hardcode data or business logic
- Make it composable
- Document props with TypeScript

## Component Guidelines

**Naming:**
- PascalCase for component files (Header.tsx)
- Descriptive names (not generic like Button.tsx unless truly generic)

**Structure:**
```
interface Props {
  // prop definitions
}

export default function ComponentName({ props }: Props) {
  // component logic
  return (...)
}
```

**Props:**
- Use destructuring in parameters
- Provide default values when appropriate
- Keep prop interfaces exported for documentation

**Accessibility:**
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test responsive design

## Gotchas
- Header uses auth context (Client Component)
- Don't import Server Components into Client Components
- Be mindful of bundle size (Client Components increase JS sent to browser)
- Test components in both authenticated and unauthenticated states

## Related Files
- Pages: `/app/` - Consumers of these components
- Layout: `/app/layout.tsx` - Global layout using these components
- Auth Context: `/lib/auth-context.tsx` - Authentication state
- Styles: `/app/globals.css` - Global Tailwind configuration

**Remember:** Update CHANGELOG.md after adding or modifying shared components.
