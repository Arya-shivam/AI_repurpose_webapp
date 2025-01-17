/*
  # Create usage tracking table

  1. New Tables
    - `usage_tracking`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `usage_count` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
  
  2. Security
    - Enable RLS
    - Add policies for users to read/update their own usage data
*/

CREATE TABLE usage_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  usage_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE usage_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own usage data"
  ON usage_tracking
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own usage data"
  ON usage_tracking
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);