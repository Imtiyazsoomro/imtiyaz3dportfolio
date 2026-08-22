CREATE TABLE public.project_likes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id text NOT NULL,
  visitor_id text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (project_id, visitor_id)
);

GRANT SELECT, INSERT, DELETE ON public.project_likes TO anon;
GRANT SELECT, INSERT, DELETE ON public.project_likes TO authenticated;
GRANT ALL ON public.project_likes TO service_role;

ALTER TABLE public.project_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view likes"
  ON public.project_likes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can add a like"
  ON public.project_likes FOR INSERT
  TO anon, authenticated
  WITH CHECK (char_length(visitor_id) BETWEEN 8 AND 64 AND char_length(project_id) BETWEEN 1 AND 128);

CREATE POLICY "Anyone can remove a like"
  ON public.project_likes FOR DELETE
  TO anon, authenticated
  USING (true);

CREATE INDEX project_likes_project_id_idx ON public.project_likes (project_id);