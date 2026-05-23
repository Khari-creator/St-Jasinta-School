"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  ImagePlus,
  Images,
  Loader2,
  LogOut,
  Plus,
  Save,
  ShieldCheck,
  Star,
  Trash2,
  Upload
} from "lucide-react";

import type { SchoolProfile } from "@/data/schools";
import {
  galleryCategoryOptions,
  type GalleryCategory,
  type GalleryItemRecord
} from "@/lib/gallery-shared";
import { cn, formatDisplayDate } from "@/lib/utils";

type MessageState = {
  tone: "success" | "error";
  text: string;
} | null;

type EditorState = {
  id: string | null;
  title: string;
  alt: string;
  category: GalleryCategory;
  imageUrl: string;
  imagePath: string;
  isFeatured: boolean;
  featuredOrder: string;
  sortOrder: string;
};

type SchoolGalleryAdminProps = {
  school: SchoolProfile;
};

const emptyEditorState: EditorState = {
  id: null,
  title: "",
  alt: "",
  category: "Learning",
  imageUrl: "",
  imagePath: "",
  isFeatured: false,
  featuredOrder: "1",
  sortOrder: ""
};

function toEditorState(item: GalleryItemRecord): EditorState {
  return {
    id: item.id,
    title: item.title ?? "",
    alt: item.alt,
    category: item.category,
    imageUrl: item.src,
    imagePath: item.imagePath ?? "",
    isFeatured: Boolean(item.isFeatured),
    featuredOrder: item.featuredOrder ? String(item.featuredOrder) : "1",
    sortOrder: item.sortOrder ? String(item.sortOrder) : ""
  };
}

