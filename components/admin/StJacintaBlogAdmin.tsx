"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  ImagePlus,
  Loader2,
  LogOut,
  PenSquare,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  Upload
} from "lucide-react";

import type { SchoolProfile } from "@/data/schools";
import type { BlogPostRecord, BlogPostStatus } from "@/lib/blog-shared";
import { cn, createSlug, formatDisplayDate } from "@/lib/utils";

type MessageState = {
  tone: "success" | "error";
  text: string;
} | null;

type EditorState = {
  id: string | null;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  coverImageUrl: string;
  coverImagePath: string;
  status: BlogPostStatus;
  publishedAt: string | null;
};

type StJacintaBlogAdminProps = {
  school: SchoolProfile;
};

const emptyEditorState = (school: SchoolProfile): EditorState => ({
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  authorName: school.director,
  coverImageUrl: "",
  coverImagePath: "",
  status: "draft",
  publishedAt: null
});

function toEditorState(post: BlogPostRecord): EditorState {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    authorName: post.authorName,
    coverImageUrl: post.coverImageUrl ?? "",
    coverImagePath: post.coverImagePath ?? "",
    status: post.status,
    publishedAt: post.publishedAt
  };
}

export default function StJacintaBlogAdmin({ school }: StJacintaBlogAdminProps) {
  const schoolLabel = school.shortName;
  const [isReady, setIsReady] = useState(true);
  const [sessionUsername, setSessionUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [posts, setPosts] = useState<BlogPostRecord[]>([]);
  const [editor, setEditor] = useState<EditorState>(() => emptyEditorState(school));
  const [message, setMessage] = useState<MessageState>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loadPosts = useCallback(async () => {
    const response = await fetch("/api/admin/blog", {
      cache: "no-store"
    });

    if (response.status === 401) {
      setSessionUsername(null);
      setPosts([]);
      setEditor(emptyEditorState(school));
      setIsLoading(false);
      return;
    }

    if (!response.ok) {
      throw new Error("Could not load blog posts from the custom admin store.");
    }

    const data = (await response.json()) as BlogPostRecord[];
    setPosts(data);
    setEditor((current) => (current.id || !data[0] ? current : toEditorState(data[0])));
    setIsLoading(false);
  }, [school]);

  const loadSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/session", {
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error("Could not verify the current admin session.");
      }

      const data = (await response.json()) as {
        authenticated: boolean;
        ready: boolean;
        username: string | null;
      };

      setIsReady(data.ready);

      if (!data.ready) {
        setSessionUsername(null);
        setPosts([]);
        setEditor(emptyEditorState(school));
        setIsLoading(false);
        return;
      }

      if (!data.authenticated || !data.username) {
        setSessionUsername(null);
        setPosts([]);
        setEditor(emptyEditorState(school));
        setIsLoading(false);
        return;
      }

      setSessionUsername(data.username);
      await loadPosts();
    } catch (error) {
      setIsReady(false);
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Could not verify the custom admin session."
      });
      setIsLoading(false);
    }
  }, [loadPosts, school]);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  function resetEditor() {
    setEditor(emptyEditorState(school));
    setMessage(null);
  }

  async function handleSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });

      const data = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Could not sign in.");
      }

      setPassword("");
      await loadSession();
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Could not sign in."
      });
      setIsLoading(false);
    }
  }

  async function handleSignOut() {
    await fetch("/api/admin/logout", {
      method: "POST"
    });

    setSessionUsername(null);
    setPosts([]);
    setEditor(emptyEditorState(school));
    setMessage(null);
  }

  async function handleImageUpload(file: File) {
    setIsUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", editor.title || "blog-image");

      const response = await fetch("/api/admin/upload?kind=blog", {
        method: "POST",
        body: formData
      });

      const data = (await response.json()) as {
        url?: string;
        pathname?: string;
        error?: string;
      };

      if (!response.ok || !data.url || !data.pathname) {
        throw new Error(data.error || "Could not upload the selected image.");
      }

      const uploadedUrl = data.url;
      const uploadedPath = data.pathname;

      setEditor((current) => ({
        ...current,
        coverImagePath: uploadedPath,
        coverImageUrl: uploadedUrl
      }));
      setMessage({
        tone: "success",
        text: "Cover image uploaded successfully."
      });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Could not upload the selected image."
      });
    } finally {
      setIsUploading(false);
    }
  }

  async function savePost(nextStatus: BlogPostStatus) {
    const title = editor.title.trim();
    const content = editor.content.trim();
    const slug = createSlug(editor.slug || title);
    const excerpt =
      editor.excerpt.trim() ||
      content
        .split(/\s+/)
        .slice(0, 28)
        .join(" ")
        .trim();

    if (!title || !content || !slug) {
      setMessage({
        tone: "error",
        text: "Please add at least a title, slug, and article content before saving."
      });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: editor.id,
          title,
          slug,
          excerpt,
          content,
          authorName: editor.authorName.trim() || school.director,
          coverImageUrl: editor.coverImageUrl || null,
          coverImagePath: editor.coverImagePath || null,
          status: nextStatus,
          publishedAt: nextStatus === "published" ? editor.publishedAt ?? new Date().toISOString() : null
        })
      });

      const data = (await response.json()) as BlogPostRecord & {
        error?: string;
      };

      if (!response.ok || !data.id) {
        throw new Error(data.error || "The post could not be saved.");
      }

      setEditor(toEditorState(data));
      await loadPosts();
      setMessage({
        tone: "success",
        text: nextStatus === "published" ? "Post published successfully." : "Draft saved successfully."
      });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Could not save this post."
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function deletePost() {
    if (!editor.id) {
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/blog?id=${editor.id}`, {
        method: "DELETE"
      });

      const data = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Could not delete this post.");
      }

      resetEditor();
      await loadPosts();
      setMessage({
        tone: "success",
        text: "Post deleted successfully."
      });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Could not delete this post."
      });
    } finally {
      setIsSaving(false);
    }
  }

  if (!isReady) {
    return (
      <section className="shell section-space">
        <article className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--school-tint)] text-[var(--school-primary)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-slate-950">
            Custom admin setup is not complete yet.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
            Add <code>ST_JACINTA_ADMIN_USERNAME</code>, <code>ST_JACINTA_ADMIN_PASSWORD</code>,{" "}
            <code>ST_JACINTA_ADMIN_SESSION_SECRET</code>, <code>BLOB_READ_WRITE_TOKEN</code>, and{" "}
            <code>CONTENT_BLOB_READ_WRITE_TOKEN</code> in Vercel so the {schoolLabel} custom admin can work.
          </p>
        </article>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="shell section-space">
        <div className="flex items-center gap-3 rounded-[1.7rem] border border-slate-200 bg-white px-6 py-5 text-slate-700 shadow-panel">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--school-primary)]" />
          <span>Preparing the {schoolLabel} blog admin workspace...</span>
        </div>
      </section>
    );
  }

  if (!sessionUsername) {
    return (
      <section className="shell section-space">
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-panel sm:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--school-tint)] text-[var(--school-primary)]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-slate-950">
            Sign in to manage {schoolLabel} blog posts.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Use the custom admin username and password configured in Vercel. Once signed in, you will be able to publish
            updates, upload cover images, and edit existing posts.
          </p>

          <form className="mt-8 grid gap-4" onSubmit={handleSignIn}>
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Username</span>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                placeholder="admin"
                required
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                placeholder="Enter your password"
                required
              />
            </label>

            {message ? (
              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-7",
                  message.tone === "error" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
                )}
              >
                {message.text}
              </div>
            ) : null}

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
            >
              Sign In
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="shell section-space">
      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <aside className="space-y-5">
          <article className="rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-panel sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Admin Session</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">
                  {schoolLabel} Blog Manager
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">Signed in as {sessionUsername}</p>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetEditor}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                <Plus className="h-4 w-4" />
                New Post
              </button>
              <button
                type="button"
                onClick={() => void loadPosts()}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                <PenSquare className="h-4 w-4" />
                Refresh Posts
              </button>
            </div>
          </article>

          <article className="rounded-[1.9rem] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
            <div className="flex items-center justify-between gap-3 px-2 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Existing Posts</p>
                <p className="mt-2 text-sm text-slate-600">Select a post to edit, update, or publish.</p>
              </div>
              <span className="rounded-full bg-[var(--school-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--school-primary)]">
                {posts.length} total
              </span>
            </div>

            <div className="grid gap-3">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <button
                    key={post.id}
                    type="button"
                    onClick={() => {
                      setEditor(toEditorState(post));
                      setMessage(null);
                    }}
                    className={cn(
                      "rounded-[1.35rem] border px-4 py-4 text-left transition",
                      editor.id === post.id
                        ? "border-[var(--school-primary)] bg-[var(--school-tint)]"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--school-primary)]">
                        {post.status}
                      </p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {formatDisplayDate(post.publishedAt ?? post.updatedAt)}
                      </p>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-7 tracking-tight text-slate-950">{post.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{post.excerpt}</p>
                  </button>
                ))
              ) : (
                <div className="rounded-[1.35rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm leading-7 text-slate-600">
                  No posts have been created yet. Use <strong>New Post</strong> to add the first {schoolLabel} update.
                </div>
              )}
            </div>
          </article>
        </aside>

        <article className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-panel sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Editor</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-950">
                {editor.id ? "Edit blog post" : "Create a new school update"}
              </h2>
            </div>

            <div className="rounded-full bg-[var(--school-tint)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--school-primary)]">
              {editor.status}
            </div>
          </div>

          {message ? (
            <div
              className={cn(
                "mt-6 rounded-2xl px-4 py-3 text-sm leading-7",
                message.tone === "error" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
              )}
            >
              {message.text}
            </div>
          ) : null}

          <div className="mt-8 grid gap-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Post title</span>
              <input
                type="text"
                value={editor.title}
                onChange={(event) =>
                  setEditor((current) => ({
                    ...current,
                    title: event.target.value
                  }))
                }
                className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                placeholder="Enter a strong post title"
              />
            </label>

            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Slug</span>
                <input
                  type="text"
                  value={editor.slug}
                  onChange={(event) =>
                    setEditor((current) => ({
                      ...current,
                      slug: event.target.value
                    }))
                  }
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                  placeholder="post-url-slug"
                />
              </label>

              <button
                type="button"
                onClick={() =>
                  setEditor((current) => ({
                    ...current,
                    slug: createSlug(current.title)
                  }))
                }
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                Generate Slug
              </button>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Short excerpt</span>
              <textarea
                value={editor.excerpt}
                onChange={(event) =>
                  setEditor((current) => ({
                    ...current,
                    excerpt: event.target.value
                  }))
                }
                rows={3}
                className="rounded-[1.6rem] border border-slate-200 px-4 py-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                placeholder="Write a short summary that appears on the blog listing page."
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Article content</span>
              <textarea
                value={editor.content}
                onChange={(event) =>
                  setEditor((current) => ({
                    ...current,
                    content: event.target.value
                  }))
                }
                rows={14}
                className="rounded-[1.8rem] border border-slate-200 px-4 py-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                placeholder="Write the full post content here. Separate paragraphs with blank lines for cleaner article formatting."
              />
            </label>

            <div className="grid gap-5 lg:grid-cols-[0.68fr_0.32fr]">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Author name</span>
                <input
                  type="text"
                  value={editor.authorName}
                  onChange={(event) =>
                    setEditor((current) => ({
                      ...current,
                      authorName: event.target.value
                    }))
                  }
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                  placeholder="Author or school office name"
                />
              </label>

              <div className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Cover image upload</span>
                <label className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700">
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {isUploading ? "Uploading..." : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (file) {
                        void handleImageUpload(file);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.72fr_0.28fr]">
              <div className="rounded-[1.7rem] border border-slate-200 bg-[var(--school-surface)] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Cover Image Preview</p>
                <div className="mt-4 overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white">
                  {editor.coverImageUrl ? (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={editor.coverImageUrl}
                        alt={editor.title || "Blog cover image"}
                        fill
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] items-center justify-center text-slate-500">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <ImagePlus className="h-8 w-8 text-[var(--school-primary)]" />
                        <p className="max-w-xs text-sm leading-7">
                          Upload a cover image to make the blog card and article header more engaging.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <article className="rounded-[1.7rem] border border-slate-200 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Publishing Note</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Draft posts stay in the private content store until you publish them, and published posts appear on the
                  public St. Jacinta blog automatically.
                </p>
              </article>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => void savePost("draft")}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Draft
              </button>

              <button
                type="button"
                onClick={() => void savePost("published")}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Publish Post
              </button>

              <button
                type="button"
                onClick={resetEditor}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                <Plus className="h-4 w-4" />
                New Entry
              </button>

              {editor.id ? (
                <button
                  type="button"
                  onClick={() => void deletePost()}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Post
                </button>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
