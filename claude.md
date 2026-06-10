# Collective Canvas — Design Plan & Decision Log

## Project Overview

**What it is:** A collaborative ASCII art web app where visitors place permanent ASCII stamps on a shared infinite canvas — a digital guestbook for the internet.

**Stack:** React, Supabase, Vercel

**Live URL:** collective-canvas.vercel.app

**Designer:** Zee (CK-12, Bangalore)

**Status:** Functional MVP with old-web aesthetic reskin applied. Needs storytelling, content, and polish to be portfolio-ready.

---

## The Core Story

Collective Canvas isn't about ASCII art. It's about **leaving a trace of yourself in a shared space**. The same impulse as carving your name into a tree, signing a guestbook, writing on a bathroom wall. "I was here."

### The Narrative Arc Every Visitor Should Feel

**Act 1 — Arrival.** You enter a space. Others have been here before you. You see their marks. You wander. You feel the history of the wall. *Emotion: curiosity, discovery.*

**Act 2 — Creation.** You decide to make your own mark. You build something — a version of yourself, a message, a drawing. It doesn't have to be perfect. It just has to be yours. *Emotion: expression, ownership.*

**Act 3 — Placement.** You choose your spot on the wall. You commit. Your stamp lands. *Emotion: satisfaction, permanence.*

**Act 4 — Belonging.** You see yourself among strangers. Your mark sits next to someone else's mark. You're part of this now. *Emotion: connection, smallness-in-a-good-way.*

### What's Currently Missing From the Arc

- **Act 1 barely exists** because the canvas is nearly empty — no sense of history or community
- **Act 2 feels like shopping, not creating** — the composer is a menu, not a workshop
- **Act 3 has no weight** — "✓ stamped" is flat, no ceremony
- **Act 4 doesn't exist** — there's no moment where you zoom out and see yourself in context

### Portfolio Case Study Narrative

"Before Instagram, before memes, before TikTok — people were expressing themselves with 128 characters on bulletin boards. ASCII art was the original user-generated content. I wanted to bring that spirit to the modern web. Collective Canvas is a shared wall where anyone can build an ASCII character and leave their mark. A guestbook for the internet, inspired by BBS culture and the textfiles.com archive."

---

## Aesthetic Direction — Decision Log

### What Was Rejected and Why

**Analog/paper aesthetic (crumpled paper, ink-press, warm tones):** Rejected because ASCII art is screen nostalgia, not craft nostalgia. ASCII art's cultural DNA is digital — CRT monitors, terminals, IRC, BBS boards. Paper textures contradict the medium.

**Phone-specific aesthetic (BlackBerry, Nokia):** Rejected because it's too narrow for a web app. A web app pretending to be a phone would feel like a gimmick.

**Pure terminal/hacker aesthetic:** The initial reskin landed too cold. Everything was cyan-on-near-black, like SSH-ing into a server. A guestbook should feel like a place people want to hang out, not a dark room.

### What Was Chosen

**Old web + BBS nostalgia, warmed up.** The cultural anchor is ASCII art history — BBS textfiles, ANSI art, the community of writers and artists who created within the 128-character constraint of ASCII. Reference: textfiles.com. The specific nostalgic targets are: GeoCities guestbooks, Orkut scrapbooks, early-2000s web pages, BBS bulletin boards.

The aesthetic should feel like "someone's personal BBS board that they were proud of" — not Matrix, not hacker terminal, not clean SaaS.

### Current Palette (Applied)

- **Background:** #0D0D2B (deep navy, not near-black)
- **Panels/cards:** #0F0F1E
- **Input backgrounds:** #0A0A18
- **Borders:** #222240, focus → #00AACC
- **Primary accent:** #00CCFF (cyan) — structural color for borders, links, indicators
- **Text primary:** #C8C8D0 (slightly warm)
- **Text warm:** #D8D8E0 (for welcome modal body)
- **Dim/ambient:** #55556A
- **Warning/delete:** #FF5555
- **Title bar:** #1A1A3A with #FFFF55 (yellow) text
- **Button active:** #00AACC background, #000000 text
- **Button hover:** #00CCFF

### Typography

