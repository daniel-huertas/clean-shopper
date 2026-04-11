# Project Context Document
**Project:** Clean Shopper
**Date:** 2026-03-30
**Source:** CCDCourse_CleanShopper_ProjectBrief.md — course demo project brief
**Version:** 1.0

---

## 1. Problem Statement
Consumers who want to avoid toxic or harmful ingredients in home and personal care products cannot easily do so — product labels are confusing, "clean" and "natural" claims are unverified, and researching alternatives requires cross-referencing multiple sources. The research burden is high enough that most people give up and default to familiar but potentially harmful products.

## 2. ICP (Ideal Customer Profile)
Someone actively trying to replace toxic cleaning products, harmful personal care items, or problematic pantry staples in their home. They are already motivated — they've started reading labels, heard about EWG or similar resources, or made some swaps — but find the research fragmented and time-consuming. They are not an expert; they need interpretation, not raw data. They shop regularly and accumulate preferences over time but have no system to store or apply them.

## 3. Pain Points
- Ingredient lists require expertise to interpret; most consumers can't evaluate what they're reading
- "Clean," "natural," and "non-toxic" claims on packaging are marketing, not standards — users can't trust them at face value
- Researching alternatives means bouncing between EWG, review sites, brand websites, and forums — slow and fragmented
- Preferences and trusted brands built up through past research live nowhere — users repeat the same research every time they shop

## 4. Proposed Solution
Users can describe what product they're looking for and receive AI-generated recommendations with ingredient safety reasoning. Users can save preferences — ingredients to avoid, trusted brands, certifications that matter to them — and have those applied automatically to every recommendation. Recommended products can be added to a persistent shopping cart. Users can ask for side-by-side comparisons of products and get a clear recommendation based on their saved preferences.

## 5. Success Metrics
Not defined in source material.

## 6. Design Constraints
**Platform:** Web (Vite + React frontend)
**Geography:** Not defined in source material
**Accessibility:** Not defined in source material
**Technical:** React + Vite frontend; Supabase (PostgreSQL) for persistence; Claude API (claude-sonnet-4-20250514) for AI reasoning; EWG Skin Deep API for ingredient safety data; Tailwind CSS for styling; Vercel for deployment. No authentication in V1 — single-user only. No checkout, payment processing, direct retailer integrations, or barcode scanning in V1.
**Other:** Built as a course demo project; designed to be built incrementally across four weekly sessions.

## 7. Open Questions
1. How are "clean standards" defined — is there a fixed rubric, or does Claude reason from EWG scores plus user preferences? **Partially answered:** the score → level mapping is now a fixed rubric (see §9). The underlying score *source* (EWG lookup, Claude reasoning, or a blend) is still open, as is whether user preferences shift the thresholds.
2. What does the preference management UI look like — free-form text, structured inputs, or both?
3. How are products identified and stored — by URL, retailer SKU, a canonical product ID?
4. What happens when EWG has no data for a product's ingredients — how does the app handle incomplete safety data?
5. Is the shopping cart exportable or shareable, or purely for personal reference?
6. What triggers a "new" product research session versus continuing a prior one?

## 8. Gaps
1. **Success Metrics** — No measurable outcomes are defined in the brief. Needed to evaluate design decisions and prioritize features.
2. **Geography / Locale** — No mention of where the product launches or whether ingredient databases and product availability are US-only. Matters for data source scope.
3. **Accessibility requirements** — No WCAG level or specific accessibility needs stated. Needed before visual design decisions are finalized.
4. **Error and edge case handling** — No guidance on what the experience should be when the AI can't find a product, EWG returns no data, or a user's preferences conflict with available options.
5. **Comparison UX scope** — "Compare products" is listed as a feature but the trigger, input method, and output format are unspecified.

## 9. Safety Rating Rubric (Provisional)
**Status:** Provisional decision made on 2026-04-11 while seeding the `products` table. Subject to revision once the underlying score source is decided (see Open Question #1).

### Score scale
`safety_score` is an integer from `0` to `100` (stored as `smallint` / `int2`). Higher is cleaner.

- `0` — worst possible safety profile
- `100` — best possible safety profile

The 0–100 scale was chosen over EWG's native 1–10 (inverted) to give finer-grained scoring headroom and to read more naturally in UI copy ("92 · Clean").

### Score → level mapping
`safety_level` is a categorical label derived from `safety_score` using fixed thresholds:

| Score range | Level | UI treatment |
|---|---|---|
| `80–100` | `clean` | Green badge (`bg-success`) |
| `50–79` | `caution` | Yellow badge (`bg-warning`) |
| `0–49` | `avoid` | Red badge (`bg-error`) |

These thresholds are the current rubric — they should be enforced in both the database (via CHECK constraints on `safety_score` range and `safety_level` enum values) and any code path that assigns a level from a score.

### What this rubric does *not* decide
- **Where the raw score comes from.** EWG API lookup, Claude reasoning, a blend, or a cached value — still open.
- **Whether user preferences shift the thresholds.** A user who wants to be stricter might see the cutoff for `clean` move from 80 to 90. Not decided.
- **How to handle missing data.** If a product's ingredients can't be scored (EWG has no data, Claude can't find a reliable source), should `safety_score` / `safety_level` be `NULL`, or should there be a fourth level like `unknown`? Not decided. For now the columns are nullable.

---
*Generated by /project-context skill. Add to this document as decisions are made and questions are resolved.*
