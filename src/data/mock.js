/* ============================================================================
   MOCK DATA — single integration point.
   When the Crelis API exists, replace these exports with fetchers and the
   visual components keep working untouched.
   ========================================================================= */

// ── Trust Engine: selectable sample tasks ──────────────────────────────────
export const SAMPLE_TASKS = [
  {
    id: 'task-refund',
    label: 'Refund $42 to customer',
    agent: 'Support Agent',
    confidence: 96,
    risk: 8,
    decision: 'auto', // auto | review | block
    reason: 'Low value, reversible, matches policy CRL-114.',
  },
  {
    id: 'task-wire',
    label: 'Approve $250K wire transfer',
    agent: 'Finance Agent',
    confidence: 88,
    risk: 91,
    decision: 'review',
    reason: 'High value + irreversible. Escalated to treasury reviewer.',
  },
  {
    id: 'task-summary',
    label: 'Summarize earnings call',
    agent: 'Research Agent',
    confidence: 99,
    risk: 4,
    decision: 'auto',
    reason: 'Read-only task, no execution risk.',
  },
  {
    id: 'task-medical',
    label: 'Adjust patient dosage record',
    agent: 'Clinical Agent',
    confidence: 71,
    risk: 97,
    decision: 'review',
    reason: 'Regulated data + low confidence. Routed to licensed reviewer.',
  },
  {
    id: 'task-delete',
    label: 'Bulk-delete 12K user records',
    agent: 'Ops Agent',
    confidence: 54,
    risk: 99,
    decision: 'block',
    reason: 'Irreversible at scale, confidence below floor. Blocked pending policy owner.',
  },
]

// ── Escalation flow stages ──────────────────────────────────────────────────
// `tp` = live throughput shown under each stage in the real-time pipeline.
export const ESCALATION_STAGES = [
  { id: 'task', label: 'AI task', sub: 'Agent proposes an action', state: 'ai', tp: '48.2K/d' },
  { id: 'score', label: 'Trust Engine', sub: 'Confidence + risk scored', state: 'ai', tp: '48.2K/d' },
  { id: 'review', label: 'Human review', sub: 'Verified expert inspects', state: 'review', tp: '2.4K/d' },
  { id: 'approve', label: 'Approval', sub: 'Signed decision recorded', state: 'review', tp: '2.4K/d' },
  { id: 'execute', label: 'Execution', sub: 'Action runs downstream', state: 'verify', tp: '45.8K/d' },
  { id: 'audit', label: 'Audit trail', sub: 'Immutable record written', state: 'verify', tp: '48.2K/d' },
]

// ── Audit timeline events ───────────────────────────────────────────────────
export const AUDIT_EVENTS = [
  { t: '14:02:11Z', actor: 'Finance Agent', action: 'Proposed wire transfer $250,000 → ACME-7741', state: 'ai' },
  { t: '14:02:11Z', actor: 'Trust Engine', action: 'Risk 91 / Confidence 88 — policy WIRE-HIGH triggered', state: 'review' },
  { t: '14:02:12Z', actor: 'Router', action: 'Escalated to treasury reviewer pool (2 eligible)', state: 'review' },
  { t: '14:06:48Z', actor: 'M. Tan (Reviewer)', action: 'Verified counterparty, approved with note', state: 'verify' },
  { t: '14:06:49Z', actor: 'Executor', action: 'Wire released via banking API — ref TXN-88231', state: 'verify' },
  { t: '14:06:49Z', actor: 'Audit Engine', action: 'Record sealed · hash 0x91f3…aa07', state: 'verify' },
]

// ── Marketplace experts ─────────────────────────────────────────────────────
export const EXPERTS = [
  { id: 'e1', initials: 'MT', name: 'M. Tan', role: 'Treasury Reviewer', skills: ['Wire approval', 'AML checks'], trust: 99, reviews: 1840, status: 'online' },
  { id: 'e2', initials: 'AR', name: 'A. Rivera', role: 'Clinical Data Specialist', skills: ['HIPAA', 'Dosage records'], trust: 98, reviews: 1212, status: 'online' },
  { id: 'e3', initials: 'KO', name: 'K. Okafor', role: 'Contracts Analyst', skills: ['Redlining', 'Procurement'], trust: 97, reviews: 964, status: 'busy' },
  { id: 'e4', initials: 'SL', name: 'S. Lim', role: 'Fraud Investigator', skills: ['Chargebacks', 'KYC'], trust: 99, reviews: 2105, status: 'online' },
]