- Font stack: 'Courier New', Courier, monospace
- Labels and panel headers: lowercase (not uppercase — casual, not commanding)
- No italic anywhere (terminals don't do italic)
- Letter-spacing on headers: 1.5px

### UI Chrome Applied

- Composer: terminal window chrome with title bar "[ leave a mark ]"
- Tabs: plain text with underline indicator, no background fill
- Color picker: squares (not circles), 12×12px, border-radius: 0
- Modals: dark panels with 1px borders (ASCII box-drawing borders planned but not yet applied)
- Toast: dark panel with cyan border and text
- Boot sequence: fake terminal boot animation on first load
- Visitor counter: "you are visitor #0047"
- Keystroke sound: mechanical click on stamp placement

### What Was Removed

- All warm parchment tones (#f4ede0, #fefcf7, #faf5e8)
- All tan/beige tones (#d4c5a8, #c4b598, #a8967a)
- The rust-red (#8b3a2f)
- Card rotation on modals
- fontStyle: "italic" throughout
- Offset box-shadows (3px 3px 0)

---

## Design Critique — Current State

### What's Working

- Boot sequence is the single best design decision — sets the world immediately
- Visitor counter is pitch-perfect old-web energy
- "Whatever you leave stays here. forever." is beautiful copy
- The avatar creator is genuinely novel — no comparable tool has this
- Stamps glow against the dark background — the pink ASCII character pops
- The app is functional end-to-end: compose, place, persist

### What Feels MVP

1. **The canvas is dead.** One lonely stamp doesn't tell a story of community — it tells a story of abandonment. Portfolio reviewers will land, see emptiness, and leave.

2. **The aesthetic is uniform, not characterful.** Everything is #00CCFF on #0D0D2B. Every button, border, accent — same cyan, same dark panel. Old web pages weren't uniform. They had personality, quirks, decorations.

3. **The composer dominates the experience.** When open, it IS the entire app. The canvas disappears. The canvas (the art, the community) should be the hero.

4. **No texture or warmth.** Too clean, too designed. Old web pages had tiled backgrounds, separators, decorative borders. This app needs to feel more "made" and less "designed."

5. **The "about" modal is a placeholder.** "YOUR_PORTFOLIO_URL_HERE" is still in the code.

6. **No belonging moment.** After stamping, you get "✓ stamped" and nothing else. No emotional payoff.

---

## UX Copy Audit

### Critical Fix: Name Inconsistency

The boot sequence says "COLLECTIVE CANVAS BBS" but the welcome modal says "creative canvas" and the about modal says "creative canvas." The HTML title also says "Creative Canvas." Fix to "Collective Canvas" everywhere.

**Locations:**
- Welcome modal title: "welcome to creative canvas." → "welcome to collective canvas."
- About modal title: "about creative canvas." → "about collective canvas."
- index.html `<title>`: "Creative Canvas" → "Collective Canvas"

### Placeholder to Fix

- About modal: `href="YOUR_PORTFOLIO_URL_HERE"` — replace with real URL or remove

### Copy That's Working (Keep As-Is)

- "whatever you leave stays here. forever."
- "you are visitor #0047"
- "✓ stamped" (will be changed to "✓ you're on the wall" for Act 4)
- "pick a face" / "pick your hair" / "make it yours"
- "little decorations"
- "click anywhere to place your mark"
- "+ leave a mark"

### Copy Changes Recommended

| Current | Proposed | Rationale |
|---------|----------|-----------|
| "the canvas is empty / be the first to leave a mark" | "nothing here yet. / be the first." | Shorter, more mysterious |
| "drag or scroll to pan · ctrl+scroll to zoom · tap your own stamps to edit" | "scroll to wander · pinch to zoom · tap your stamps to edit" | "Wander" matches drift energy, simpler |
| "an infinite canvas. drift around, find a corner that feels yours, leave a mark." | "an infinite wall. drift around, find a corner that feels yours, leave a mark." | "Wall" is more physical, more guestbook |
| "inspired by the early web — when ASCII art was how people said 'i was here.'" | "inspired by BBS culture — when ASCII art was how people said 'i was here.'" | More specific, matches boot sequence |
| "paste, type, or haiku / feel free to make it yours." | "type anything. / ascii, poetry, a name — whatever feels right." | More inviting, concrete examples |
| "add a name or message below..." | "sign your work..." | More personal, guestbook energy |
| "designed & built by zee, 2026. / react · supabase · a lot of revisions." | "made by zee, 2026. / react · supabase · a lot of late nights." | Warmer |
| "[ leave a mark ]" (composer title) | "[ make your mark ]" | Shift from passive to active |
| "pick a face" (avatar step 1) | "start with a base" | Reframes selection as beginning, not end |
| "make it yours" (avatar step 3) | "now make it weird" | Gives permission, adds personality |
| "✓ stamped" (toast) | "✓ you're on the wall" | Connects to belonging narrative |

---

## Composer Redesign — Approach B (Remix Model)

### Problem

The current composer is a menu, not a workshop. The 3-step wizard (pick face → pick hair → edit) makes creation feel like catalog shopping. Steps 1 and 2 are SELECTION, not CREATION. The editing workspace (step 3) is an afterthought when it should be the main event.

### Solution: Remix Model

Collapse the 3-step wizard into a 2-panel layout:

**Top section:** A scrollable row of base template thumbnails (faces, presets) — small, clearly labeled "start with one of these." All templates visible at once.

**Bottom section:** The big editable workspace, always visible, always the main event. When you tap a template, it loads into the workspace. You immediately start editing.

**Tab bar stays:** avatar / preset / text — but the avatar tab loses its wizard steps. It becomes: small template row + big workspace. One screen, not three.

**ASCII building blocks row:** Below the workspace, a row of tappable ASCII symbols for quick insertion: eyes (◉ ● ○ ◕), mouths (‿ ◡ ω ︵), decorations (✦ ★ ♡ ~). Tap to insert at cursor position. These give people tools, not just choices.

### Key Principle

The template is scaffolding, not the product. The workspace is the star. The flow shifts from "pick → pick → small edit" to "pick starting point → BIG EDIT."

---

## Parked Features (V2)

### Chatroom / Messenger ASCII Character Generator

**Concept:** A chatroom/messenger-style UI where users describe themselves in a prompt and receive a generated ASCII character.

**Why parked:** Two versions were evaluated:
- **AI-generated (Claude API):** LLMs are inconsistent at generating good ASCII art. 50/50 quality means the core experience is unreliable. Also shifts ownership from user to AI.
- **Guided character creator in messenger UI:** Requires drawing dozens of ASCII art components that align on a grid. Massive art asset pipeline before it's even a code problem.

Neither version addresses the core problems (empty canvas, confused aesthetic, no story arc). Both are scope creep that would consume weeks while fundamentals remain unfinished.

**Revisit when:** The canvas is seeded, the reskin is polished, and the core experience is portfolio-ready. The guided messenger version is the better of the two if pursued.

---

## Phased Execution Plan

### Phase 0: Seed the Canvas (HIGHEST PRIORITY)
**Effort:** 4–6 hours (art creation, non-technical)
**Story impact:** Unlocks Act 1 entirely

Draw 40–60 ASCII stamps. Mix of:
- Characters (faces, full bodies) — use avatar creator for some
- Animals and objects
- Text messages ("hello from bangalore, 2026", "first!", little poems, quotes)
- Little scenes and decorations

Scatter across the canvas at varied x/y positions. Mix up colors. Create sense of history and discovery.

**Time-saving approach:** Draw 15–20 unique stamps by hand. Use avatar creator to generate 20–30 character variations. Write a batch insert script (Claude Code) to place them with good distribution across the canvas.

### Phase 1: Composer Restructure
**Effort:** 2–3 hours (code changes)
**Story impact:** Fixes Act 2

Implement Approach B (remix model):
- Collapse 3-step wizard to 2-panel layout
- Template thumbnails in scrollable row at top
- Big editable workspace always visible below
- Add ASCII building blocks row for quick character insertion
- Tab bar stays (avatar / preset / text)

### Phase 2: Copy & Consistency Fixes
**Effort:** 30 minutes (text changes)
**Story impact:** Voice, intention, credibility

- Fix "Creative Canvas" → "Collective Canvas" everywhere (welcome, about, HTML title)
- Fix YOUR_PORTFOLIO_URL_HERE placeholder
- Apply all copy changes from the audit table above
- Ensure lowercase labels throughout (not uppercase)

### Phase 3: The Belonging Moment (Post-Stamp Animation)
**Effort:** 1–2 hours
**Story impact:** Creates Act 4

After a stamp is placed successfully, the camera slowly zooms out over 1.5 seconds to show the stamp in context — surrounded by other stamps. Then settles. The visitor sees themselves as part of the wall.

Replaces the flat "✓ stamped" with an emotional climax. Toast changes to "✓ you're on the wall."

Implementation: animate pan/zoom state variables after successful Supabase insert. The mechanics already exist.

### Phase 4: Visual Warmth
**Effort:** 1–2 hours (CSS only)
**Story impact:** World-building, breaks the monotone

**A) Second accent color — yellow (#FFFF55):**
Already used in boot sequence title. Use sparingly elsewhere:
- "stamp it" button becomes yellow instead of cyan
- Visitor counter number in yellow
- Key CTAs in yellow
- Cyan remains structural (borders, links, indicators)

**B) Subtle background texture:**
Faint noise/grain overlay via CSS. A tiny repeating SVG pattern at 3–5% opacity. Old screens had noise. One CSS declaration.

**C) ASCII box-drawing borders on welcome modal:**
Replace CSS borders with rendered ASCII box-drawing characters (╔══╗ ║ ╚══╝). From the original spec but not yet implemented. One or two ASCII-bordered elements add disproportionate character.

### Phase 5: Canvas Polish
**Effort:** 2–3 hours
**Story impact:** Makes the canvas feel alive

**A) Grid refinement:** Make grid feel more like old terminal graph paper — brighter dots at intersections, or small + characters at grid crossings in very low opacity.

**B) Stamp hover glow:** When hovering near any stamp (not just your own), show a subtle glow or scanline effect. Makes the canvas feel responsive, not static.

