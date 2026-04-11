# Clean Shopper — Claude Code Instructions

## Project
Clean Shopper is a personal product research assistant for ingredient-aware consumers. Users search for home and personal care products, get AI-generated clean/not-clean assessments based on ingredient safety data, save products to a personal library organized by category, and build shopping lists.

Single-user app. No authentication in V1. Local state plus Supabase for data persistence.

## Tech Stack
- React (Vite) -- frontend UI
- Supabase -- database and data layer (PostgreSQL)
- Claude API (claude-sonnet-4-20250514) -- AI product research and ingredient analysis
- EWG Skin Deep API -- ingredient safety data
- Vercel -- deployment
- Tailwind CSS -- styling

## Conventions
- Components: PascalCase filenames, one component per file, lives in /src/components/
- File placement: Shared components reused across screens belong in /src/components/. Files specific to one screen belong in that screen's folder under /src/features/. Do not mix the two — if a component is only used by one screen, keep it under that feature folder; if it gets reused elsewhere, promote it to /src/components/.
- Utility functions: camelCase, lives in /src/lib/
- API calls: all external API calls through /src/lib/api/, never inline in components
- Styling: Tailwind only. No inline styles. No CSS modules.
- Styling: Use Tailwind theme classes for all design token values. Never hardcode hex colors, pixel font sizes, or spacing values in components. If a needed token does not exist in the Tailwind config, add it there rather than hardcoding the value. This means bg-primary not #2D7B5E, text-h3 not text-lg, p-lg not p-4.
- State: React useState and useContext only. No Redux, no Zustand.
- File naming: kebab-case for all non-component files
- Components: Always check /docs/component-spec.md before building any UI element. If an existing component covers the use case, use it. Only create a new component if no spec covers the pattern, and add the new component to component-spec.md before moving on.

## Do Not
- Do not add user authentication or account features -- V1 is single-user only
- Do not use CSS other than Tailwind
- Do not add features outside the current build phase without asking first
- Do not create new components when an existing component in the component library covers the use case
- Do not use any AI model other than claude-sonnet-4-20250514

## References
- Component library: See /docs/component-spec.md -- use existing components before creating new ones
- Build plan: See /docs/build-plan.md -- build phase by phase, do not jump ahead
- Project context: See /docs/project-context.md -- full project intake and design decisions
- Tailwind config: See tailwind.config.js for design tokens as Tailwind theme extensions. Always use theme classes, never hardcode values
- Component spec: See /docs/component-spec.md — use existing components before creating new ones. Follow the spec for props, states, and visual structure.

## Skill References

- Use `/project-context` to generate a structured Project Context Document from any project input (PRD, brief, bullet points, notes, screenshots). Produces nine sections: problem, ICP, pain points, solution, success metrics, design constraints, user research insights, open questions, and gaps. Also captures project owner, product owner, and design owner.
- Use `/prompt-optimizer` to evaluate and refine instructions before sending them.
- Use `/design-system-generator` to define a product's visual language through a guided conversation. Asks feeling-oriented questions across two phases (vision/feel and visual territory), then generates two outputs: `docs/design-system.html` (visual artifact) and `docs/design-system.md` (structured documentation). No component-specific outputs — those come from a separate skill.

## Design System

This project has a defined design system. Reference these files when building any UI:
- **Visual artifact:** `docs/design-system.html` — open in a browser to preview colors, typography, spacing, and shape
- **Documentation & tokens:** `docs/design-system.md` — full design rationale, all token values, and CSS custom properties

Always use the design tokens defined in the design system when writing styles. Do not hard-code colors, font sizes, spacing, or border-radius values — use the corresponding CSS custom property from the token system.