export default function SchoolGalleryAdmin({ school }: SchoolGalleryAdminProps) {
  const schoolLabel = school.shortName;
  const [isReady, setIsReady] = useState(true);
  const [sessionUsername, setSessionUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [items, setItems] = useState<GalleryItemRecord[]>([]);
  const [editor, setEditor] = useState<EditorState>(emptyEditorState);
  const [message, setMessage] = useState<MessageState>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/admin/gallery", {
      cache: "no-store"
    });

    if (response.status === 401) {
      setSessionUsername(null);
      setItems([]);
      setEditor(emptyEditorState);
      setIsLoading(false);
      return;
    }

    if (!response.ok) {
      throw new Error("Could not load gallery items from the custom admin store.");
    }

    const data = (await response.json()) as GalleryItemRecord[];
    setItems(data);
    setEditor((current) => (current.id || !data[0] ? current : toEditorState(data[0])));
    setIsLoading(false);
  }, []);

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
        setItems([]);
        setEditor(emptyEditorState);
        setIsLoading(false);
        return;
      }

      if (!data.authenticated || !data.username) {
        setSessionUsername(null);
        setItems([]);
        setEditor(emptyEditorState);
        setIsLoading(false);
        return;
      }

      setSessionUsername(data.username);
      await loadItems();
    } catch (error) {
      setIsReady(false);
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Could not verify the custom admin session."
      });
      setIsLoading(false);
    }
  }, [loadItems]);

  useEffect(() => {
    void loadSession();
  }, [loadSession]);

  function resetEditor() {
    setEditor(emptyEditorState);
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
    setItems([]);
    setEditor(emptyEditorState);
    setMessage(null);
  }

  async function handleImageUpload(file: File) {
    setIsUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", editor.title || "gallery-image");

      const response = await fetch("/api/admin/upload?kind=gallery", {
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
        imagePath: uploadedPath,
        imageUrl: uploadedUrl
      }));
      setMessage({
        tone: "success",
        text: "Gallery image uploaded successfully."
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

  async function saveItem() {
    const title = editor.title.trim();
    const alt = editor.alt.trim();

    if (!alt || !editor.imageUrl) {
      setMessage({
        tone: "error",
        text: "Please upload an image and add a description before saving."
      });
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: editor.id,
          title,
          alt,
          category: editor.category,
          imageUrl: editor.imageUrl,
          imagePath: editor.imagePath || null,
          isFeatured: editor.isFeatured,
          featuredOrder: editor.isFeatured ? Number(editor.featuredOrder) || 1 : null,
          sortOrder: editor.sortOrder ? Number(editor.sortOrder) || 1 : null
        })
      });

      const data = (await response.json()) as GalleryItemRecord & {
        error?: string;
      };

      if (!response.ok || !data.id) {
        throw new Error(data.error || "The gallery item could not be saved.");
      }

      setEditor(toEditorState(data));
      await loadItems();
      setMessage({
        tone: "success",
        text: "Gallery item saved successfully."
      });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Could not save this gallery item."
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function deleteItem() {
    if (!editor.id) {
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/gallery?id=${editor.id}`, {
        method: "DELETE"
      });

      const data = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Could not delete this gallery item.");
      }

      resetEditor();
      await loadItems();
      setMessage({
        tone: "success",
        text: "Gallery item deleted successfully."
      });
    } catch (error) {
      setMessage({
        tone: "error",
        text: error instanceof Error ? error.message : "Could not delete this gallery item."
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
            <code>CONTENT_BLOB_READ_WRITE_TOKEN</code> in Vercel so the {schoolLabel} gallery admin can work.
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
          <span>Preparing the {schoolLabel} gallery admin workspace...</span>
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
            Sign in to manage the {schoolLabel} gallery.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-600">
            Use the custom admin username and password configured in Vercel. Once signed in, you will be able to upload
            images, update featured gallery highlights, and remove older media.
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
                  {schoolLabel} Gallery Manager
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
                New Image
              </button>
              <button
                type="button"
                onClick={() => void loadItems()}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-700"
              >
                <Images className="h-4 w-4" />
                Refresh Gallery
              </button>
            </div>
          </article>

          <article className="rounded-[1.9rem] border border-slate-200 bg-white p-4 shadow-panel sm:p-5">
            <div className="flex items-center justify-between gap-3 px-2 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Existing Images</p>
                <p className="mt-2 text-sm text-slate-600">
                  Featured images appear first and can feed the homepage gallery highlights.
                </p>
              </div>
              <span className="rounded-full bg-[var(--school-tint)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--school-primary)]">
                {items.length} total
              </span>
            </div>

            <div className="grid gap-3">
              {items.length > 0 ? (
                items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setEditor(toEditorState(item));
                      setMessage(null);
                    }}
                    className={cn(
                      "rounded-[1.35rem] border px-4 py-4 text-left transition",
                      editor.id === item.id
                        ? "border-[var(--school-primary)] bg-[var(--school-tint)]"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--school-primary)]">
                          {item.category}
                        </span>
                        {item.isFeatured ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                            <Star className="h-3.5 w-3.5" />
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                        {formatDisplayDate(item.updatedAt)}
                      </p>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold leading-7 tracking-tight text-slate-950">
                      {item.title || item.alt}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.alt}</p>
                  </button>
                ))
              ) : (
                <div className="rounded-[1.35rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-sm leading-7 text-slate-600">
                  No gallery images have been created in the custom store yet. Use <strong>New Image</strong> to add the
                  first {schoolLabel} gallery item.
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
                {editor.id ? "Edit gallery item" : "Add a new gallery image"}
              </h2>
            </div>

            <div className="rounded-full bg-[var(--school-tint)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--school-primary)]">
              {editor.isFeatured ? "Featured" : "Standard"}
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
            <div className="grid gap-5 lg:grid-cols-[0.68fr_0.32fr]">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Internal title</span>
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
                  placeholder="Trip Day, Graduation, Learner Activity..."
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Category</span>
                <select
                  value={editor.category}
                  onChange={(event) =>
                    setEditor((current) => ({
                      ...current,
                      category: event.target.value as GalleryCategory
                    }))
                  }
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                >
                  {galleryCategoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-800">Image description</span>
              <textarea
                value={editor.alt}
                onChange={(event) =>
                  setEditor((current) => ({
                    ...current,
                    alt: event.target.value
                  }))
                }
                rows={3}
                className="rounded-[1.6rem] border border-slate-200 px-4 py-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                placeholder="Describe the image clearly. This is used on the live site and for accessibility."
              />
            </label>

            <div className="grid gap-5 lg:grid-cols-[0.68fr_0.32fr]">
              <div className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Image upload</span>
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

              <div className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Featured on homepage</span>
                <label className="inline-flex h-12 items-center gap-3 rounded-2xl border border-slate-200 px-4 text-sm text-slate-700">
                  <input
                    type="checkbox"
                    checked={editor.isFeatured}
                    onChange={(event) =>
                      setEditor((current) => ({
                        ...current,
                        isFeatured: event.target.checked
                      }))
                    }
                    className="h-4 w-4 rounded border-slate-300 text-[var(--school-primary)] focus:ring-[var(--school-primary)]"
                  />
                  Mark as featured
                </label>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Featured order</span>
                <input
                  type="number"
                  min="1"
                  value={editor.featuredOrder}
                  onChange={(event) =>
                    setEditor((current) => ({
                      ...current,
                      featuredOrder: event.target.value
                    }))
                  }
                  disabled={!editor.isFeatured}
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-900 outline-none transition disabled:bg-slate-50 focus:border-[var(--school-primary)]"
                  placeholder="1"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-800">Gallery order</span>
                <input
                  type="number"
                  min="1"
                  value={editor.sortOrder}
                  onChange={(event) =>
                    setEditor((current) => ({
                      ...current,
                      sortOrder: event.target.value
                    }))
                  }
                  className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-900 outline-none transition focus:border-[var(--school-primary)]"
                  placeholder="Optional custom order"
                />
              </label>
            </div>

            <div className="grid gap-4 lg:grid-cols-[0.72fr_0.28fr]">
              <div className="rounded-[1.7rem] border border-slate-200 bg-[var(--school-surface)] p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Image Preview</p>
                <div className="mt-4 overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white">
                  {editor.imageUrl ? (
                    <div className="relative aspect-[16/10]">
                      <Image
                        src={editor.imageUrl}
                        alt={editor.alt || editor.title || "Gallery preview image"}
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
                          Upload a gallery image to preview how it will appear in the live gallery and homepage highlights.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <article className="rounded-[1.7rem] border border-slate-200 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Publishing Note</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Featured images are ordered first and feed the homepage gallery preview before standard gallery items.
                </p>
              </article>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => void saveItem()}
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--school-primary)] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Image
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
                  onClick={() => void deleteItem()}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Image
                </button>
              ) : null}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
