# /app/api/onboarding - Onboarding Quiz API

## Purpose
Handles the complete onboarding quiz flow including questions delivery, answer collection, progress tracking, and completion management.

## Endpoints

**GET /api/onboarding/questions**
- Returns all quiz questions
- Mock: Returns questions from lib/onboarding-questions.ts
- Production: Returns questions from database or config

**POST /api/onboarding/answer**
- Saves user's answer to a question
- Body: `{ questionId, answer, category }`
- Updates progress in database (prod) or mock state (dev)

**GET /api/onboarding/status**
- Returns user's quiz progress
- Shows answered questions count, total, completion percentage
- Indicates if quiz is completed

**POST /api/onboarding/complete**
- Marks quiz as completed
- Triggers profile analysis
- Generates personalized recommendations

**POST /api/onboarding/skip**
- Allows user to skip quiz
- Marks onboarding as skipped in user profile

**POST /api/onboarding/reset**
- Resets user's onboarding progress
- Clears all answers and completion status
- Useful for retaking the quiz

**POST /api/onboarding/privacy-consent**
- Records user's privacy consent
- Required before quiz starts

## Quiz Structure

**Categories:**
1. `mindset` - Financial mindset and attitudes
2. `behavior` - Spending and saving behaviors
3. `numbers` - Income, expenses, and financial metrics
4. `goals` - Financial goals and timeline

**Question Configuration:**
- Defined in lib/onboarding-questions.ts
- 14 total questions across 4 categories
- Each question has: id, category, question text, answer type

## Data Flow

**Quiz Start:**
1. User consents to privacy (POST /privacy-consent)
2. Frontend fetches questions (GET /questions)
3. User sees first question

**Answering Questions:**
1. User submits answer (POST /answer)
2. Backend saves answer to database
3. Frontend fetches status (GET /status) to update progress UI
4. Process repeats for each question

**Completion:**
1. User answers all questions or clicks complete
2. Frontend calls POST /complete
3. Backend marks as complete, generates profile
4. User redirected to dashboard with recommendations

## Mock vs Production Behavior

**Mock Mode:**
- Questions from lib/onboarding-questions.ts (static)
- Answers stored in memory (cleared on restart)
- Status calculated from in-memory state
- No persistence

**Production Mode:**
- Questions from config or database
- Answers stored in `onboarding_response` table
- Status from `onboarding_profile` table
- Full persistence with Supabase

## Database Schema

**Tables Used:**
- `onboarding_response` - Individual answers (user_id, question_id, answer, category)
- `onboarding_profile` - Completion status (user_id, completed, skipped, completion_date)
- `profiles` - User flags (has_completed_onboarding)

## Common Modifications

**Adding a question:**
1. Edit lib/onboarding-questions.ts
2. Add to appropriate category
3. Update total question count if needed
4. No backend changes required (questions are config-driven)

**Changing logic:**
1. Edit respective endpoint's route.ts
2. Maintain dual-mode support
3. Test in both modes
4. Update this file if behavior changes significantly

## Error Handling
- Validation errors return 400
- Missing user/auth returns 401
- Server errors return 500 with message
- All errors logged for debugging

## Related Files
- Questions Config: `/lib/onboarding-questions.ts`
- Auth Utils: `/lib/auth-utils.ts`
- Profile Analyzer: `/lib/profileAnalyzer.ts`
- Database Migrations: `/supabase/migrations/`

**Remember:** Update CHANGELOG.md after modifying onboarding logic or adding endpoints.
