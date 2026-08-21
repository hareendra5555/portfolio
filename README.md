# portfolio

Personal site for **Hareendra Nerusu** — software engineer, backend / cloud / agentic AI.

Next.js 16 App Router, Tailwind v4, MDX content, statically exported and served from GitHub Pages.

> Forked from [Aniket-508/aniketpawar.com](https://github.com/Aniket-508/aniketpawar.com) (MIT). The design, component library and content model are his; the content, branding and the static-export/Pages deployment path are mine. See [LICENSE](./LICENSE).

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000/portfolio/
```

```bash
npm run build      # static export to ./out
npm start          # serve ./out locally
npm run check      # lint + format
npm run typecheck  # tsc --noEmit (run after a build)
```

Node 22+ (see `.nvmrc`). One caveat: `npm run check` runs Ultracite, whose
oxlint/oxfmt TypeScript config files need **Node 22.18 or newer**. On an older
22.x it fails to load the config — `npm run build` and `npm run typecheck` are
unaffected. CI installs the latest 22.x, so it passes there.

`npm run dev` serves under the base path, so the root URL is
`http://localhost:3000/portfolio/`, not `http://localhost:3000`.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
One-time setup in the repo:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Push to `main`. The site lands at
   `https://<user>.github.io/<repo>`.

The workflow derives `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_SITE_URL` from the
repo name, so renaming the repo does not require touching config.

### Serving from a user site or a custom domain

If this ever moves to `hareendra5555.github.io` (root) or a custom domain, the
base path has to go away:

- In `deploy.yml`, set `NEXT_PUBLIC_BASE_PATH: ""` and point
  `NEXT_PUBLIC_SITE_URL` at the new origin.
- Update the fallbacks in `next.config.mjs` and `constants/url.ts`.
- For a custom domain, add `public/CNAME` containing the hostname.

## Editing content

Almost everything is data, not markup:

| What | Where |
| --- | --- |
| Name, role, location, avatar | `constants/user.ts` |
| Site description, keywords, nav | `constants/site.ts` |
| Social + external links | `constants/links.ts`, `constants/contacts.ts` |
| Projects (cards) | `constants/projects.ts` |
| Projects (detail pages) | `content/projects/<slug>.mdx` |
| Roles (cards) | `constants/experiences.ts` |
| Roles (detail pages) | `content/experiences/<slug>.mdx` |
| Crafts | `constants/crafts.ts` + `content/crafts/<slug>.mdx` |
| Degrees + certifications | `constants/education.ts` |
| Papers | `constants/publications.ts` |
| Skills / software | `constants/software.tsx` |
| `/skills` hardware | `constants/hardware.ts` (empty — the section hides itself) |
| Hero copy | `components/about/section.tsx` |

A slug in `constants/projects.ts` must have a matching
`content/projects/<slug>.mdx`, or the detail page 404s. Same for experiences and
crafts.

### Brand assets

`public/favicon.svg` (the HN mark) and `public/profile.jpg` (the portrait) are
the sources of truth. After replacing either, regenerate the raster derivatives
and the Open Graph card:

```bash
node scripts/generate-assets.mjs
```

That writes the favicon PNGs, the touch/chrome icons, and `public/og.png`.

## What was removed from upstream

Things that need a server, an analytics vendor, or content I do not have:

- `/og` and `/vcard` route handlers → replaced by a committed `public/og.png`.
- `/stats` (Clarity + token analytics) and `/favorites`.
- Upstream's `/uses` is `/skills` here, and its list also appears on the home page.
- The shadcn component registry (`registry/`, `public/r/`).
- Microsoft Clarity. `lib/events.ts` keeps the full event taxonomy but drops
  every call on the floor — wire a provider in `trackEvent` to start collecting.

Still intact: dark mode, the greeting intro, sound + haptics toggles, link
hover previews, the GitHub contribution graph, MDX detail pages with a TOC
minimap, and the list/grid view toggles.

### Build-time network calls

Two things are fetched while building and snapshotted into the HTML:

- The GitHub contribution graph, from `github-contributions-api.jogruber.de`.
- Link hover previews, scraped from each outbound URL.

- The LeetCode streak, solved counts and rank, from `leetcode.com/graphql`.

All three degrade to empty/null on failure rather than breaking the build, and
the LeetCode card hides itself entirely if the fetch failed. Set
`SKIP_LINK_PREVIEWS=1` for a faster or offline build.

Because these are baked in at build time, `deploy.yml` also runs on a daily
cron (06:17 UTC) so the numbers do not freeze. Two caveats worth knowing:
GitHub disables scheduled workflows on a repo with no pushes for 60 days, and
cron runs are best-effort — they can be delayed under load. The streak is
therefore accurate as of the last successful build, not live.
