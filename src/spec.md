# Specification

## Summary
**Goal:** Build “ClipForge Mobile” as a mobile-first PWA-style web app on Internet Computer with offline-capable template-driven video/photo editing and a remotely configurable update system.

**Planned changes:**
- Create a mobile-first, app-like UI with persistent bottom navigation (Home, Templates, Create, Projects, Profile) plus consistent light/dark theming and smooth transitions.
- Apply a cohesive “CapCut-inspired” (non-branded) design system across core screens and editors, using a primary accent color that is not blue/purple.
- Implement an offline-first local data layer for projects, imported media metadata, and downloaded templates (cached for instant repeat visits) with offline indicators.
- Build a Templates section with the specified preloaded Video and Photo template catalog; open templates into editors, allow edits, and cache downloads for offline use.
- Implement offline-capable video editor UI with timeline-based multi-layer composition and essential tools (trim/split/crop, transitions, text animations, music selection, speed, filters/color adjustments) plus 720p/1080p export without watermark and touch-friendly timeline zoom.
- Implement offline-capable photo editor UI with crop/resize, filters/presets, brightness/contrast/saturation, text/stickers, background blur, basic background removal tool, and JPG/PNG export.
- Add Projects management (list/search/sort, duplicate, delete, open) with local persistence of metadata and editor state.
- Add a Free vs Pro feature-gating system (optional via config) to gate premium templates and advanced tools, with UI indicators/upsell prompts while keeping Free functional.
- Backend (Motoko single actor) APIs for remote config/versioning, template catalog metadata, and optional user-scoped cloud sync scaffolding (Internet Identity only when enabled).
- Add repo documentation describing architecture: folder structure, state management, offline storage, editor engine approach, and remote-config update flow (startup check, background refresh, major update prompt).
- Generate and include static brand/UI assets (icon, splash/hero, empty-state illustrations) as static files under `frontend/public/assets/generated` and reference them in the UI.

**User-visible outcome:** Users can browse and download editable templates, create and manage offline projects, edit photos/videos with a mobile-friendly editor, export results, and see features/tools/templates update via remote config with an “update available” prompt on major changes.
