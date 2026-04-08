# Art Sous le Manguier — Refonte UX/UI immersive maîtrisée

## Démarrage

```bash
pnpm install
pnpm dev
```

## Principes appliqués
- Clarté avant effets (hiérarchie visuelle, CTA principal, navigation lisible)
- Navigation hybride: header persistant + expérience immersive guidée
- Mobile-first avec fallback immersif allégé
- Design system simple (tokens couleur, spacing 8px, états interactifs)

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS + variables CSS
- Framer Motion / GSAP ScrollTrigger
- Three.js via React Three Fiber
- Web Audio API

## Contenu
Le contenu est parsé depuis `Documentation/web_content-ASLM.md` via `lib/content-parser.ts`.
