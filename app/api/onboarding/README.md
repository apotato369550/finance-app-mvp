# Onboarding API Endpoints

This directory contains the API endpoints for the onboarding flow.

## Endpoints

### GET /api/onboarding/questions
Returns the full list of onboarding questions with user's progress.

**Authentication:** Required
**Response:**
```json
{
  "questions": [...],
  "answered_count": 5,
  "total_count": 14,
  "completion_percentage": 36
}
```

### POST /api/onboarding/answer
Saves an individual answer to a question.

**Authentication:** Required
**Body:**
```json
{
  "question_id": "spending_100k",
  "response_value": "I would invest in stocks and save some"
}
```

**Response:**
```json
{
  "success": true,
  "completion_percentage": 36,
  "next_question_id": null
}
```

### GET /api/onboarding/status
Returns the current user's onboarding status.

**Authentication:** Required
**Response:**
```json
{
  "completed": false,
  "skipped": false,
  "completion_percentage": 36,
  "profile_exists": false
}
```

### POST /api/onboarding/skip
Marks onboarding as skipped for the user.

**Authentication:** Required
**Response:**
```json
{
  "success": true,
  "message": "Onboarding skipped successfully"
}
```

### POST /api/onboarding/complete
Marks onboarding as completed and triggers profile generation.

**Authentication:** Required
**Response:**
```json
{
  "success": true,
  "message": "Onboarding completed successfully"
}
```

## Authentication

All endpoints require authentication. In development mode, pass the mock user as a Bearer token in the Authorization header:

```
Authorization: Bearer {"id": "mock-user-id", "email": "user@example.com", ...}
```

In production mode, use Supabase auth tokens.

## Testing Instructions

### Development Mode Testing

1. **Test questions endpoint:**
   ```bash
   curl -X GET http://localhost:3000/api/onboarding/questions \
     -H "Authorization: Bearer {\"id\":\"mock-user-123\",\"email\":\"test@example.com\"}"
   ```

2. **Test answer endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/onboarding/answer \
     -H "Authorization: Bearer {\"id\":\"mock-user-123\",\"email\":\"test@example.com\"}" \
     -H "Content-Type: application/json" \
     -d '{"question_id": "spending_100k", "response_value": "Test response"}'
   ```

3. **Test status endpoint:**
   ```bash
   curl -X GET http://localhost:3000/api/onboarding/status \
     -H "Authorization: Bearer {\"id\":\"mock-user-123\",\"email\":\"test@example.com\"}"
   ```

4. **Test skip endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/onboarding/skip \
     -H "Authorization: Bearer {\"id\":\"mock-user-123\",\"email\":\"test@example.com\"}"
   ```

5. **Test complete endpoint:**
   ```bash
   curl -X POST http://localhost:3000/api/onboarding/complete \
     -H "Authorization: Bearer {\"id\":\"mock-user-123\",\"email\":\"test@example.com\"}"
   ```

### Production Mode Testing

Replace the Authorization header with a valid Supabase JWT token:

```bash
curl -X GET http://localhost:3000/api/onboarding/questions \
  -H "Authorization: Bearer YOUR_SUPABASE_JWT_TOKEN"
```

## Error Responses

All endpoints return appropriate HTTP status codes:

- `200`: Success
- `400`: Bad request (missing required fields, invalid question_id)
- `401`: Authentication required
- `500`: Internal server error

Error response format:
```json
{
  "error": "Error message"
}
```

## Database Integration

In production mode, these endpoints interact with:

- `onboarding_response` table: Stores individual question responses
- `onboarding_profile` table: Stores completion status and generated profiles
- `profiles` table: Stores user-level onboarding flags

In development mode, responses are logged but not persisted to the database.