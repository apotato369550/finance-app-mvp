-- Create onboarding_response table
CREATE TABLE IF NOT EXISTS onboarding_response (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    question_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    response_type TEXT NOT NULL CHECK (response_type IN ('text', 'number', 'choice', 'scale')),
    response_value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create onboarding_profile table
CREATE TABLE IF NOT EXISTS onboarding_profile (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    completion_percentage INTEGER NOT NULL DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    personality_type TEXT,
    profile_summary TEXT,
    strengths JSONB,
    growth_areas JSONB,
    money_mindset TEXT,
    recommendations JSONB,
    generated_at TIMESTAMP WITH TIME ZONE,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add onboarding fields to existing profiles table (if it exists)
-- Note: If you have a custom profiles table, uncomment and modify the following:
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT FALSE;
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS onboarding_skipped BOOLEAN DEFAULT FALSE;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_onboarding_response_user_id ON onboarding_response(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_response_question_id ON onboarding_response(question_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_profile_user_id ON onboarding_profile(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_profile_completion_percentage ON onboarding_profile(completion_percentage);

-- Enable Row Level Security (RLS)
ALTER TABLE onboarding_response ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_profile ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own onboarding responses" ON onboarding_response
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding responses" ON onboarding_response
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding responses" ON onboarding_response
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own onboarding responses" ON onboarding_response
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own onboarding profile" ON onboarding_profile
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own onboarding profile" ON onboarding_profile
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own onboarding profile" ON onboarding_profile
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own onboarding profile" ON onboarding_profile
    FOR DELETE USING (auth.uid() = user_id);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_onboarding_response_updated_at
    BEFORE UPDATE ON onboarding_response
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_onboarding_profile_updated_at
    BEFORE UPDATE ON onboarding_profile
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();