**C) "Last placed" pulse:** A subtle animation on the most recently placed stamp. Gives the canvas a sense of time and activity.

**D) Custom cursor:** Block cursor (█) when hovering the canvas. Crosshair when in placing mode. Reinforces the terminal world.

### Phase 6: Portfolio Polish
**Effort:** 1–2 hours
**Story impact:** Reviewer readiness

**A) About modal upgrade:** Add design intent line: "inspired by textfiles.com and BBS culture — when leaving a mark was how people said hello." Replace placeholder portfolio URL. This is where portfolio reviewers decide if it's a real project or a tutorial exercise.

**B) OG meta tags & social preview:** Design what appears when the link is shared: dark background, a few ASCII stamps, "Collective Canvas — a shared wall for ASCII art." Portfolio reviewers often first encounter projects as shared links.

**C) Ambient sound toggle (optional):** Very faint background hum or static crackle, like an old CRT. Mute/unmute toggle in corner. Separates portfolio pieces from side projects.

---

## Time Budget Summary

| Phase | What | Effort | Priority |
|-------|------|--------|----------|
| Phase 0 | Seed the canvas (40–60 stamps) | 4–6 hrs | DO FIRST — nothing else matters without this |
| Phase 1 | Composer restructure (remix model) | 2–3 hrs | High — fixes creation story |
| Phase 2 | Copy & naming fixes | 30 min | High — fastest credibility boost |
| Phase 3 | Post-stamp zoom-out animation | 1–2 hrs | High — creates belonging moment |
| Phase 4 | Visual warmth (yellow accent, texture, ASCII borders) | 1–2 hrs | Medium — world-building |
| Phase 5 | Canvas polish (grid, hover, pulse, cursor) | 2–3 hrs | Medium — makes canvas feel alive |
| Phase 6 | Portfolio polish (about, OG tags, ambient sound) | 1–2 hrs | Medium — reviewer readiness |

