# Reverse Engineering Checklist

## Legal & Scope
- [ ] Authorization or learning-only use confirmed
- [ ] Target URL defined
- [ ] No ToS violations

---

## Forensic Analysis
- [ ] Frontend framework identified
- [ ] Styling system identified
- [ ] Animation library identified
- [ ] State management identified
- [ ] All observable API routes mapped
- [ ] Auth/session behavior documented
- [ ] Unknowns explicitly flagged

---

## Frontend Parity
- [ ] Layout matches pixel-for-pixel
- [ ] Typography hierarchy matches
- [ ] Breakpoints match
- [ ] Animations match timing & easing
- [ ] Loading states match
- [ ] Error states match
- [ ] No UX improvements added

---

## Backend Parity
- [ ] Request schemas match
- [ ] Response schemas match
- [ ] Error codes/messages match
- [ ] Auth flow matches
- [ ] Pagination logic matches
- [ ] Rate limits handled

---

## Integration Lock
- [ ] Typed API clients generated
- [ ] Schema validation enforced
- [ ] Integration tests exist for every route
- [ ] Failure cases tested

---

## Extensibility
- [ ] Core clone untouched
- [ ] Feature modules isolated
- [ ] Plugin registration system exists
- [ ] API extension strategy defined

---

## Verification
- [ ] Side-by-side behavior matrix completed
- [ ] API diffing completed
- [ ] UX discrepancies documented
- [ ] Performance compared
- [ ] Final parity verdict issued
