# Project Specs — Lush Plugins Website

## What the app does

Single-page marketing website for **Lush Plugins**, a premium audio plugin brand for music producers. The site showcases individual plugins, the flagship Lush Suite product, and the brand story. No backend, no auth, no database — static frontend only.

---

## Who uses it

Music producers, mix engineers, and audio professionals looking for premium plugins.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion 12
- **Fonts:** Geist Sans, Geist Mono (Google Fonts)
- **Deployment:** Vercel (auto-deploys from `main` branch)
- **Live URL:** https://stagex-website.vercel.app/

---

## Color Scheme

| Token     | Hex       | Usage                    |
|-----------|-----------|--------------------------|
| Primary   | `#7900ff` | Purple — buttons, glows  |
| Secondary | `#0531fa` | Blue — background glows  |
| Tertiary  | `#00bcff` | Cyan — hover accents     |
| Accent    | `#f2a80d` | Gold — highlights, tags  |
| Background| `#0a0a0a` | Near black               |
| Foreground| `#ededed` | Off white text           |

---

## Page Sections (top to bottom)

### 1. Navbar
- Fixed top bar with backdrop blur
- Links: Plugins, About, Contact
- "LUSH PLUGINS" branding with wave text animation

### 2. Hero
- Tagline: "Audio Tools for Creators"
- Headline: "LUSH" + rotating word (AUDIO, PLUGINS, VERB, COMP, etc.)
- Two CTAs: "Explore Plugins" and "Learn More"
- Animated grid background with dual radial glow

### 3. Plugins Section
- Grid of 21 plugin cards (2-col tablet, 3-col desktop)
- Each card shows: name, tagline, mini mock UI, price, status
- Only **Lush Harmonix** is available now ($99, on sale from $129)
- All others are "Coming Soon" at $49–$99
- Every plugin includes the signature "Lush Knob" (one-touch reverb)

### 4. Lush Suite Section (Flagship)
- "Your entire signal chain in one plugin" — $12.99/month
- Interactive rack UI showing preset chains:
  - Vocal Chain — Warm (7 modules)
  - E-Mastering — Loud (7 modules)
  - Backup FX — Thick (7 modules)
- Preset selector dropdown with animated transitions
- Feature cards: Preset Chains, Marketplace, Basic & Advanced modes
- Signal flow visualization: INPUT → Modules → OUTPUT

### 5. About Section
- "Built by engineers and producers, made for engineers and producers."
- Emphasizes workflow, ergonomic UI, staying out of your way

### 6. Footer
- Branding with wave effect
- Social links: Twitter, Instagram, Email (currently non-functional)
- Auto-year copyright

### 7. CursorGlow (Enhancement)
- Desktop-only custom cursor with trailing purple glow

---

## Components

| File                  | Purpose                                      |
|-----------------------|----------------------------------------------|
| `Navbar.tsx`          | Fixed navigation bar                         |
| `Hero.tsx`            | Main headline with rotating words            |
| `PluginsSection.tsx`  | Plugin grid layout                           |
| `PluginCard.tsx`      | Individual plugin card with 3D hover effects |
| `PluginMockUI.tsx`    | Mini UI mockups (knobs, faders, EQ curves)   |
| `LushStudioSection.tsx` | Flagship Suite showcase with rack UI      |
| `AboutSection.tsx`    | Brand messaging                              |
| `Footer.tsx`          | Footer with social links                     |
| `CursorGlow.tsx`      | Custom cursor trail effect                   |

---

## Products & Pricing

### Individual Plugins ($49–$99 each)

**$99 plugins:** Harmonix, Verb, Comp, Pro Q, Delay, Gate, Limiter, SoftClip, Auto-Tune, Saturation, Chorus, Flanger, Phaser, Doubler, Distortion, Exciter, Imager, Multi-Band

**$49 plugins:** De-Esser, De-Plosive, Key & BPM, Loudness Meter

### Lush Suite — $12.99/month
All plugins in one unified interface with preset chains, cloud sync, and marketplace.

---

## Visual Effects

- Film grain overlay (CSS animation)
- Cursor glow trail (desktop only)
- 3D perspective card hover with mouse-follow glow
- Scroll-triggered entrance animations (Framer Motion)
- Rack module animations (knob rotation, bar pulse, SVG path draw)
- Letter-by-letter word rotation in hero (2500ms per word)

---

## What "done" looks like

The site loads fast, looks premium on all screen sizes, and clearly communicates what Lush Plugins offers. Every section is visually polished with smooth animations. No console errors, no broken layouts, no dead links.
