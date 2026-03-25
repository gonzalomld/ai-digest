/*
  # Create AI Digests Table

  1. New Tables
    - `digests`
      - `id` (uuid, primary key)
      - `date` (date, unique, not null) - The date of the digest
      - `title` (text, not null) - Title of the digest
      - `content` (text, not null) - Full HTML content of the digest
      - `summary` (text) - Brief summary for preview
      - `source_count` (integer) - Number of newsletter sources
      - `article_count` (integer) - Number of articles/items in the digest
      - `created_at` (timestamptz) - When the digest was created
      - `updated_at` (timestamptz) - When the digest was last updated

  2. Security
    - Enable RLS on `digests` table
    - Add policy for public read access (digests are meant to be publicly viewable)

  3. Indexes
    - Index on `date` column for fast date-based queries
*/

CREATE TABLE IF NOT EXISTS digests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  summary text,
  source_count integer DEFAULT 0,
  article_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_digests_date ON digests(date DESC);

ALTER TABLE digests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Digests are publicly readable"
  ON digests
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert digests"
  ON digests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update digests"
  ON digests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);