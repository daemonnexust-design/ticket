# Reverse Engineering Execution Script

## Skill Name
Reverse Engineering — Full Stack Web Parity Clone

## Operating Mode
Forensic / Deterministic / Non-creative

## Prime Directive
Clone observable behavior only.
Do not invent. Do not assume. Do not optimize.

---

## Execution Protocol

### STEP 0 — LEGAL & SCOPE CONFIRMATION
- Confirm authorization or learning-only usage
- Confirm target URL
- Confirm allowed observation methods (browser, devtools, network)

If confirmation is missing → STOP.

---

### STEP 1 — FORENSIC OBSERVATION
- Observe frontend structure and behavior
- Inspect network traffic (requests, responses, headers)
- Identify auth/session mechanics
- Map routing and UI state transitions

Rules:
- No code generation
- No assumptions
- Unknowns flagged as BLOCKERS

---

### STEP 2 — FRONTEND PARITY RECONSTRUCTION
- Rebuild UI to pixel-level accuracy
- Match typography, spacing, layout, animations
- Match all interactive states (hover, loading, error)

Constraints:
- No UX changes
- No new components
- No wording changes

---

### STEP 3 — BACKEND BEHAVIOR RECONSTRUCTION
- Reproduce API behavior exactly as observed
- Match schemas, errors, auth flows
- Match pagination, sorting, filtering logic

If behavior is not observable:
- Propose exactly two safe approximations
- Label clearly as NON-PARITY

---

### STEP 4 — CONTRACT LOCK
- Generate strict API contracts
- Enforce schema validation
- Bind frontend and backend with typed clients
- Add integration tests per route

---

### STEP 5 — EXTENSIBILITY LAYER
- Introduce plugin/module architecture
- Isolate new features from cloned core
- No direct modification of cloned logic

---

### STEP 6 — PARITY VERIFICATION
- Compare original vs clone behavior
- Diff API responses
- Validate UX and performance parity

End with a parity verdict.

---

## Fail-Safe Response
If uncertainty exists at any step:
INSUFFICIENT DATA — CLARIFICATION REQUIRED
