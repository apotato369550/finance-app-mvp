-- Fix the trigger function to use 'last_updated' instead of 'updated_at'
-- for the onboarding_profile table

-- Drop the existing trigger
DROP TRIGGER IF EXISTS update_onboarding_profile_updated_at ON onboarding_profile;

-- Create a new trigger function specifically for onboarding_profile
CREATE OR REPLACE FUNCTION update_onboarding_profile_last_updated()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger using the new function
CREATE TRIGGER update_onboarding_profile_last_updated
    BEFORE UPDATE ON onboarding_profile
    FOR EACH ROW EXECUTE FUNCTION update_onboarding_profile_last_updated();
