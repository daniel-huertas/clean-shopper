# Component Specification: Clean Shopper
**Version:** 1.0
**Last Updated:** 2026-04-03
**Source:** Cross-referenced from CLAUDE.md, /docs/design-system.md, and tailwind.config.js

---

## How to Use This Document

This file defines every reusable UI component in Clean Shopper. Before creating a new component, check here first — if a component already covers the use case, use it. All visual values reference Tailwind theme tokens from tailwind.config.js and the @theme block in globals.css. Never hardcode hex colors, pixel sizes, or spacing values. If a token does not exist, add it to the Tailwind config rather than hardcoding.

---

## 1. ProductCard

**Purpose:** Displays a product summary with its name, safety score, category, and a short description — used in search results and the saved library grid.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| name | string | yes | Product name displayed as the card title |
| safetyRating | SafetyScore | yes | One of 'clean', 'caution', or 'avoid' — passed to SafetyBadge |
| category | string | yes | Product category label — passed to CategoryTag |
| description | string | yes | Short product description, truncated to two lines |
| onClick | () => void | no | Callback when the card is tapped — opens product detail |
| isLoading | boolean | no | Shows a skeleton placeholder instead of content. Defaults to false |
| isSaved | boolean | no | Controlled save state. When true, the save button reads "Saved" and uses the secondary variant with a filled bookmark icon. Defaults to false |
| onToggleSave | () => void | no | Callback when the save button is clicked. When provided, the card renders a Save/Saved button in its footer. Clicks on the save button do not trigger `onClick` |

### Visual Structure

```
┌─────────────────────────────────────────┐
│  [CategoryTag]              [SafetyBadge] │
│                                           │
│  Product Name                             │
│                                           │
│  Two-line description text that           │
│  truncates with an ellipsis...            │
│                                           │
│  [Save to List]                           │  (rendered only when onToggleSave is provided)
└─────────────────────────────────────────┘
```

**Container:** `bg-secondary rounded-radius-lg shadow-shadow-sm p-space-lg flex flex-col gap-space-md`
**Top row:** `flex items-center justify-between gap-space-sm`
**Product name:** `text-h3 text-neutral-900`
**Description:** `text-body text-neutral-600 line-clamp-2`
**Footer (save button wrapper):** `flex items-center justify-end mt-space-xs`
**Save button:** `Button` component, `size="sm"`, `variant="primary"` when unsaved, `variant="secondary"` when saved. Label is `"Save to List"` / `"Saved"`. Clicks must call `e.stopPropagation()` so the card's `onClick` does not fire.

### States

| State | Behavior |
|---|---|
| Default | Card at rest with `shadow-shadow-sm` |
| Hover | `shadow-shadow-md` and `cursor-pointer` when onClick is provided |
| Pressed | `shadow-shadow-sm` returns (shadow resets on mousedown) |
| Loading | When `isLoading` is true, renders animated pulse placeholders (`bg-neutral-200 animate-pulse rounded-radius-md`) in place of name, badge, tag, and description. Card container remains visible. |
| Saved | When `isSaved` is true and `onToggleSave` is provided, the save button reads "Saved" and uses the secondary variant. Click toggles back to unsaved. |

### Usage Rules

- Use for any product listing — search results, browse, and saved library.
- Do not use for the full product detail view. ProductCard is a summary; detail is a separate layout.
- Always pass all required props (name, safetyRating, category, description). Do not render a ProductCard with missing fields.
- Composes SafetyBadge, CategoryTag, and Button internally. Do not duplicate their markup outside this component.
- The save button is opt-in: only rendered when `onToggleSave` is provided. Feature pages own the saved-state data and pass `isSaved` down as a controlled prop.

---

## 2. SafetyBadge

**Purpose:** Displays a product's safety rating as a colored pill — clean (green), caution (amber), or avoid (red) — used inside ProductCard, product detail, shopping list rows, and comparison panels.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| rating | SafetyRating | yes | Object with `score` (number) and `level` ('clean' \| 'caution' \| 'avoid'). Displays as "92 · Clean". |
| size | 'sm' \| 'md' | no | Controls text size and padding. Defaults to 'md' |

### Visual Structure

**Container (md):** `inline-flex items-center text-small font-semibold px-space-md py-space-xs rounded-radius-full`
**Container (sm):** `inline-flex items-center text-micro font-semibold px-space-sm py-space-xs rounded-radius-full`

**Color mapping:**

