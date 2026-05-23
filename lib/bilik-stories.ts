import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type BilikStory = {
  id: string;
  title: string;
  slug: string;
  eyebrow: string | null;
  lead: string | null;
  hero_image_url: string | null;
  secondary_image_url: string | null;
  source_project_id: string | null;
  layout_variant: string | null;
  typography_variant: string | null;
  status: string;
  published_at: string | null;
  created_at?: string | null;
};

export type StoryBlockContent = {
  text?: string;
  richHtml?: string;
  caption?: string;
  imageUrl?: string;
  imageUrlTwo?: string;
  ratio?: string;
  fontPreset?: string;
  fontSize?: string;
};

export type BilikStoryBlock = {
  id: string;
  story_id: string;
  block_type:
    | "text"
    | "statement"
    | "full_image"
    | "image_pair"
    | "image_caption"
    | "spacer";
  sort_order: number;
  content_json: StoryBlockContent;
};

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

export async function getPublishedStories() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("bilik_stories")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    return [];
  }

  return (data || []) as BilikStory[];
}

export async function getPublishedStoryBySlug(slug: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("bilik_stories")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as BilikStory;
}

export async function getStoryBlocks(storyId: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("bilik_story_blocks")
    .select("*")
    .eq("story_id", storyId)
    .order("sort_order", { ascending: true });

  if (error) {
    return [];
  }

  return (data || []) as BilikStoryBlock[];
}
