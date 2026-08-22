DROP POLICY IF EXISTS "Anyone can remove a like" ON public.project_likes;

CREATE POLICY "Visitors can remove only their own like"
ON public.project_likes
FOR DELETE
TO anon, authenticated
USING (
  visitor_id = nullif(current_setting('request.headers', true)::json ->> 'x-visitor-id', '')
);