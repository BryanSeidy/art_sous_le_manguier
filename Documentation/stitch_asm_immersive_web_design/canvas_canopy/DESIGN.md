# Design System Document: Ethno-Futurist Editorial

## 1. Overview & Creative North Star: "The Digital Curator"
This design system is built to honor the intersection of ancestral heritage and future-forward digital craft. Our Creative North Star is **"The Digital Curator."** We are not building a standard website; we are designing a high-end, immersive gallery experience that feels as organic as a mango grove yet as precise as a modern architectural marvel.

To break the "template" look, we move away from rigid, boxed grids. We embrace **intentional asymmetry**, where images may bleed off-canvas or overlap with typography. We use a high-contrast typography scale to create a cinematic rhythm—guiding the user’s eye through a narrative rather than a list of features.

---

## 2. Colors: Tonal Depth & Organic Vibrancy
Our palette is a dialogue between the earth (`Dark Neutral`) and the canopy (`Primary Green`), punctuated by the sun (`Mango Yellow`).

### Core Palette Roles
*   **Primary (`#358A63`):** Use for deep immersion. This `Primary Green` is our "Forest" base for hero sections.
*   **Secondary (`#FFB800`):** Our `Mango Yellow` accent. Reserved for high-intent actions and critical highlights.
*   **Tertiary (`#585858`):** This `Dark Neutral` is for grounding elements, sophisticated labels, or subtle background shifts.
*   **Neutral (`#F9F7F2`):** An off-white, "bone" canvas that prevents the clinical coldness of pure white.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section content. Boundaries must be defined through background color shifts. To separate a testimonial from a gallery, transition from `surface` to `surface_container_low`. 

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper or canvas. 
*   **Base:** `surface`
*   **Nested Cards:** Use `surface_container_low` for subtle depth.
*   **Elevated Elements:** Use `surface_container_high` to draw immediate focus.

### The "Glass & Gradient" Rule
To achieve "Ethno-Futurism," blend the organic with the digital. Use **Glassmorphism** for navigation bars or floating image captions:
*   `surface` at 70% opacity + `backdrop-blur: 12px`.
*   **Signature Texture:** Apply a subtle radial gradient on large backgrounds, moving from `primary` to `primary_container` to simulate natural light filtering through leaves.

---

## 3. Typography: The Editorial Voice
We pair the timeless authority of a serif with the functional clarity of a geometric sans-serif.

*   **Display & Headline (`notoSerif`):** These are our "Art Pieces." 
    *   `display-lg` (3.5rem) should be used sparingly for poetic, low-density headers.
    *   Tighten letter-spacing slightly (-0.02em) for a high-end editorial feel.
*   **Title & Body (`manrope`):** Our "Information Layer."
    *   `body-lg` (1rem) is the workhorse. Ensure a generous line-height (1.6) to maintain an "airy" and premium reading experience.
*   **Labels (`manrope`):** Use `label-md` in All-Caps with +0.05em tracking for metadata or category tags to evoke a "curator’s note" aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "software-like." We use **Ambient Depth**.

*   **The Layering Principle:** Place a `surface_container_lowest` card on a `surface_container_low` background. The difference in hex value provides a soft, natural lift without a single pixel of "shadow."
*   **Ambient Shadows:** For floating CTAs, use a shadow color tinted with the primary hue: `rgba(26, 47, 35, 0.08)` with a 32px blur and 8px Y-offset.
*   **The "Ghost Border" Fallback:** If accessibility requires a border (e.g., input fields), use `outline_variant` at **20% opacity**. It should be felt, not seen.

---

## 5. Components: Organic Primitives

### Buttons
*   **Primary:** `primary` background with `on_primary` text. **Shape:** `Roundedness: lg (1rem)`. This avoids the "pill" cliché while remaining organic.
*   **Secondary:** `surface_container_highest` background. No border. Use for secondary gallery actions.
*   **Interaction:** On hover, shift background to `primary_container` and add a subtle `0.5rem` lift.

### Cards & Lists
*   **Rule:** Forbid divider lines. Use `spacing.xl` (1.5rem) to separate list items.
*   **Organic Shapes:** Apply `roundedness.xl` to one corner (e.g., top-left) and `roundedness.md` to others to create a custom "leaf-like" or "hand-carved" feel for image containers.

### Input Fields
*   **Style:** Minimalist. No bottom line or full box. Use `surface_container` as a subtle background block with `roundedness.sm`.
*   **Focus:** Transition background to `surface_container_high` and change the label color to `secondary` (Mango).

### Additional Signature Components
*   **The "Canvas" Overlay:** A full-screen transition using a very light grain texture over the `surface` color to mimic physical paper during page loads.
*   **The "Indigo Pulse":** Use the Indigo highlight (`#2E3192`) exclusively for interactive micro-moments, like a small dot appearing under a selected navigation item.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical margins. If the left margin is 80px, try a 120px right margin for a more editorial, rhythmic layout.
*   **Do** overlap elements. Allow a `display-lg` headline to partially sit over an image with a `multiply` blend mode.
*   **Do** prioritize white space. In this system, "Luxury" is defined by the space you *don't* fill.

### Don't:
*   **Don't** use pure black (#000000). Use `on_surface` (#1B1C19) for all text to keep the "organic" feel.
*   **Don't** use standard 4px border radii. It looks like a generic SaaS app. Stick to our `lg` and `xl` scales.
*   **Don't** use hard transitions. Every color change should feel like a change in lighting, not a change in "boxes."