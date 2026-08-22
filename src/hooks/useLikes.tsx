import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

const VISITOR_KEY = "visitor_id";

const getVisitorId = () => {
  let id = localStorage.getItem(VISITOR_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, id);
  }
  return id;
};

interface LikesContextValue {
  counts: Record<string, number>;
  liked: Record<string, boolean>;
  toggleLike: (projectId: string) => Promise<void>;
}

const LikesContext = createContext<LikesContextValue>({
  counts: {},
  liked: {},
  toggleLike: async () => {},
});

export const useLikes = () => useContext(LikesContext);

export const LikesProvider = ({ children }: { children: ReactNode }) => {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const visitorId = useMemo(() => getVisitorId(), []);

  const load = useCallback(async () => {
    const { data, error } = await supabase
      .from("project_likes")
      .select("project_id, visitor_id");

    if (error) {
      console.error("Failed to load likes:", error.message);
      return;
    }

    const nextCounts: Record<string, number> = {};
    const nextLiked: Record<string, boolean> = {};
    for (const row of data ?? []) {
      nextCounts[row.project_id] = (nextCounts[row.project_id] ?? 0) + 1;
      if (row.visitor_id === visitorId) nextLiked[row.project_id] = true;
    }
    setCounts(nextCounts);
    setLiked(nextLiked);
  }, [visitorId]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    const channel = supabase
      .channel("project-likes-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "project_likes" },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [load]);

  const toggleLike = useCallback(
    async (projectId: string) => {
      const isLiked = !!liked[projectId];

      // Optimistic update
      setLiked((prev) => ({ ...prev, [projectId]: !isLiked }));
      setCounts((prev) => ({
        ...prev,
        [projectId]: Math.max(0, (prev[projectId] ?? 0) + (isLiked ? -1 : 1)),
      }));

      const { error } = isLiked
        ? await supabase
            .from("project_likes")
            .delete()
            .eq("project_id", projectId)
            .eq("visitor_id", visitorId)
        : await supabase
            .from("project_likes")
            .insert({ project_id: projectId, visitor_id: visitorId });

      if (error) {
        console.error("Failed to toggle like:", error.message);
        load();
      }
    },
    [liked, visitorId, load]
  );

  return (
    <LikesContext.Provider value={{ counts, liked, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
};