**Total estimated effort: 12–18 hours across ~1 week of focused work.**

**Execution order:** Phase 0 → Phase 2 → Phase 1 & 3 together → Phase 4 → Phase 5 → Phase 6

---

## Reference Inspirations

- **textfiles.com** — The cultural archive of ASCII art and BBS history. The specific emotional and conceptual anchor for Collective Canvas.
- **sandspiel.club** — Gold standard for a tiny creative web toy that became a beloved portfolio piece. Teaches: the craft of the feel is what people remember.
- **r/place (Reddit)** — Proved collaborative canvas works at scale. Differentiator: Collective Canvas is expressive (multi-character stamps vs single pixels).
- **YourWorldOfText.com** — Infinite text grid. Its emptiness IS the aesthetic. Teaches: simplicity is powerful.
- **GeoCities / Orkut** — Visual nostalgia references for the old-web direction.
- **adelfaure.net/ascii_facemaker** — Reference for the ASCII character creator concept.

---

## Key Design Principles

1. The cultural anchor is ASCII art history — BBS textfiles, ANSI art, the community of writers and artists who created within the 128-character constraint.
2. The aesthetic should evoke text-based spaces: bulletin boards, textfile archives, shared digital walls. The beauty is in the constraint.
3. Simple over clever. If it feels over-engineered, it's wrong.
4. The canvas is the star. UI frames the art, never competes with it.
5. This is a living guestbook — strangers leaving their mark on a shared wall.
6. Every design choice should serve the story: arrive → create → place → belong.
7. "Someone's personal BBS board they were proud of" — not Matrix, not hacker, not clean SaaS.

---

## Technical Notes

- **Supabase free tier pauses after inactivity.** If stamps stop loading and console shows ERR_NAME_NOT_RESOLVED, go to supabase.com and resume the project.
- **The reskin was applied via Claude Code** across multiple files — not just index.html and App.jsx. Use `git status` to see all changed files.
- **Workflow:** Direction and design critique in claude.ai chat. Execution via Claude Code (targeted changes) or GitHub web editor (for small edits).
- **CLAUDE.md file** in repo root can carry project context into future Claude Code sessions automatically.
