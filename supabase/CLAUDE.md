# /supabase - Database Schema and Migrations

## Purpose
Contains database migration files for Supabase (PostgreSQL). Migrations define the database schema, tables, indexes, and Row Level Security (RLS) policies.

## Structure

**/migrations** - SQL migration files in chronological order

**Current Migrations:**
- `20241024160000_create_onboarding_tables.sql` - Initial onboarding schema
- `20241024160100_add_onboarding_to_profiles.sql` - Profile onboarding flags

## Database Schema

**Tables:**

**`profiles`**
- User metadata and flags
- `user_id` (UUID, primary key, references auth.users)
- `has_completed_onboarding` (boolean)
- Created automatically on user signup

**`onboarding_response`**
- Individual quiz question answers
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to auth.users)
- `question_id` (text)
- `answer` (text or jsonb)
- `category` (text: mindset/behavior/numbers/goals)
- `created_at` (timestamp)

**`onboarding_profile`**
- Quiz completion status and generated profiles
- `id` (UUID, primary key)
- `user_id` (UUID, foreign key to auth.users, unique)
- `completed` (boolean)
- `skipped` (boolean)
- `completion_date` (timestamp)
- `generated_profile` (jsonb) - Analysis results
- `created_at`, `updated_at` (timestamps)

## Migration Patterns

**Naming Convention:**
`[timestamp]_[descriptive_name].sql`

Example: `20241024160000_create_onboarding_tables.sql`

**Migration Structure:**
1. Create tables with proper types
2. Add foreign key constraints
3. Create indexes on frequently queried columns
4. Set up Row Level Security (RLS) policies
5. Grant appropriate permissions

**RLS Policies:**
- Users can only access their own data
- Pattern: `auth.uid() = user_id`
- Separate policies for SELECT, INSERT, UPDATE, DELETE

## Common Tasks

**Creating a new migration:**
1. Generate timestamp: `date +%Y%m%d%H%M%S`
2. Create file: `[timestamp]_description.sql`
3. Write SQL:
   - Create or alter tables
   - Add indexes
   - Set up RLS policies
   - Grant permissions
4. Test in Supabase dashboard or local instance
5. Document in this CLAUDE.md if major schema change
6. Update CHANGELOG.md

**Adding a new table:**
```sql
CREATE TABLE table_name (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ...
);

-- Add RLS
ALTER TABLE table_name ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own data"
ON table_name FOR SELECT
USING (auth.uid() = user_id);

-- Add index
CREATE INDEX idx_table_user ON table_name(user_id);
```

**Modifying existing table:**
- Create new migration (don't edit old ones)
- Use ALTER TABLE statements
- Handle data migration if needed
- Update RLS policies if access patterns change

## Best Practices

**Schema Design:**
- Use UUIDs for primary keys
- Reference `auth.users(id)` for user relationships
- Add `ON DELETE CASCADE` for cleanup
- Use appropriate PostgreSQL types (TIMESTAMPTZ, JSONB, etc.)
- Add timestamps (created_at, updated_at)

**Indexes:**
- Index foreign keys
- Index columns used in WHERE clauses
- Index columns used in JOINs
- Don't over-index (slows writes)

**RLS Security:**
- Enable RLS on all user data tables
- Create specific policies for each operation (SELECT/INSERT/UPDATE/DELETE)
- Test policies thoroughly
- Default deny, explicitly allow

**JSONB Usage:**
- Good for flexible data (generated_profile, analysis results)
- Can query with `->` and `->>` operators
- Can index with GIN indexes if needed

## Production Considerations

**Running Migrations:**
- Use Supabase CLI or Dashboard
- Migrations run in order (timestamp-based)
- Migrations are idempotent (safe to re-run)
- Test migrations on staging before production

**Rollback Strategy:**
- Create down migrations if needed
- Backup data before major schema changes
- Have rollback plan for production

## Gotchas
- RLS policies must be explicitly created (tables are locked down by default)
- `auth.uid()` only works in RLS policies (returns current user's UUID)
- Foreign key constraints prevent orphaned data
- Migrations can't be edited after deployment (create new migration)
- JSONB is powerful but queries are different from regular columns

## Related Files
- API Routes: `/app/api/` - Query these tables
- Types: `/types/` - TypeScript interfaces matching schema
- Auth Utils: `/lib/auth-utils.ts` - User authentication
- Root: `/CLAUDE.md` - Database best practices

**Remember:** Update CHANGELOG.md after adding or modifying database schema.
