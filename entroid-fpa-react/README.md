# Entroid Finance ERP — FP&A Interactive Prototype

A workflow-first **React + Vite** prototype for the proposed Entroid Financial Planning & Analysis architecture. It covers **P0 (core budgeting), P1 (forecasting and financial management) and P2 (strategic / specialist planning)** in a single, coherent navigation and simulated data model.

> **Prototype only.** No backend, authentication, live General Ledger, true accounting engine, server-side approvals, data tenancy, or production audit records. All workflows and figures are simulated with illustrative financial data and browser `localStorage`.

## Run locally

Requires Node.js **20.19+ or 22.12+** and npm.

```bash
npm install
npm run dev
```

Open the local URL Vite prints (normally `http://localhost:5173`).

For a production static build:

```bash
npm run build
npm run preview
```

The generated `dist/` is the deployable static site. Do **not** simply open `index.html` with `file://`; it needs Vite during development or a compiled `dist` in production.

## Deploy with Vercel

1. Unzip this project and push its contents into a GitHub repository. The **repository root** should contain `package.json` and `index.html`.
2. Vercel → **Add New Project** → import the repository.
3. Use framework preset **Vite**; install command `npm install`; build `npm run build`; output `dist`.
4. Click **Deploy**. The included `vercel.json` provides a single-page-app rewrite.
5. Share the Vercel project URL. No environment variables are required because this is a mock-data frontend.

If Vercel reports `Could not resolve entry module`, ensure you uploaded the *contents* of the `entroid-fpa-react` folder, and that `src/main.jsx` is present. If it reports dependency resolution issues, run `npm install` locally and commit the generated lockfile, then redeploy.

## Demonstration workflows

**P0 — Budget preparation, approval and publication**

1. On **Overview**, examine cycle KPIs and department statuses. Switch the top-right demonstration role at any point.
2. Open **Budget cycles** for the FY2027 cycle. Open **Budget targets** to add and submit targets, and use Allocation to compare departmental expense ceilings.
3. In **Financial planning models**, edit revenue volume and price, people FTE/cost or CapEx projects, then apply the result to working financial accounts.
4. In **Department budgets**, choose Engineering (or another department), edit monthly amounts, review annual recalculations and export CSV.
5. Use **Review & validation**. A submission creates a **Pending** approval request (if ceiling limits pass).
6. Switch to **FP&A Manager** or **CFO / Approver** and decide the request in **My approvals**.
7. Repeat for remaining departments. When no budget approvals are pending **and** all departments are approved, publish a protected baseline from **Budget versions**.
8. **Consolidation** recalculates department and financial totals. **Performance** shows FY2026 historical actuals vs a *separate FY2026 reference baseline*.

**P1 — Forecast and scenarios**

1. **Rolling forecast**: select a forecast; modify revenue and expense drivers; view revised projections and submit to approval.
2. **Scenarios & what-if**: adjust revenue, cost and probability assumptions; compare side-by-side estimates. These do not overwrite approved budgets.
3. **Budget revisions**: enter a proposed annual adjustment and justification; submit for approval. The approval creates a decision record **but does not post an amendment to a financial baseline**.
4. **Financial performance**: filter the FY2026 reference-period report and compare actuals against the corresponding reference baseline.

**P2 — Specialist planning**

- **Long-range plan**: edit growth drivers and inspect a five-year projection.
- **Zero-based budgeting**: create justification packages, rank by priority and mark packages funded or unfunded. **Funding does not write back** into a department plan.
- **Initiative plans**: add initiatives, update progress, toggle risk, view illustrative benefit/cost ROI.
- **Contingency plans**: activate or deactivate response playbooks; financial plans are not changed.
- **M&A integration**: create deals, edit purchase cost, integration cost and expected synergy; track integration progress. **No acquisition accounting is performed**.

**Shared**: central approval inbox, role view, comments, snapshots, browser audit events, configuration, and full 83-requirement catalogue. **Planning configuration** includes an explicit **Reset simulated data** action.

## Functional coverage and boundaries

