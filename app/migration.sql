-- ==========================================
-- 1. Payment System Schema
-- ==========================================

-- Create payment_settings table to store Admin wallet addresses
CREATE TABLE IF NOT EXISTS payment_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE payment_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read payment settings (needed for Checkout page)
-- Note: In a stricter env, you might restrict this to authenticated users only.
CREATE POLICY "Public can read payment settings" ON payment_settings
  FOR SELECT
  TO public
  USING (true);

-- Update orders table to support Crypto/Gift Card flows
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_method TEXT, -- 'card', 'crypto', 'gift_card'
ADD COLUMN IF NOT EXISTS payment_details JSONB, -- Stores currency, address, or gift code
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';

-- Add check constraint for valid payment statuses
-- We drop it first to ensure we can update it if it exists
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'check_payment_status') THEN
        ALTER TABLE orders DROP CONSTRAINT check_payment_status;
    END IF;
END $$;

ALTER TABLE orders 
ADD CONSTRAINT check_payment_status 
CHECK (payment_status IN ('pending', 'paid', 'failed', 'processing', 'completed', 'cancelled'));


-- ==========================================
-- 2. Referral System Schema
-- ==========================================

-- Update profiles table to track referrals
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS referral_points INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_earnings NUMERIC DEFAULT 0;

-- Add index for fast referral code lookups during sign-up
CREATE INDEX IF NOT EXISTS idx_referral_code ON profiles(referral_code);

-- Optional: Create a function to auto-generate referral codes on insert
-- For now, the application handles generation, but this is a database-level backup.
-- (Skipped to keep migration simple and strict to app logic)
