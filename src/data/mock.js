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
export const ESCALATION_STAGES = [
  { id: 'task', label: 'AI task', sub: 'Agent proposes an action', state: 'ai' },
  { id: 'score', label: 'Trust Engine', sub: 'Confidence + risk scored', state: 'ai' },
  { id: 'review', label: 'Human review', sub: 'Verified expert inspects', state: 'review' },
  { id: 'approve', label: 'Approval', sub: 'Signed decision recorded', state: 'review' },
  { id: 'execute', label: 'Execution', sub: 'Action runs downstream', state: 'verify' },
  { id: 'audit', label: 'Audit trail', sub: 'Immutable record written', state: 'verify' },
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
export const GOVERNANCE = {
  stats: [
    { label: 'AI actions today', value: '48,212', state: 'ai' },
    { label: 'Auto-approved', value: '94.6%', state: 'verify' },
    { label: 'Human reviews', value: '2,431', state: 'review' },
    { label: 'Blocked', value: '17', state: 'block' },
  ],
  exceptions: [
    { id: 'x1', label: 'Ops Agent · bulk delete blocked', state: 'block' },
    { id: 'x2', label: 'Finance Agent · wire escalated', state: 'review' },
    { id: 'x3', label: 'Clinical Agent · dosage escalated', state: 'review' },
  ],
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
