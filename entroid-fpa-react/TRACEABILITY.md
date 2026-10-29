# Entroid FP&A — screenshot to prototype traceability

The *F&P SS.pdf* supplied with the project contains 27 pages. Page references below refer to the **original PDF page numbers**. All of these screens are **frontend concepts**, not evidence of backend behaviour. The implementation is a demonstration of an approved **workflow-first, role-based** direction, not a pixel-for-pixel copy of the screenshots.

| Screenshot module | PDF pages | Future-state prototype section | Design treatment |
| --- | --- | --- | --- |
| Long-Range Plan | 1–4 | Advanced Planning → Long-range plan | Relocated, five-year assumptions demonstrated |
| Budget Targets | 4–6 | P0 → Budget targets | Retained with target creation, allocation comparison and target approval submission |
| Department Budgets | 6–7 | P0 → Department budgets | Primary editor with monthly data, validation, copy actuals, submission and CSV export |
| Zero-Based Budgeting | 8–10 | P2 → Zero-based budgeting | Optional packages, scoring and funding state; no budget posting |
| Budget Revision | 11–13 | P1 → Budget revisions / Rolling forecast | Concept split; request only, no automatic baseline amendment |
| Contingency Plans | 13–15 | P2 → Contingency plans | Specialist response triggers/statuses; no forecast writeback |
| M&A Integration | 16–18 | P2 → M&A integration | Specialist deals, cost and synergy drivers, progress |
| Initiative Plan | 19–21 | P2 → Initiative plans | Costs, benefits, milestone progress and risk |
| Budget Versions | 22–23 | P0 → Budget versions | Reusable snapshot/version comparison and publication |
| Approval Workflow | 24 | Workspace → My approvals | Shared inbox for multiple planning object types |
| Budget Comments | 25–27 | P0 → Review comments | Cross-cutting comments with object references and resolution |

## Additional foundation screens

These are recommended additions from the Phase 4 assessment and/or generic FP&A requirements; they are **not** claimed to exist in the screenshot PDF:

- Workspace → Overview (role-appropriate KPI/action hub)
- P0 → Financial planning models (revenue drivers, workforce/headcount and CapEx planning)
- Workspace → Budget cycles (cycle and stage management)
- P0 → Consolidation (department aggregation and readiness)
- P1 → Financial performance (FY2026 actuals against matching FY2026 baseline)
- Configuration (accounts, dimensions, seeded actuals source, roles)
- Audit history (browser event log)
- Feature coverage (all 83 source rows and their planned phases)

## Source requirement mapping

- **R001–R083:** `src/catalogue.json`, extracted from the original spreadsheet **without filtering the Valor Y/N column**.
- **Screen change IDs S01–S45:** `docs/Entroid_FPA_Phase4_Change_Register.xlsx`.
- **Release-wave definitions:** P0 core annual budgeting; P1 forecasting/revisions/performance; P2 specialist strategic planning.
- A requirement in the **feature catalogue** is not automatically proven delivered by this prototype. Check the README's functional boundary table for accurate implementation status.

## Confirmed facts vs designed behaviour

- **Confirmed:** The original screenshot PDF displays the named interface concepts. The product owner stated there is no functional backend.
- **Designed:** The React frontend has local mocked state, conditional UI access, calculation proxies, form validations and simulated state transitions.
- **Not demonstrated:** Production financial accuracy, actual ERP integration, secure access, approval authority, immutable audit, multi-entity FX consolidation, or real postings.
