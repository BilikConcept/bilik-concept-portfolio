import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import {
  articles as fallbackArticles,
  latestArticle as fallbackLatestArticle,
  projects as fallbackProjects,
} from "@/lib/content";

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}

export type PortfolioProject = {
  id?: string;
  title: string;
  slug: string;
  category: string | null;
  short_description: string | null;
  full_description: string | null;
  client_name: string | null;
  year: string | null;
  services: string[] | null;
  hero_image_url: string | null;
  status?: string;
  is_featured?: boolean;
  sort_order?: number;
  published_at?: string | null;
};

export type PortfolioArticle = {
  id?: string;
  title: string;
  slug: string;
  category: string | null;
  excerpt: string | null;
  content: string | null;
  hero_image_url: string | null;
  status?: "draft" | "published" | "moodboard" | string;
  is_featured?: boolean;
  published_at?: string | null;
  moodboard_token?: string | null;
  moodboard_published_at?: string | null;
};

export type PortfolioMedia = {
  id?: string;
  image_url: string;
  alt: string | null;
  caption: string | null;
  orientation: "wide" | "landscape" | "portrait" | "square" | null;
  sort_order?: number;
};

export async function getPublishedProjects() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return fallbackProjects || [];
  }


  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("status", "published")
    .order("sort_order", { ascending: true })
    .order("published_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return fallbackProjects.map((project) => ({
      title: project.title,
      slug: project.slug.replace("/work/", ""),
      category: project.category,
      short_description: project.description,
      full_description: project.description,
      client_name: null,
      year: null,
      services: [],
      hero_image_url: null,
    }));
  }

  return data as PortfolioProject[];
}

export async function getPublishedArticles() {
  const { data, error } = await supabase
    .from("portfolio_articles")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return fallbackArticles.map((article) => ({
      title: article.title,
      slug: article.slug.replace("/editorial/", ""),
      category: article.category,
      excerpt: article.description,
      content: article.description,
      hero_image_url: null,
    }));
  }

  return data as PortfolioArticle[];
}

export async function getLatestArticle() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }


  const articles = await getPublishedArticles();

  return articles[0] ?? {
    title: fallbackLatestArticle.title,
    slug: fallbackLatestArticle.slug.replace("/editorial/", ""),
    category: fallbackLatestArticle.category,
    excerpt: fallbackLatestArticle.description,
    content: fallbackLatestArticle.description,
    hero_image_url: null,
  };
}

export async function getProjectBySlug(slug: string) {
  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    const fallback = fallbackProjects.find(
      (project) => project.slug.replace("/work/", "") === slug,
    );

    if (!fallback) {
      notFound();
    }

    return {
      title: fallback.title,
      slug,
      category: fallback.category,
      short_description: fallback.description,
      full_description: fallback.description,
      client_name: null,
      year: null,
      services: [],
      hero_image_url: null,
    } as PortfolioProject;
  }

  return data as PortfolioProject;
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from("portfolio_articles")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    const fallback = fallbackArticles.find(
      (article) => article.slug.replace("/editorial/", "") === slug,
    );

    if (!fallback) {
      notFound();
    }

    return {
      title: fallback.title,
      slug,
      category: fallback.category,
      excerpt: fallback.description,
      content: fallback.description,
      hero_image_url: null,
    } as PortfolioArticle;
  }

  return data as PortfolioArticle;
}

export async function getMoodboardArticleByToken(token: string) {
  const cleanToken = token?.trim();

  if (!cleanToken) {
    notFound();
  }

  const { data, error } = await supabase
    .from("portfolio_articles")
    .select("*")
    .eq("moodboard_token", cleanToken)
    .eq("status", "moodboard")
    .single();

  if (error || !data) {
    notFound();
  }

  return data as PortfolioArticle;
}

export async function getProjectMedia(projectId?: string) {
  if (!projectId) {
    return [];
  }

  const { data, error } = await supabase
    .from("portfolio_media")
    .select("id, image_url, alt, caption, orientation, sort_order")
    .eq("project_id", projectId)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as PortfolioMedia[];
}

export async function getArticleMedia(articleId?: string) {
  if (!articleId) {
    return [];
  }

  const { data, error } = await supabase
    .from("portfolio_media")
    .select("id, image_url, alt, caption, orientation, sort_order")
    .eq("article_id", articleId)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as PortfolioMedia[];
}


export async function getSiteSetting(key: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }


  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error || !data) {
    return null;
  }

  return data.value as string | null;
}


export async function getPortfolioProjectById(id: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return null;
  }


  const { data, error } = await supabase
    .from("portfolio_projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    category: data.category,
    short_description: data.short_description,
    hero_image_url: data.hero_image_url,
  };
}