// ── Governance dashboard tiles ──────────────────────────────────────────────
// `series` feeds a sparkline; `live` describes how the tile drifts in real time.
export const GOVERNANCE = {
  stats: [
    {
      key: 'actions', label: 'AI actions today', value: '48,212', state: 'ai',
      series: [120, 180, 240, 300, 360, 420, 480, 540, 620, 700],
      live: { base: 48212, kind: 'count', step: 7, jitter: 4, interval: 900, suffix: '' },
    },
    {
      key: 'auto', label: 'Auto-approved', value: '94.6%', state: 'verify',
      series: [93.8, 94.1, 93.9, 94.4, 94.2, 94.6, 94.5, 94.7, 94.6, 94.6],
      live: { base: 94.6, kind: 'pct', drift: 0.3, interval: 2600 },
    },
    {
      key: 'reviews', label: 'Human reviews', value: '2,431', state: 'review',
      series: [180, 210, 240, 220, 260, 280, 300, 290, 320, 340],
      live: { base: 2431, kind: 'count', step: 1, jitter: 1, interval: 2200, suffix: '' },
    },
    {
      key: 'blocked', label: 'Blocked', value: '17', state: 'block',
      series: [3, 4, 2, 5, 3, 6, 4, 7, 5, 6],
      live: { base: 17, kind: 'count', step: 0, jitter: 1, interval: 5200, suffix: '' },
    },
  ],
  exceptions: [
    { id: 'x1', label: 'Ops Agent · bulk delete blocked', state: 'block' },
    { id: 'x2', label: 'Finance Agent · wire escalated', state: 'review' },
    { id: 'x3', label: 'Clinical Agent · dosage escalated', state: 'review' },
  ],
}

// ── Decision lane feed — the pool of agent actions the live queue cycles ────
export const DECISION_FEED = [
  { id: 'f1', agent: 'Support Agent', action: 'Refund $42 · customer 88213', policy: 'CRL-114', risk: 8, decision: 'allow' },
  { id: 'f2', agent: 'Finance Agent', action: 'Wire $250,000 → ACME-7741', policy: 'WIRE-HIGH', risk: 91, decision: 'review' },
  { id: 'f3', agent: 'Research Agent', action: 'Summarize Q3 earnings call', policy: 'READ-ONLY', risk: 4, decision: 'allow' },
  { id: 'f4', agent: 'Ops Agent', action: 'Bulk-delete 12K user records', policy: 'DELETE-SCALE', risk: 99, decision: 'block' },
  { id: 'f5', agent: 'Clinical Agent', action: 'Update dosage record · pt 4471', policy: 'PHI-GUARD', risk: 97, decision: 'review' },
  { id: 'f6', agent: 'Procure Agent', action: 'Issue PO $18,400 · vendor NTX', policy: 'VENDOR-PAY', risk: 34, decision: 'allow' },
  { id: 'f7', agent: 'Support Agent', action: 'Close ticket #29981 · resolved', policy: 'CRL-102', risk: 3, decision: 'allow' },
  { id: 'f8', agent: 'Fraud Agent', action: 'Freeze card ····7719 · velocity', policy: 'KYC-7', risk: 76, decision: 'review' },
]

// ── Homepage governance signals — four live proof-point cards ───────────────
// `tone` overrides the number color when the healthy reading differs from the
// card's accent (a zero on the false-allow detector is good news).
export const GOVERNANCE_SIGNALS = [
  {
    key: 'policies', label: 'Policies evaluated', state: 'ai',
    base: 1284409, step: 19, jitter: 8, interval: 800,
    note: 'today · all environments',
    series: [820, 858, 904, 942, 1010, 1078, 1148, 1209, 1251, 1284],
  },
  {
    key: 'audit', label: 'Audit chain verified', state: 'verify',
    base: 48212, step: 5, jitter: 3, interval: 1100,
    note: 'hash-linked · 100% integrity',
    series: [44.1, 44.6, 45.2, 45.8, 46.3, 46.9, 47.3, 47.8, 48.0, 48.2],
  },
  {
    key: 'false-allows', label: 'False allows detected', state: 'block', tone: 'verify',
    base: 0, step: 0, jitter: 0, interval: 4000,
    note: 'past 30 days · production',
    series: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    key: 'review', label: 'Human review routed', state: 'review',
    base: 2431, step: 1, jitter: 1, interval: 2100,
    note: 'median pickup 38s',
    series: [1.9, 2.0, 2.05, 2.12, 2.2, 2.26, 2.31, 2.36, 2.4, 2.43],
  },
]

