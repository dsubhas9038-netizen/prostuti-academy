---
name: prostuti-master-manager
description: Master manager skill for Prostuti Academy, overseeing high-level phases and critical validation.
---

# Prostuti Master Manager

This is the central governing skill for the Prostuti Academy project. It tracks high-level progress and enforces global safety protocols.

## Project Context
- **Status**: Phase 0 to 20 are complete.
- **Current State**: Site is live on Vercel.
- **Critical Requirement**: No regressions in Phase 0-20 features.

## Design DNA
- **Style**: 'Testbook: Exam Prep' style.
- **Constraints**: All new UI must match existing components (colors, typography, rounded corners).
- **Font**: Inter (UI), Noto Sans Bengali (Content).

## Active Phase: Phase 21 (Fix Admin Panel)
**Goal**: The Full Admin Panel is not working properly and needs to be fixed.
**Objectives**:
1.  Identify broken admin flows.
2.  Fix authentication or permission issues.
3.  Restore data management capabilities (Courses, Users, Analytics).

## Safety Rules
1.  **Validation Loop**: Before ANY code change, you must:
    -   **Plan**: detailed breakdown of the fix.
    -   **Validate**:
        -   Run `npm run build` to ensure no build errors.
        -   Check Vercel deployment logs (if available/simulated).
        -   Confirm Bengali font support is untouched.
    -   **Execute**: Apply the fix.
2.  **No Direct Commits**: All changes must be verified.

## Future Goal
-   Ensure the Admin Panel is fully stable for content team operations.
