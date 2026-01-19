---
name: managing-prostuti-academy
description: Managing skill for Prostuti Academy project, enforcing design and language standards.
---

# Managing Prostuti Academy

This skill helps manage the Prostuti Academy project by enforcing design systems, language rules, and validation workflows.

## Project DNA
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore)
- **Deployment**: Vercel
- **Storage**: Google Drive (for PDFs)

## Design System
- **Style**: 'Testbook: Exam Prep' inspired.
- **Approach**: Mobile-first.
- **UI Elements**: Rounded corners, consistent padding.
- **Theme**: Dark Mode support required.
- **Font**: Inter (English), Noto Sans Bengali (Bengali).

## Language Rules
- **Educational Content**: MUST use strict Bengali.
- **Font**: Use `font-bengali` utility class for Bengali text.

## Validation Workflow (Plan-Validate-Execute)
Before finalizing any code, you MUST:
1.  **Plan**: Outline changes and potential impact.
2.  **Validate**:
    - Check for mobile responsiveness.
    - Verify Bengali font rendering.
    - Ensure no regression in existing components.
    - Verify Vercel build compatibility (`npm run build`).
3.  **Execute**: Apply changes only after validation.

## Scripts
- **Index Updater**: Run `node .agent/skills/managing-prostuti-academy/scripts/generate_indices.js` to update `index.ts` files after creating new components.
