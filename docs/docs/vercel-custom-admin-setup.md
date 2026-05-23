# Vercel Custom Admin Setup For St. Jacinta

This project now uses a custom Vercel-based admin for `St. Jacinta` instead of Supabase.

It includes:

- a public St. Jacinta blog at `/blog`
- a St. Jacinta custom admin blog manager at `/admin/blog`
- a St. Jacinta custom admin gallery manager at `/admin/gallery`
- public image uploads through Vercel Blob
- private blog and gallery metadata stored in a private Vercel Blob store

## 1. Create Two Blob Stores In Vercel

You need:

1. One `public` Blob store for uploaded images
2. One `private` Blob store for admin-managed JSON content

Suggested names:

- `school-public-media`
- `school-private-content`

When you create each store, Vercel gives you a read-write token.

## 2. Add Environment Variables

Add these in Vercel and local `.env.local`:

```env
DEFAULT_SCHOOL_ID=st-jacinta

ST_JACINTA_ADMIN_USERNAME=your-admin-username
ST_JACINTA_ADMIN_PASSWORD=your-strong-password
ST_JACINTA_ADMIN_SESSION_SECRET=your-long-random-session-secret

BLOB_READ_WRITE_TOKEN=your-public-media-store-token
CONTENT_BLOB_READ_WRITE_TOKEN=your-private-content-store-token
```

For the King David deployment, keep:

```env
DEFAULT_SCHOOL_ID=king-david
```

Notes:

- `BLOB_READ_WRITE_TOKEN` is used for uploaded blog and gallery images
- `CONTENT_BLOB_READ_WRITE_TOKEN` is used for private blog and gallery JSON data
- `ST_JACINTA_ADMIN_SESSION_SECRET` should be long and random

Example PowerShell command to generate a session secret:

```powershell
[guid]::NewGuid().ToString() + [guid]::NewGuid().ToString()
```

## 3. Pull Vercel Environment Variables Locally

If you use the Vercel CLI:

```bash
vercel env pull
```

That helps sync the Blob tokens and admin credentials into local development.

## 4. How The Custom Admin Stores Content

Private content is written to the private Blob store as JSON:

- `st-jacinta/content/blog-posts.json`
- `st-jacinta/content/gallery-items.json`

Public uploaded images go to the public Blob store under paths like:

- `st-jacinta/blog-images/...`
- `st-jacinta/gallery-images/...`

## 5. How Login Works

The custom admin does not use a database auth provider.

It works like this:

1. You sign in with `ST_JACINTA_ADMIN_USERNAME` and `ST_JACINTA_ADMIN_PASSWORD`
2. The app creates a signed `HttpOnly` cookie
3. Admin API routes verify that signed cookie before allowing changes

## 6. What To Test

After setting the env vars and redeploying:

1. Open `/admin/blog` on the St. Jacinta site
2. Sign in with the configured username and password
3. Create a draft post
4. Upload a cover image
5. Publish the post
6. Confirm it appears on `/blog`
7. Open `/admin/gallery`
8. Upload a gallery image
9. Mark it as featured
10. Confirm it appears on `/gallery` and the homepage preview

## 7. Important Notes For The Hobby Plan

- Vercel Blob works on the `Hobby` plan
- Keep images reasonably compressed
- Avoid large video uploads through admin on Hobby
- If you exceed Hobby Blob limits, usage typically pauses until the usage window resets

## 8. Current Scope

- Custom admin is enabled only for `St. Jacinta`
- King David remains public-only for now
- The public St. Jacinta blog reads only `published` posts
- St. Jacinta gallery falls back to static data if the private content store is empty
