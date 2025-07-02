-- Enable RLS if not already enabled
ALTER TABLE public.ledger ENABLE ROW LEVEL SECURITY;

-- Policy: allow insert for authenticated users
CREATE POLICY "Allow insert for authenticated users"
  ON public.ledger
  FOR INSERT
  TO authenticated
  WITH CHECK (true);


-- Policy: allow update for authenticated users
CREATE POLICY "Allow update for authenticated users"
  ON public.ledger
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: allow delete for authenticated users (optional for soft delete)
CREATE POLICY "Allow delete for authenticated users"
  ON public.ledger
  FOR DELETE
  TO authenticated
  USING (true);