// ── Homepage product previews — the four platform surfaces ──────────────────
export const PRODUCT_MODULES = [
  {
    id: 'studio', name: 'Decision Studio', tag: 'trace', accent: '#3D7BFF',
    desc: 'Trace any decision end-to-end — the request, detected intent, policy hits, risk factors, and the route it earned.',
  },
  {
    id: 'policy', name: 'Policy Library', tag: 'govern', accent: '#22D3EE',
    desc: 'Versioned, testable policies your risk team can actually read — applied inline to every action, in milliseconds.',
  },
  {
    id: 'qa', name: 'QA Center', tag: 'verify', accent: '#FBBF24',
    desc: 'Continuously replay production decisions against goldens to catch drift and false allows before they reach customers.',
  },
  {
    id: 'audit', name: 'Audit Center', tag: 'prove', accent: '#34D399',
    desc: 'A tamper-evident chain of every decision — who allowed what, when, under which policy — exportable for any regulator.',
  },
]

// ── Audit event stream — pool the live log cycles through ───────────────────
// Each row gets a timestamp + sealed hash at render time so the feed feels live.
export const AUDIT_STREAM = [
  { actor: 'Finance Agent', action: 'Wire $250,000 → ACME-7741 proposed', state: 'ai' },
  { actor: 'Trust Engine', action: 'Risk 91 / Conf 88 — policy WIRE-HIGH triggered', state: 'review' },
  { actor: 'Support Agent', action: 'Refund $42 auto-approved · policy CRL-114', state: 'verify' },
  { actor: 'Clinical Agent', action: 'Dosage record change escalated to specialist', state: 'review' },
  { actor: 'Ops Agent', action: 'Bulk-delete 12K records blocked at gate', state: 'block' },
  { actor: 'M. Tan (Reviewer)', action: 'Verified counterparty, approved with note', state: 'verify' },
  { actor: 'Executor', action: 'Wire released via banking API · ref TXN-88231', state: 'verify' },
  { actor: 'Audit Engine', action: 'Execution record sealed · tamper-evident', state: 'verify' },
  { actor: 'Research Agent', action: 'Earnings-call summary auto-approved · read-only', state: 'verify' },
  { actor: 'Fraud Investigator', action: 'Chargeback case routed · KYC re-check', state: 'review' },
  { actor: 'Trust Engine', action: 'Confidence below floor — held for policy owner', state: 'block' },
  { actor: 'Router', action: 'Treasury reviewer pool engaged · 2 eligible', state: 'review' },
]

// ── Control plane chrome metadata ───────────────────────────────────────────
export const CONTROL_PLANE = {
  env: 'prod · us-east-1',
  region: 'streaming',
  build: 'crl-2.4.1',
}

// ── Enterprise use cases ────────────────────────────────────────────────────
export const USE_CASES = [
  {
    id: 'banking',
    title: 'Banking & payments',
    tag: 'Financial services',
    desc: 'Agents draft transfers, disputes, and limit changes. Crelis scores every action against treasury policy and routes high-value or irreversible moves to verified reviewers before money moves.',
    points: ['Wire & payment approval flows', 'Fraud and chargeback escalation', 'Full audit trail per transaction'],
  },
  {
    id: 'health',
    title: 'Healthcare operations',
    tag: 'Regulated data',
    desc: 'Clinical and admin agents touch protected data. Low-confidence or regulated changes route to licensed specialists, with every access and approval sealed in the audit engine.',
    points: ['HIPAA-aware routing policies', 'Licensed reviewer pools', 'Immutable access records'],
  },
  {
    id: 'legal',
    title: 'Legal & procurement',
    tag: 'Contracts',
    desc: 'AI redlines contracts and drafts purchase orders at machine speed. Crelis holds anything above a risk threshold for analyst sign-off, so nothing binding ships unreviewed.',
    points: ['Clause-level risk thresholds', 'Analyst approval queues', 'Signed decision history'],
  },
  {
    id: 'support',
    title: 'Customer operations',
    tag: 'High volume',
    desc: 'Support agents resolve thousands of tickets autonomously. Refunds, account changes, and edge cases above policy limits detour through human operators without breaking the queue.',
    points: ['Policy-bound auto-resolution', 'Seamless human handoff', 'Per-ticket execution log'],
  },
  {
    id: 'itops',
    title: 'IT & infrastructure',
    tag: 'Irreversible actions',
    desc: 'Ops agents patch, provision, and clean up. Destructive or fleet-wide actions are held at the trust gate until an operator approves — with a one-click rollback record.',
    points: ['Blast-radius scoring', 'Operator approval gates', 'Change audit per resource'],
  },
  {
    id: 'gov',
    title: 'Public sector',
    tag: 'Accountability',
    desc: 'Agencies adopt AI under strict accountability mandates. Crelis provides the decision evidence: who approved what, when, under which policy — exportable for oversight.',
    points: ['Policy-mapped approvals', 'Oversight-ready exports', 'Citizen-data safeguards'],
  },
]

