// Dedicated client for the anonymous "likes" feature.
// Sends the visitor id as a request header so row-level security can restrict
// deletes to the visitor who created the like.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const createLikesClient = (visitorId: string) =>
  createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    global: {
      headers: { "x-visitor-id": visitorId },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
