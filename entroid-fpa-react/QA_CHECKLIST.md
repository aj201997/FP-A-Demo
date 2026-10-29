# Prototype acceptance / demonstration checklist

All checks should be executed in a fresh browser with the latest package installed.

## Baseline functionality

- [ ] Run `npm install && npm run dev` and navigate to the Vite URL.
- [ ] Sidebar navigation opens all P0, P1, P2 areas; page titles and roles change correctly.
- [ ] Desktop and mobile (<=760px) navigation work; sidebar can open/close on mobile.
- [ ] Reload preserves changes made in this browser.
- [ ] Configuration → Reset simulated data restores sample values.
- [ ] Feature coverage filters list all 83 source catalogue entries.

## P0: budget and governance

- [ ] Budget cycles: create a new year and see it in the cycle overview.
- [ ] Targets: add a target, change its status and inspect allocation usage.
- [ ] Financial planning models: edit a revenue unit price, FTE count and CapEx project; apply to budget and check mapped account values.
- [ ] Department budgets: edit a monthly amount and observe both annual and consolidated totals change.
- [ ] Select Engineering; use Copy from actuals and inspect updated values.
- [ ] Attempt a budget submission exceeding its ceiling and check validation feedback.
- [ ] Submit a valid department budget; My approvals gains a pending item.
- [ ] Switch role to CFO / Approver and approve it; department status updates.
- [ ] Create a version snapshot, edit values, compare the difference.
- [ ] Publish should refuse while budget approvals are pending or departments are unapproved.
- [ ] Once required approvals are complete, publish; editing published cycle is blocked.
- [ ] Add a review comment, resolve and reopen it; audit should capture state changes.
- [ ] Export budget and audit CSV files.

## P1

- [ ] Change rolling forecast revenue and expense drivers; totals should respond.
- [ ] Submit a forecast for review and locate it in My approvals.
- [ ] Create a scenario; move controls; compare revenue, OpEx and EBITDA proxies.
- [ ] Scenario changes must not modify an approved budget.
- [ ] Create a revision request with justification and find it in My approvals.
- [ ] Approving a revision request must **not** silently change approved baseline amounts.
- [ ] FY2026 performance report compares Jan–Sep 2026 actuals with FY2026 baseline, not FY2027 budget.
- [ ] Zero-denominator percent deltas show a dash, never fabricated +100%.

## P2

- [ ] Long-range revenue/expense growth controls recalculate FY2027–2031 projections.
- [ ] Create a ZBB decision package; toggle funding (approver role) and inspect totals.
- [ ] Create an initiative; change progress; see ROI proxy and risk states.
- [ ] Activate contingency; see status change without budget changes.
- [ ] Create an M&A deal; adjust costs/synergy and update integration progress.

## Important production gaps to review before any real customer use

- [ ] Authenticated role and scope enforcement
- [ ] Source-of-truth database / transactional consistency
- [ ] CFO/Board routing & segregation-of-duties rules
- [ ] Idempotent import/export and GL mapping
- [ ] Entity consolidation and FX translation
- [ ] Correct revenue, tax, depreciation, working capital and cash flow schedules
- [ ] Forecast actuals splice and scenario relationship engine
- [ ] ZBB and initiative accounting allocation and no-double-count checks
- [ ] Immutable audit trail and record retention
- [ ] Automated tests, security review, accessibility audit and performance tests