| Score | Background | Text |
|---|---|---|
| clean | `bg-success` | `text-primary-dark` |
| caution | `bg-warning` | `text-primary-dark` |
| avoid | `bg-error` | `text-white` |

### States

| State | Behavior |
|---|---|
| Default | Static display. No interactive states. |

### Usage Rules

- Use wherever a product's safety rating needs to be shown. This is the single source of truth for safety score presentation.
- Do not use semantic colors (success, warning, error) outside this component for product ratings.
- Do not add click handlers to SafetyBadge. It is display-only.
- The `sm` size is for compact contexts like shopping list rows. Use `md` (default) for cards and detail views.

---

## 3. CategoryTag

**Purpose:** Displays a product's category as a small uppercase label — used inside ProductCard, product detail, shopping list rows, and as filter chips in the saved library.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| label | string | yes | Category name to display (e.g., "Body Care", "Household") |
| removable | boolean | no | Shows an X button for removal. Defaults to false |
| onRemove | () => void | no | Callback when the X is clicked. Required when removable is true |
| active | boolean | no | Whether this tag is actively selected as a filter. Defaults to false |

### Visual Structure

**Container (default):** `inline-flex items-center bg-neutral-200 text-neutral-600 text-micro font-semibold px-space-sm py-space-xs rounded-radius-sm uppercase tracking-wide`
**Container (active):** Replace `bg-neutral-200 text-neutral-600` with `bg-primary text-white`
**Remove button (when removable):** `ml-space-xs text-neutral-400 hover:text-neutral-900` — renders an X icon inline

### States

| State | Behavior |
|---|---|
| Default | Static label with neutral background |
| Active | Inverted colors — `bg-primary text-white` — used when selected as a filter |
| Hover (removable) | X icon transitions from `text-neutral-400` to `text-neutral-900` |

### Usage Rules

- Use for product categories on cards, detail views, and list rows (non-removable).
- Use with `removable` for preference management — avoided ingredients, trusted brands, certifications.
- Use with `active` for category filter chips in the saved library view.
- Do not use CategoryTag for safety scores. Use SafetyBadge instead.
- Keep labels short — one or two words. Truncate with ellipsis if the label exceeds the container.

---

## 4. SearchBar

**Purpose:** A text input with a submit action for entering product search queries — used at the top of the search/results surface.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| value | string | yes | Controlled input value |
| onChange | (value: string) => void | yes | Callback on input change |
| onSubmit | () => void | yes | Callback when the user submits the search |
| placeholder | string | no | Placeholder text. Defaults to "Search for a product..." |
| isLoading | boolean | no | Shows a loading indicator and disables input. Defaults to false |

### Visual Structure

```
┌──────────────────────────────────────────────────┐
│  🔍  [text input                        ] [Submit] │
└──────────────────────────────────────────────────┘
```

**Outer container:** `flex items-center gap-space-sm bg-secondary rounded-radius-lg shadow-shadow-sm p-space-sm`
**Search icon:** `text-neutral-400 ml-space-sm` — a 20px magnifying glass icon
**Input field:** `flex-1 bg-transparent text-body text-neutral-900 placeholder:text-neutral-400 outline-none px-space-sm py-space-sm`
**Submit button:** Uses the Button component (primary variant, size sm). Label: "Search"

### States

| State | Behavior |
|---|---|
| Default | Input is empty or has text. Submit button is enabled. |
| Focus | Outer container gets `ring-2 ring-accent` to highlight focus |
| Loading | Input is disabled. Submit button shows a spinner and is disabled. Placeholder changes to "Researching..." |
| Empty submission | If value is empty and user submits, do nothing. Do not show an error. |

### Usage Rules

- Use only on the search/results surface. There is one SearchBar in the app.
- Do not use SearchBar for preference entry or other text inputs. Use InputField instead.
- The SearchBar submits on Enter key press and on Submit button click.
- Do not debounce — the search is an explicit action, not live filtering.

---

## 5. NavBar

**Purpose:** Top-level navigation bar with the app name and links to the four main surfaces — used on every page.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| activePage | 'search' \| 'library' \| 'cart' \| 'preferences' | yes | The currently active page, used to highlight the active nav item |

### Visual Structure

```
┌──────────────────────────────────────────────────────────┐
│  Clean Shopper          Search   Library   Cart   Prefs  │
└──────────────────────────────────────────────────────────┘
```