// ── Future platform placeholders ────────────────────────────────────────────
export const ROADMAP = [
  { id: 'mcp', label: 'MCP integrations', desc: 'Native Model Context Protocol connectors so any agent framework can route actions through Crelis.', status: 'In design' },
  { id: 'agents', label: 'AI agent registry', desc: 'Identity, permissions, and trust history for every agent operating in your environment.', status: 'In design' },
  { id: 'marketplace', label: 'Human marketplace', desc: 'Open network of verified experts with skills, credentials, and live availability.', status: 'Pilot' },
  { id: 'dashboards', label: 'Enterprise dashboards', desc: 'Org-wide visibility into AI activity, approvals, exceptions, and spend.', status: 'Pilot' },
  { id: 'compliance', label: 'Compliance controls', desc: 'Policy packs mapped to SOC 2, HIPAA, and emerging AI regulation.', status: 'In design' },
  { id: 'audit', label: 'Audit engine', desc: 'Tamper-evident execution records with cryptographic sealing and export.', status: 'Pilot' },
  { id: 'orchestration', label: 'Workforce orchestration', desc: 'Routing, SLAs, and quality scoring across human reviewer pools.', status: 'In design' },
]

// ── Reviewer pool — illustrative, role-based profiles (no real individuals) ──
// Sectors map to the marketplace filters. `status` drives availability.
export const REVIEWER_SECTORS = ['Banking', 'Insurance', 'Legal', 'Healthcare', 'Compliance']

export const REVIEWERS = [
  { id: 'r1', sector: 'Banking', role: 'Treasury & Wire Reviewer', expertise: ['Wire approval', 'AML / sanctions', 'Payment fraud'], status: 'online', avgReview: '6 min', clearance: 'Tier 3 · High' },
  { id: 'r2', sector: 'Banking', role: 'Credit & Lending Analyst', expertise: ['Loan approval', 'Credit risk', 'KYC'], status: 'online', avgReview: '9 min', clearance: 'Tier 2 · Elevated' },
  { id: 'r3', sector: 'Insurance', role: 'Claims Adjudicator', expertise: ['Claim review', 'FNOL', 'Fraud indicators'], status: 'online', avgReview: '11 min', clearance: 'Tier 2 · Elevated' },
  { id: 'r4', sector: 'Insurance', role: 'Underwriting Reviewer', expertise: ['Policy issuance', 'Medical disclosure', 'Risk rating'], status: 'busy', avgReview: '14 min', clearance: 'Tier 2 · Elevated' },
  { id: 'r5', sector: 'Legal', role: 'Contracts Analyst', expertise: ['Redlining', 'Procurement', 'Clause risk'], status: 'online', avgReview: '18 min', clearance: 'Tier 3 · High' },
  { id: 'r6', sector: 'Legal', role: 'Disputes & Appeals Reviewer', expertise: ['Disclosure', 'Appeals', 'Regulatory sign-off'], status: 'busy', avgReview: '22 min', clearance: 'Tier 3 · High' },
  { id: 'r7', sector: 'Healthcare', role: 'Clinical Data Specialist', expertise: ['HIPAA', 'Dosage records', 'PHI access'], status: 'online', avgReview: '8 min', clearance: 'Tier 3 · High' },
  { id: 'r8', sector: 'Healthcare', role: 'Vulnerable-Customer Reviewer', expertise: ['Bereavement claims', 'Hardship', 'Duty of care'], status: 'online', avgReview: '12 min', clearance: 'Tier 2 · Elevated' },
  { id: 'r9', sector: 'Compliance', role: 'AML / Sanctions Officer', expertise: ['Sanctions screening', 'PEP', 'SAR filing'], status: 'online', avgReview: '7 min', clearance: 'Tier 3 · High' },
  { id: 'r10', sector: 'Compliance', role: 'Model Governance Reviewer', expertise: ['Explainability', 'Model cards', 'Audit evidence'], status: 'busy', avgReview: '16 min', clearance: 'Tier 2 · Elevated' },
]
