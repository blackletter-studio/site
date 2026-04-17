# Changelog

All notable changes to the Black Letter site and public-facing infrastructure are documented here. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added (Fair Copy launch prep)

- Fair Copy production task-pane hosting on Cloudflare Pages (`fair-copy-addin.pages.dev`) — the add-in now runs from our own infrastructure, not localhost
- Sideload install guide at `/fair-copy/install` — four-step walkthrough + per-platform notes + troubleshooting + screenshot placeholders for Matt to fill in
- Terms of Use draft at `/legal/terms` — alpha banner, final wording pending counsel review
- AppSource submission checklist, store-listing copy, and custom-domain setup guide under `docs/launch/appsource/`
- Placeholder FC-monogram icons in Fair Copy burgundy at 7 sizes (16 / 32 / 64 / 80 / 128 / 300 / 512)
- Launch-ops docs route table at `docs/launch/README.md`
- `build:prod` and `deploy` npm scripts in the Fair Copy package for one-command releases

### Changed

- Fair Copy landing page CTA is live — "Add to Word →" links to the sideload install guide (was "coming soon" disabled button)
- Privacy policy at `/legal/privacy` updated to reflect actual licensing-server data flows: email associated with license code, IP as 120-second rate-limit counter, SHA-256 of license code, signed JWT stored in `roamingSettings`
- Support FAQ refreshed — removed "in M4" / "Microsoft AppSource in 2026" language; added entries for "iPad sideload" and "AppSource vs sideload — which should I use?"
- `fair-copy/public/manifest.xml` synced with `fair-copy/manifest.prod.xml` and marked as a mirror in its comment block; `manifest.prod.xml` remains the canonical source
- Footer adds a `/legal/terms` link alongside Privacy and EULA

### Fixed (mobile UX)

- Phone visitors to `/fair-copy` and `/fair-copy/install` no longer see the sideload download button they cannot actually use on a phone. The new `MobileInstallNotice` component renders on `md:hidden` viewports (narrower than 768px) with a clear "Fair Copy needs desktop Word" message and a one-tap mailto button that pre-fills "email this page to myself" so they can resume the install on their computer. Word add-ins are not supported in Word for iPhone or Android — that's a Microsoft platform constraint.
- Hero headlines across every page (11 files) scale from `text-4xl` (96px) on desktop down to `text-2xl` (40px) on mobile, so long titles like "End User License Agreement" no longer blow off the viewport.
- Top navigation switches from horizontal-tight to vertical-stacked on narrow screens: logo on the first row, nav links on the second, with `flex-wrap` so the four links reflow instead of overflowing.
- `NetworkTrafficTable` on `/trust` is wrapped in `overflow-x-auto` with a `min-w-[640px]` on the table itself and a "swipe the table horizontally" hint beneath — wide four-column tables no longer squash into illegibility on phones.

- Cloudflare Worker at `feedback.blackletter.studio` for the /feedback form (M1 T9-T11)
- Replacing the /feedback placeholder with a working form (M1 T11)
- Replacing the hardcoded Buttondown username placeholder once an account is provisioned
- Real GUID for `manifest.prod.xml` `<Id>` (currently a zero-based placeholder)
- Custom domain `addin.blackletter.studio` wired up to the Pages project (dashboard click; instructions in `docs/launch/appsource/custom-domain-setup.md`)
- Designer-produced branded icons to replace the FC-monogram placeholders

## [0.1.0-alpha] - 2026-04-17

### Added

- Marketing site live at https://blackletter.studio
- Real content on: `/`, `/fair-copy`, `/proofmark`, `/trust`, `/support`, `/legal/eula`, `/legal/privacy`, `/changelog`
- `/trust` page with complete network-traffic inventory (6-row table) and user-facing threat model (6 threats)
- Email-list signup on the home page via Buttondown's public embed endpoint (username placeholder `PENDING` until account is provisioned)
- Legal stubs for EULA and privacy policy, clearly labeled alpha pending lawyer review in M4
- FAQ (8 questions) and four contact paths at `/support`
- Final Black Letter wordmark and monogram in the brand repo (M1 T2)
- `NetworkTrafficTable` and `ThreatModelSummary` reusable components

### Fixed

- Netlify remote build now succeeds (`site#3`): bumped `NODE_VERSION` from Netlify default to `22` so Astro 6's Node `>=22.12` requirement is satisfied
- Preview builds disabled on deploy-preview and branch-deploy contexts in `netlify.toml` to conserve build minutes (solo-dev site — local `pnpm build` gates merges)

### Infrastructure

- Branch protection on all 7 `blackletter-studio` repos: 1-reviewer PRs, linear history, signed commits required, no force-push, no branch deletion
- Cloudflare zone `blackletter.studio` activated with SSL Full-Strict, TLS 1.3 min, HSTS, Brotli, Always-Use-HTTPS

### Deferred to later milestones

- Cloudflare Worker for feedback form (M1 T9-T11)
- Real Add-to-Word button (M4 when Microsoft AppSource listing is live)
- OpenGraph image generation at build time (M2 or later)
- Per-seat / firm licensing (post-v1)
- Final EULA and privacy wording by a licensed attorney (M4)
- Blog / craft posts on legal-document typography (post-v1)