**Container:** `flex items-center justify-between px-space-3xl py-space-md bg-neutral-50 border-b border-neutral-200`
**App name:** `text-h4 text-neutral-900 font-semibold`
**Nav links container:** `flex items-center gap-space-xl`
**Nav link (inactive):** `text-small text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer`
**Nav link (active):** `text-small text-neutral-900 font-semibold border-b-2 border-accent pb-space-xs`

### States

| State | Behavior |
|---|---|
| Default | All links in inactive style. Active page link highlighted. |
| Hover (inactive link) | Text transitions from `text-neutral-600` to `text-neutral-900` |
| Active | Link text becomes `text-neutral-900 font-semibold` with a 2px `border-accent` bottom border |

### Usage Rules

- Render NavBar at the top of every page. It is the only navigation element.
- Do not nest NavBar inside other components. It sits at the root layout level.
- The accent-colored bottom border on the active link is the one permitted accent usage in the NavBar. Do not add accent color to other nav elements.
- Do not add icons to nav links. Text-only navigation matches the epurated brand direction.

---

## 6. Button

**Purpose:** The primary interactive element for actions — submitting forms, saving products, adding to cart, removing items.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| label | string | yes | Button text |
| onClick | () => void | yes | Callback when clicked |
| variant | 'primary' \| 'secondary' \| 'destructive' | no | Visual variant. Defaults to 'primary' |
| size | 'sm' \| 'md' \| 'lg' | no | Controls padding and text size. Defaults to 'md' |
| disabled | boolean | no | Disables the button. Defaults to false |
| isLoading | boolean | no | Shows a spinner and disables the button. Defaults to false |
| fullWidth | boolean | no | Button fills its container width. Defaults to false |
| icon | ReactNode | no | Optional icon rendered before the label |

### Visual Structure

**Base (all variants):** `inline-flex items-center justify-center font-semibold rounded-radius-md transition-all cursor-pointer`

**Size classes:**

| Size | Padding | Text |
|---|---|---|
| sm | `px-space-md py-space-xs` | `text-small` |
| md | `px-space-lg py-space-sm` | `text-body` |
| lg | `px-space-xl py-space-md` | `text-body` |

**Variant classes:**

| Variant | Default | Hover | Active | Disabled |
|---|---|---|---|---|
| primary | `bg-primary text-white` | `bg-primary-light` | `bg-primary-dark` | `bg-neutral-200 text-neutral-400 cursor-not-allowed` |
| secondary | `bg-secondary text-neutral-900 border border-neutral-200` | `bg-neutral-200` | `bg-neutral-200 border-neutral-400` | `bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed` |
| destructive | `bg-error text-white` | `bg-error/90` | `bg-error/80` | `bg-neutral-200 text-neutral-400 cursor-not-allowed` |

**Icon spacing:** When `icon` is provided, add `gap-space-sm` between icon and label.
**Loading state:** Replace label with a 16px spinner. Button width should not change (use `min-w` based on content).
**Full width:** Add `w-full` when `fullWidth` is true.

### States

| State | Behavior |
|---|---|
| Default | Resting appearance per variant |
| Hover | Background shifts per variant table above |
| Active/Pressed | Background darkens per variant table above |
| Disabled | Grayed out, `cursor-not-allowed`, no hover effect |
| Loading | Spinner replaces label, button is disabled, no hover effect |

### Usage Rules

- Use `primary` for the single most important action per view — "Search," "Save to Library," "Add to Cart."
- Use `secondary` for supporting actions — "Compare," "Cancel," filter actions.
- Use `destructive` for remove and delete actions — "Remove from Cart," "Clear All."
- Do not stack multiple primary buttons in the same view. One primary action per screen.
- Do not use Button for navigation. Use NavBar links for page changes.
- The accent color (`bg-accent`) is reserved for the single CTA per page. If the primary CTA on a view should use accent instead of primary, pass a custom className override rather than creating a new variant.

---

## 7. InputField

**Purpose:** A labeled text input for form data entry — used for adding preferences (ingredients to avoid, trusted brands, certifications) and any future form fields.

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| label | string | yes | Label displayed above the input |
| value | string | yes | Controlled input value |
| onChange | (value: string) => void | yes | Callback on input change |
| placeholder | string | no | Placeholder text |
| error | string | no | Error message displayed below the input |
| disabled | boolean | no | Disables the input. Defaults to false |
| onSubmit | () => void | no | Callback on Enter key press — useful for inline add actions |
| icon | ReactNode | no | Optional icon rendered inside the input on the left |

### Visual Structure

