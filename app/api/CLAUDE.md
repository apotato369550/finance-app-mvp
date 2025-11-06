# /app/api - Backend API Routes

## Purpose
Contains all Next.js API route handlers. These endpoints serve as the backend for the application, handling data operations, authentication, and business logic.

## Structure Overview

**Endpoint Groups:**
- `/onboarding` - Onboarding quiz flow endpoints (questions, answers, status, complete, skip)
- `/profile` - User profile management and retrieval
- `/analyze-user` - Personalized user financial analysis
- `/analyze-profile` - Profile-based recommendations
- `/analyze-fund` - Investment fund analysis tools

## Key Patterns

**Dual-Mode Architecture:**
All API endpoints support two modes:
1. **Mock Mode** (Development)
   - No database required
   - Mock data from lib/mock*.ts files
   - Simulated authentication via headers
   - Fast iteration

2. **Production Mode**
   - Real Supabase database
   - JWT authentication validation
   - Persistent data storage

**Mode Detection:**
Check for Supabase credentials in environment variables. If missing, automatically fall back to mock mode.

**Standard API Response Format:**
```
Success: { success: true, data: {...} }
Error: { error: "Message" } with appropriate HTTP status
```

**HTTP Status Codes:**
- 200: Success
- 201: Created
- 400: Bad request (validation errors)
- 401: Unauthorized
- 500: Server error

## Authentication Pattern

**In Production:**
- Extract JWT from Authorization header
- Validate with Supabase
- Get user ID from validated token

**In Mock Mode:**
- Read x-mock-user-id header
- Default to mock user if not provided
- Skip JWT validation

## Common Tasks

**Adding a new endpoint:**
1. Create folder under /app/api/[endpoint-name]
2. Create route.ts with GET/POST/etc. handlers
3. Implement dual-mode logic (check examples in /onboarding)
4. Validate inputs, handle errors
5. Return consistent response format
6. Test both mock and production modes
7. Update this CLAUDE.md if adding new category
8. Update CHANGELOG.md

**Standard Endpoint Template:**
- Import auth utilities from lib/auth-utils.ts
- Check mode (mock vs prod)
- Validate request body/params
- Handle authentication
- Process business logic
- Return formatted response

## Security Considerations
- Always validate and sanitize inputs
- Use parameterized queries (prevent SQL injection)
- Validate user permissions before data access
- Return appropriate error messages (don't leak system details)
- Rate limiting (if needed for production)

## Testing
- Test with mock data first (faster iteration)
- Verify authentication works in both modes
- Check error handling for edge cases
- Validate response formats match expectations

## Related Files
- Auth: `/lib/auth-utils.ts` - Authentication helpers
- Mock Data: `/lib/mock*.ts` - Development mock data
- Types: `/types/` - TypeScript interfaces
- Database: `/supabase/migrations/` - Schema definitions

**Remember:** Update CHANGELOG.md after adding or modifying API endpoints.
