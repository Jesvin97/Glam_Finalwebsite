# Glammore Intro Animation — Integration Guide

## What This Is

A full-screen **particle intro animation** built with Three.js and React. It displays a field of 5,000 gold particles rotating around the Glammore logo on a pure black background.

- **📱 Mobile** — particles react to gyroscope tilt and touch drag (`IntroSceneV2B`)
- **🖥️ Desktop** — particles react to mouse movement (`IntroSceneV3`)

It is designed to act as a **loading screen** that plays once when a user first visits the site, then transitions smoothly into the main website.

---

## Ideal Timing Breakdown

Total target duration: **≤ 1.3 seconds**

| Phase | Duration | What Happens |
|---|---|---|
| **Fade In** | 0.0s – 0.2s | Particles and logo fade in from black |
| **Hold** | 0.2s – 0.9s | Animation plays, main site loads in background |
| **Fade Out** | 0.9s – 1.3s | Everything fades back to black, main site appears |

> **Why under 1.3 seconds?**
> Research shows users tolerate branded intros up to ~2s, but anything over 1.5s starts feeling like a delay. Keeping it at 1.3s feels intentional and premium — not a loading problem.

---

## UX Tip — Let Users Know Something Is Happening

Add a **very subtle hint** so users don't think the page is broken:

- A thin **gold progress bar** at the very bottom of the screen that fills from left to right over 1.3s
- Or a small pulsing gold dot in a corner
- The logo itself fading in acts as a visual anchor — users instinctively wait for a logo to finish appearing

**Do NOT add a spinner** — it signals "loading problem" not "premium intro."

---

## File Structure — Where to Place Things

Place the animation folder inside your existing project like this:

```
your-existing-project/
├── src/
│   ├── components/
│   │   ├── IntroSceneV2B.jsx      ← Mobile version
│   │   ├── IntroSceneV3.jsx       ← Desktop version
│   │   └── ParticleField.jsx      ← Base particle logic
│   ├── assets/
│   │   └── glammore-logo.png      ← Logo file
│   └── App.jsx                    ← Update this (see below)
```

> If your project does not have a `components/` folder, create one inside `src/`.

---

## What to Install

Run this in your project root terminal:

```bash
npm install three @react-three/fiber @react-three/drei
```

| Package | Why |
|---|---|
| `three` | The core 3D rendering engine |
| `@react-three/fiber` | React wrapper for Three.js |
| `@react-three/drei` | Helpers (OrbitControls, etc.) |

---

## How to Integrate into Your Existing App.jsx

Replace or update your main `App.jsx` with this pattern:

```jsx
import { useState, useEffect } from "react";
import IntroSceneV2B from "./components/IntroSceneV2B"; // mobile
import IntroSceneV3 from "./components/IntroSceneV3";   // desktop
import MainWebsite from "./MainWebsite";                 // your existing site

const isMobile =
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  window.matchMedia("(max-width: 768px)").matches;

const INTRO_DURATION = 900;   // ms — how long intro holds (0.9s)
const FADE_DURATION  = 400;   // ms — fade out duration (0.4s)
// Total = 900 + 400 = 1300ms = 1.3 seconds ✅

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [fading,    setFading]    = useState(false);

  useEffect(() => {
    // Start fade-out after hold duration
    const holdTimer = setTimeout(() => setFading(true), INTRO_DURATION);

    // Remove intro after fade completes
    const removeTimer = setTimeout(
      () => setShowIntro(false),
      INTRO_DURATION + FADE_DURATION
    );

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {/* Main website sits underneath from the start */}
      <MainWebsite />

      {/* Intro overlays on top, then fades away */}
      {showIntro && (
        <div
          style={{
            position:   "fixed",
            inset:      0,
            zIndex:     9999,
            opacity:    fading ? 0 : 1,
            transition: `opacity ${FADE_DURATION}ms ease`,
            pointerEvents: fading ? "none" : "all",
          }}
        >
          {isMobile ? <IntroSceneV2B /> : <IntroSceneV3 />}

          {/* Subtle gold progress bar — tells users something is happening */}
          <div style={{
            position:   "absolute",
            bottom:     0,
            left:       0,
            height:     "2px",
            background: "linear-gradient(90deg, #d4af37, #a07c20)",
            animation:  `progress ${INTRO_DURATION}ms linear forwards`,
          }} />
        </div>
      )}
    </>
  );
}
```

Then add this CSS animation to your `index.css` or `App.css`:

```css
@keyframes progress {
  from { width: 0%; }
  to   { width: 100%; }
}
```

---

## If Your Main Site Is on a Separate HTML Page (Not React)

If your existing site is plain HTML/JS (not a React app), use this approach instead:

1. Host the animation as a **standalone page** (e.g. `intro.html`)
2. At the end of the animation timer, redirect:

```js
setTimeout(() => {
  window.location.href = "/home"; // or wherever your main site is
}, 1300);
```

3. Point your domain root (`/`) to `intro.html` so it runs first on every visit.

> **Tip:** Store a `sessionStorage` flag so the intro only plays **once per session**, not on every page navigation:

```js
// At the top of your App.jsx or intro script:
if (sessionStorage.getItem("introSeen")) {
  // Skip intro, go straight to main site
} else {
  sessionStorage.setItem("introSeen", "true");
  // Show intro
}
```

---

## Checklist

- [ ] Copy `IntroSceneV2B.jsx`, `IntroSceneV3.jsx`, `ParticleField.jsx` into `src/components/`
- [ ] Copy `glammore-logo.png` into `src/assets/`
- [ ] Run `npm install three @react-three/fiber @react-three/drei`
- [ ] Update `App.jsx` with the integration code above
- [ ] Add `@keyframes progress` to your CSS
- [ ] Add `sessionStorage` check so intro only plays once per session
- [ ] Test on mobile (gyro/touch) and desktop (mouse)