```
  Label Text
┌──────────────────────────────┐
│  [icon]  placeholder text    │
└──────────────────────────────┘
  Error message (if any)
```

**Label:** `text-small text-neutral-600 mb-space-xs block`
**Input container:** `flex items-center bg-neutral-100 border border-neutral-200 rounded-radius-md px-space-md py-space-sm`
**Input element:** `flex-1 bg-transparent text-body text-neutral-900 placeholder:text-neutral-400 outline-none`
**Icon (optional):** `text-neutral-400 mr-space-sm` — 16px icon
**Error message:** `text-micro text-error mt-space-xs block`

### States

| State | Behavior |
|---|---|
| Default | Neutral border and background |
| Focus | Border changes to `border-accent` with `ring-1 ring-accent` |
| Error | Border changes to `border-error`. Error message appears below in `text-error` |
| Disabled | Background changes to `bg-neutral-200`. Text becomes `text-neutral-400`. `cursor-not-allowed` |

### Usage Rules

- Use for all text input needs except the main product search (use SearchBar for that).
- Use for preference entry: adding ingredients to avoid, trusted brands, certifications.
- Always provide a `label`. Do not render an InputField without a visible label.
- When used for inline adding (e.g., "Add ingredient to avoid"), pair with `onSubmit` so Enter key triggers the add action.
- Do not use InputField for search queries. SearchBar has its own integrated input with submit button.

---

## 8. EmptyState

**Purpose:** A centered placeholder shown when a view has no content — used in search results (no results), saved library (no saved products), and shopping cart (empty cart).

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| icon | ReactNode | yes | An illustrative icon displayed above the message |
| title | string | yes | Short headline describing the empty state |
| description | string | no | Supporting text with context or next steps |
| action | object | no | Optional CTA button — `{ label: string, onClick: () => void }` |

### Visual Structure

```
        ┌───────────────────────┐
        │                       │
        │        [icon]         │
        │                       │
        │     Title Text        │
        │                       │
        │   Description text    │
        │   with more detail    │
        │                       │
        │     [ Action ]        │
        │                       │
        └───────────────────────┘
```

**Container:** `flex flex-col items-center justify-center text-center py-space-4xl px-space-lg`
**Icon:** `text-neutral-400 mb-space-lg` — 48px icon
**Title:** `text-h3 text-neutral-900 mb-space-sm`
**Description:** `text-body text-neutral-600 max-w-md mb-space-lg`
**Action button:** Uses the Button component (secondary variant, size md)

### States

| State | Behavior |
|---|---|
| Default | Static display. No interactive states on the container. |
| With action | Button renders below the description with standard Button hover/active states |
| Without action | No button rendered. Description is the final element. |

### Usage Rules

- Use when a view has zero items to display. Do not show EmptyState when content is loading — use a loading skeleton or spinner instead.
- Every empty view must have a title. Description and action are optional but recommended.
- Use specific, actionable titles: "No saved products yet" not "Nothing here."
- When an action is provided, it should guide the user to populate the view: "Start searching" for empty results, "Browse products" for empty library.
- Do not use EmptyState for error pages. Errors should have their own error-specific UI with retry actions.

---

## Component Composition Reference

How these components compose across the four main surfaces:

| Surface | Components Used |
|---|---|
| **Search / Results** | NavBar, SearchBar, ProductCard (×n), EmptyState, SafetyBadge (inside ProductCard), CategoryTag (inside ProductCard), Button (inside SearchBar) |
| **Product Detail** | NavBar, SafetyBadge, CategoryTag, Button (Save, Add to Cart, Compare) |
| **Saved Library** | NavBar, ProductCard (×n), CategoryTag (as filters with `active`), EmptyState, InputField (preference entry), CategoryTag (with `removable` for preferences) |
| **Shopping List** | NavBar, SafetyBadge (sm), CategoryTag, Button (Remove, Clear All), EmptyState |

---

## File Locations

All components live in `/src/components/` with PascalCase filenames:

```
src/components/
├── ProductCard.tsx      (exists — composes SafetyBadge + CategoryTag)
├── SafetyBadge.tsx      (exists)
├── CategoryTag.tsx      (exists)
├── SearchBar.tsx         (to build)
├── NavBar.tsx            (exists)
├── Button.tsx            (to build)
├── InputField.tsx        (to build)
└── EmptyState.tsx        (to build)
```

---

*Generated from CLAUDE.md, /docs/design-system.md, and tailwind.config.js. Update this document when components are added or modified.*
