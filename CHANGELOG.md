# Changelog

All notable changes to the Black Letter site and public-facing infrastructure are documented here. Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versioning follows [SemVer](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### In progress

- Cloudflare Worker at `feedback.blackletter.studio` for the /feedback form (M1 T9-T11)
- Replacing the /feedback placeholder with a working form (M1 T11)
- Replacing the hardcoded Buttondown username placeholder once an account is provisioned

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
