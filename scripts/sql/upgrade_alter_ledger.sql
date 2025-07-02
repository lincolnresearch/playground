ALTER TABLE public.ledger
  ADD COLUMN updated_by uuid REFERENCES users(id),
  ADD COLUMN updated_at timestamp with time zone DEFAULT now(),
  ADD COLUMN deleted boolean DEFAULT false NOT NULL;

-- If you’d prefer updated_at to auto-update on every write, I can help you set up a trigger next.