| Area | Interactive now | Explicitly simulated / not implemented |
| --- | --- | --- |
| Budget cycles | Create cycle, open workspace, display statuses | Multi-year provisioning, lifecycle engines, persistence service |
| Financial planning models | Edit revenue volume/price, headcount FTE/cost and CapEx request; apply to shared budget rows | Detailed revenue recognition, payroll engine, depreciation and allocation rules |
| Budget targets | Create, set target state, allocation comparison | Optimisation solver, configurable target cascading |
| Department budgets | Account/month inputs, annual/quarter totals, copy actuals, CSV, validation, submit | GL mapping, bulk-paste, true transaction locks, formulas beyond summing |
| Approvals | Create requests, approve/reject, department status changes | Identity, permissions enforcement server-side, SoD, delegation |
| Consolidation | Recompute department and plan totals | Elimination entries, FX, multi-entity reconciliation |
| Versions | Clone draft, compare, publish protected baseline | Tamper-proof audit, database-level immutability, branch merge |
| Actual-vs-budget | FY2026 actuals vs FY2026 reference baseline | Real GL import and full income/BS/CF accounting statements |
| Forecasts | Edit revenue and OpEx %, recalculate, submit | Driver-level engine, actualised-month splice, statistical forecast |
| Scenarios | Create, edit, compare what-if cases | Full operational dependency graph / scenario publishing |
| Revisions | Change request and approval status | Official revised budget posting / effective dating |
| Long-range | Five-year growth projection | Integrated strategic financial statements |
| ZBB | Package form, ranking, funding state | Posting to budget lines, controlled allocation of funded amounts |
| Initiatives | Progress, risk, cost/benefit display | Benefit attribution, GL/project link, stage-gate authority |
| Contingency | Playbook state changes | Automatic trigger monitoring or forecast writeback |
| M&A | Model simple deal economics and milestones | Acquisition accounting / intercompany integration |
| Permissions | Demo role switching, limited UI restrictions | Actual RBAC/ABAC, authentication, finance-grade security |
| Audit | Local event list and CSV export | Immutable server audit trail |

### Source materials

- `F&P SS.pdf` (supplied separately): 27 pages of current Entroid Planning & Budgeting screens.
- 83-row FP&A capability spreadsheet (supplied separately): every row appears in `src/catalogue.json` with original terminology, requirements `R001–R083`, planned wave and screen change IDs.
- `docs/Entroid_FPA_Phase4_Change_Register.xlsx`: stakeholder screen-change recommendations and traceability from the prior assessment.
- `TRACEABILITY.md`: concise mapping of current screenshot modules to new routes.

## File structure

```text
entroid-fpa-react/
├── index.html                  # Vite entry point
├── package.json                # React, Vite, Lucide dependencies
├── vite.config.js
├── vercel.json                 # SPA deployment rewrite
├── src/
│   ├── main.jsx               # React root
│   ├── App.jsx                # Navigation, role control, shared state
│   ├── components/
│   │   └── ui.jsx            # Reusable UI primitives and helpers
│   ├── pages/
│   │   ├── Models.jsx        # Linked revenue, FTE and CapEx drivers
│   │   ├── Core.jsx          # Budgeting P0 and shared collaboration
│   │   ├── Planning.jsx      # Forecasting / performance P1
│   │   ├── Advanced.jsx      # Strategic / specialist planning P2
│   │   └── Admin.jsx         # Configuration, audit and catalogue
│   ├── data.js                # Seed data and finance helpers
│   ├── catalogue.json         # All 83 original feature rows with traceability
│   └── styles.css             # Responsive enterprise SaaS visual design
├── docs/
│   └── Entroid_FPA_Phase4_Change_Register.xlsx
├── scripts/
│   └── smoke-data.mjs         # Offline integrity check
├── QA_CHECKLIST.md
└── TRACEABILITY.md
```

## Design decisions

- Financial accounts, departments, monthly periods, budgets, snapshots and forecast/scenario values share a common set of IDs.
- Forecasts and scenarios remain separate from the current approved budget.
- Approvals, comments, version records and audits are reusable cross-cutting concepts.
- P2 workflows are accessible but cannot silently change an approved plan.
- A budget version's **name, status, lock and published baseline** are conceptually distinct.
- `localStorage` is convenient for demonstrations and **is not a secure database**. No data should be regarded as authoritative, private, or legally reliable.

## Development next steps

Before production development, define an entity/period/account data model, business rules and version lifecycle; implement transactional APIs, real authentication and permissions, a trusted audit trail, calculations, GL imports and ledger mapping, reconciliation, and tests. Expand the existing page modules into routed, API-backed feature folders as production requirements are finalised.
