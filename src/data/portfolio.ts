/**
 * Central content source for the portfolio.
 * Personal details, projects and enterprise systems live here — never inline
 * them in components.
 *
 * All personal details, links and project data live here.
 */

export const site = {
  name: 'Hazem',
  title: 'Frappe & ERPNext Developer',
  secondaryTitle: 'Python Backend Engineer · Enterprise Application Developer',
  brandStatement:
    'I engineer business systems that turn complex workflows into intelligent, scalable solutions.',
  positioning:
    'An ERPNext and Frappe developer with hands-on experience engineering real-world enterprise business systems, financial workflows, sales automation, operational applications, and custom business solutions.',
  heroHeadline: ['Engineering', 'Digital', 'Experiences.'],
  heroRoles: [
    'Frappe & ERPNext Developer',
    'Python Backend Engineer',
    'Enterprise Solutions Architect',
  ],
  email: 'hazemsharaf56@gmail.com',
  phones: [
    { label: 'Egypt', value: '+20 100 353 2770', href: 'tel:+201003532770' },
    { label: 'Saudi Arabia', value: '+966 56 708 6187', href: 'tel:+966567086187' },
  ],
  github: 'https://github.com/Zero056',
  githubHandle: 'Zero056',
  linkedin: 'https://www.linkedin.com/in/hazem-sharaf-221b2b210',
  location: 'Remote · Worldwide',
  nav: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'systems', label: 'Systems' },
    { id: 'projects', label: 'Projects' },
    { id: 'approach', label: 'Approach' },
    { id: 'contact', label: 'Contact' },
  ],
} as const

export type NavItem = (typeof site.nav)[number]

/* ------------------------------------------------------------------ */
/* About                                                               */
/* ------------------------------------------------------------------ */

export const about = {
  eyebrow: 'About',
  headline: ['Beyond Writing Code.', 'Engineering', 'Solutions.'],
  intro:
    'I specialise in building enterprise applications on the Frappe Framework and ERPNext, translating complex operational requirements into reliable, scalable software.',
  philosophy:
    'My work starts with the business, not the codebase. I map how a process actually runs — who acts, what changes, which documents move — then design a system that makes that flow explicit, auditable and hard to break.',
  specialties:
    'From backend architecture in Python to ERP customisation, financial workflows, integrations and reporting, I build solutions that teams can trust and evolve.',
  approach:
    'Every project is treated as a business system first, balancing technical depth with usability, performance and long-term maintainability.',
  principles: [
    {
      title: 'Business first',
      text: 'Requirements and operational workflows shape every technical decision.',
    },
    {
      title: 'Systems thinking',
      text: 'Documents, states and side effects designed as one coherent flow.',
    },
    {
      title: 'Built to evolve',
      text: 'Readable code, explicit rules and structures the next developer can extend.',
    },
  ],
  layers: [
    {
      label: 'Business',
      meta: 'Requirements · Workflows · Rules',
      detail: 'What the operation needs to happen, and what must never happen.',
    },
    {
      label: 'Architecture',
      meta: 'DocTypes · Controllers · APIs',
      detail: 'The data model and boundaries that make the workflow reliable.',
    },
    {
      label: 'Automation',
      meta: 'Events · Jobs · Reports',
      detail: 'The logic that removes manual steps and surfaces the truth.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  id: string
  index: string
  name: string
  icon: 'backend' | 'erp' | 'frontend' | 'database' | 'tools'
  blurb: string
  items: { name: string; description: string }[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    index: '01',
    name: 'Backend Engineering',
    icon: 'backend',
    blurb: 'Server-side logic that holds a business process together.',
    items: [
      {
        name: 'Python',
        description: 'Business logic, controllers, background jobs and automation.',
      },
      {
        name: 'REST APIs',
        description: 'Designing and consuming reliable service interfaces.',
      },
    ],
  },
  {
    id: 'erp',
    index: '02',
    name: 'ERP Development',
    icon: 'erp',
    blurb: 'Custom enterprise applications on top of a real ERP core.',
    items: [
      {
        name: 'Frappe Framework',
        description: 'Modular applications, DocTypes, hooks and framework customisation.',
      },
      {
        name: 'ERPNext',
        description: 'Sales, accounting and operational workflows extended end to end.',
      },
    ],
  },
  {
    id: 'frontend',
    index: '03',
    name: 'Frontend Development',
    icon: 'frontend',
    blurb: 'Interfaces that make complex forms feel obvious.',
    items: [
      {
        name: 'JavaScript',
        description: 'Client scripts, form behaviour and interactive workflows.',
      },
    ],
  },
  {
    id: 'database',
    index: '04',
    name: 'Databases',
    icon: 'database',
    blurb: 'Relational models and queries built for real reporting.',
    items: [
      {
        name: 'MariaDB',
        description: 'Schema design, joins and performance-aware queries.',
      },
      {
        name: 'SQL',
        description: 'Cross-DocType reporting and operational data analysis.',
      },
    ],
  },
  {
    id: 'tools',
    index: '05',
    name: 'Integrations & Tools',
    icon: 'tools',
    blurb: 'The environment around the application.',
    items: [
      { name: 'Git', description: 'Version control and collaborative workflows.' },
      { name: 'Linux', description: 'Server environments and deployment operations.' },
      { name: 'Bench CLI', description: 'Frappe and ERPNext site and app lifecycle.' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Enterprise systems                                                  */
/* ------------------------------------------------------------------ */

export type SystemKind = 'Business system' | 'Customisation' | 'Reporting' | 'Integration'

export type EnterpriseSystem = {
  id: string
  index: string
  title: string
  shortTitle: string
  kind: SystemKind
  summary: string
  workflow: string[]
  capabilities: string[]
  stack: string[]
  rules?: string[]
  scenarios?: string[]
  reports?: string[]
}

/**
 * ── ADD A NEW ENTERPRISE SYSTEM ──────────────────────────────────────
 * Copy an existing object, give it a unique `id` and the next `index`,
 * then update `workflow` with the real stages. The section, tabs and
 * animated workflow chain are generated automatically from this array.
 */
export const enterpriseSystems: EnterpriseSystem[] = [
  {
    id: 'zatca-einvoicing',
    index: '01',
    title: 'ZATCA E-Invoicing Integration',
    shortTitle: 'ZATCA E-Invoicing',
    kind: 'Integration',
    summary:
      'ERPNext invoices connected to Saudi Arabia’s ZATCA e-invoicing platform — UBL generation, cryptographic stamping, QR codes and clearance or reporting responses.',
    workflow: [
      'Sales Invoice',
      'UBL 2.1 XML',
      'Cryptographic Stamp & QR',
      'ZATCA API',
      'Status & Archive',
    ],
    capabilities: [
      'ZATCA Phase 2 integration',
      'UBL 2.1 XML generation',
      'Invoice UUID and hash handling',
      'Cryptographic stamping and CSID onboarding',
      'QR code generation',
      'Clearance and reporting API calls',
      'Response validation and status synchronisation',
      'Bilingual Arabic and English invoices',
      'Rejection handling and retry logic',
    ],
    stack: ['Python', 'Frappe', 'ERPNext', 'REST APIs', 'XML', 'ZATCA APIs'],
    rules: [
      'Standard and simplified invoices follow different submission flows.',
      'Every invoice must be cleared or reported within the ZATCA window.',
      'Platform responses are stored locally for audit and reconciliation.',
    ],
  },
  {
    id: 'e-invoice-platform',
    index: '02',
    title: 'E-Invoice Platform Integration',
    shortTitle: 'E-Invoice Integration',
    kind: 'Integration',
    summary:
      'A connector that prepares, signs and submits ERPNext sales documents to a tax-authority e-invoicing API, then keeps the local invoice state in sync with every response.',
    workflow: [
      'Sales Invoice',
      'Document Validation',
      'Signed Payload',
      'Tax Authority API',
      'Status Synchronisation',
    ],
    capabilities: [
      'Invoice payload mapping',
      'Digital signature and stamping',
      'Tax authority API submission',
      'Submission and response validation',
      'Status synchronisation',
      'Arabic and English document output',
      'Submission audit trail',
      'Rejection and retry handling',
    ],
    stack: ['Python', 'Frappe', 'ERPNext', 'REST APIs', 'XML / JSON'],
    rules: [
      'Only validated invoices are transmitted.',
      'Every platform response is kept for audit.',
    ],
  },
  {
    id: 'shopify-integration',
    index: '03',
    title: 'Shopify API Integration',
    shortTitle: 'Shopify Integration',
    kind: 'Integration',
    summary:
      'A two-way commerce bridge between Shopify and ERPNext covering customers, orders, products and stock — so the storefront and the ERP agree on the same numbers.',
    workflow: [
      'Shopify Store',
      'Webhook / Admin API',
      'Customer & Order Mapping',
      'ERPNext Sales Order',
      'Inventory Sync',
    ],
    capabilities: [
      'Shopify Admin API integration',
      'Webhook handling',
      'Customer synchronisation',
      'Order and line-item mapping',
      'Product and variant mapping',
      'Inventory and stock synchronisation',
      'Sales Order creation in ERPNext',
      'Idempotent retries and reconciliation',
    ],
    stack: ['Python', 'Frappe', 'ERPNext', 'REST APIs', 'Webhooks', 'Shopify API'],
  },
  {
    id: 'wordpress-integration',
    index: '04',
    title: 'WordPress API Integration',
    shortTitle: 'WordPress Integration',
    kind: 'Integration',
    summary:
      'WordPress sites connected to ERPNext through the WordPress REST API — leads, customers and content flowing into operational records without manual entry.',
    workflow: [
      'WordPress Site',
      'REST API / Webhooks',
      'Lead & Customer Mapping',
      'ERPNext Records',
      'Status Callback',
    ],
    capabilities: [
      'WordPress REST API integration',
      'Authenticated API requests',
      'Lead and form submission sync',
      'Customer record creation',
      'Content and catalogue synchronisation',
      'Webhook event handling',
      'Error logging and retries',
    ],
    stack: ['Python', 'Frappe', 'REST APIs', 'WordPress', 'MariaDB'],
  },
  {
    id: 'sales-commissions',
    index: '05',
    title: 'Sales Performance & Employee Commissions',
    shortTitle: 'Sales & Commissions',
    kind: 'Customisation',
    summary:
      'An ERPNext customisation that tracks sales performance and turns it into employee commissions, with financial controls around when points are actually earned.',
    workflow: [
      'Sales Performance Target',
      'Employee Commission Log',
      'Employee Commissions Payment',
      'Journal Entry',
    ],
    capabilities: [
      'Sales performance targets',
      'Employee commission calculation',
      'Commission log tracking',
      'Commission payment processing',
      'Payment Entry validation',
      'Sales Invoice payment status validation',
      'Journal Entry integration',
      'Financial transaction controls',
    ],
    stack: ['Python', 'Frappe', 'ERPNext', 'JavaScript', 'Accounting APIs'],
    rules: [
      'Commission points are processed according to payment status.',
      'The Payment Entry must be submitted before points are released.',
      'The Sales Invoice must satisfy the required full-payment condition.',
    ],
  },
  {
    id: 'portfolio-handover',
    index: '06',
    title: 'Sales Representative Portfolio Handover',
    shortTitle: 'Portfolio Handover',
    kind: 'Business system',
    summary:
      'A system for transferring customer portfolios between sales representatives without losing ownership, history or operational continuity.',
    workflow: [
      'Sales Representative Portfolio',
      'Handover Event',
      'Customer Reassignment',
      'Operational Continuity',
    ],
    capabilities: [
      'Sales representative portfolio management',
      'Customer reassignment',
      'Handover documentation',
      'Operational continuity',
      'Employee and customer relationship management',
    ],
    stack: ['Python', 'Frappe', 'ERPNext', 'JavaScript'],
    scenarios: ['Terminal', 'Annual Leave', 'Transfer Customer'],
  },
  {
    id: 'vehicle-device-setup',
    index: '07',
    title: 'Vehicle & Device Setup Management',
    shortTitle: 'Vehicle & Device Setup',
    kind: 'Customisation',
    summary:
      'A customised ERPNext workflow that connects sales orders with the vehicle and device setup information operations depend on.',
    workflow: [
      'Sales Order',
      'Device Setup Lookup',
      'Vehicle Information',
      'License Plate Record',
      'Operational Workflow',
    ],
    capabilities: [
      'Sales Order-based device setup lookup',
      'Vehicle information retrieval',
      'License plate management',
      'Vehicle data integration',
      'Automated information retrieval for operations',
    ],
    stack: ['Python', 'Frappe', 'ERPNext', 'JavaScript'],
  },
  {
    id: 'payment-reconciliation',
    index: '08',
    title: 'Payment Reconciliation & Cash Collection',
    shortTitle: 'Reconciliation & Cash',
    kind: 'Business system',
    summary:
      'A financial operations customisation for reconciling cash receipts and managing employee-related collection activity inside ERPNext.',
    workflow: [
      'Payment Entry',
      'Employee Collections',
      'Unreconciled Receipts',
      'Reconciliation Workflow',
      'Transaction Validation',
    ],
    capabilities: [
      'Payment Entry customisation',
      'Employee collection tracking',
      'Unreconciled cash receipt identification',
      'Employee reconciliation workflows',
      'Custom server-side methods',
      'Interactive List View actions',
      'Financial transaction validation',
    ],
    stack: ['Python', 'Frappe', 'ERPNext', 'JavaScript', 'MariaDB'],
  },
  {
    id: 'sales-reporting',
    index: '09',
    title: 'Custom Sales & Business Reporting',
    shortTitle: 'Sales & Business Reporting',
    kind: 'Reporting',
    summary:
      'Purpose-built ERPNext reports that follow the full transaction lifecycle instead of forcing operations into generic views.',
    workflow: [
      'Business Transactions',
      'Cross-DocType Query',
      'Query Report',
      'Operational Analysis',
    ],
    capabilities: [
      'SQL-based reports',
      'Query Reports',
      'Cross-DocType data analysis',
      'Business-specific filtering',
      'Transaction lifecycle tracking',
      'Custom reporting logic',
    ],
    stack: ['Python', 'SQL', 'MariaDB', 'Frappe Query Reports'],
    reports: [
      'Sales Order Customer Item Report',
      'Quotation and Sales Order analysis',
      'Main Installation Order tracking',
      'Payment Entry tracking',
      'Employee-related sales operations',
    ],
  },
  {
    id: 'payment-customer-workflow',
    index: '10',
    title: 'Payment & Customer Workflow Customisation',
    shortTitle: 'Payment & Customer',
    kind: 'Customisation',
    summary:
      'Standard ERPNext transactions extended to support company-specific financial operations, customer ownership and bilingual documents.',
    workflow: [
      'Payment Entry',
      'Customer & Account Manager',
      'Custom Transaction Fields',
      'Validation Layer',
      'Bilingual Print Format',
    ],
    capabilities: [
      'Payment Entry customisation',
      'Customer information retrieval',
      'Employee account manager relationships',
      'Custom transaction fields',
      'Client-side validation',
      'Server-side data access',
      'Custom Print Formats',
      'Bilingual and Arabic RTL documents',
    ],
    stack: ['Python', 'JavaScript', 'Frappe', 'ERPNext', 'Jinja', 'SQL'],
  },
]

/* ------------------------------------------------------------------ */
/* Frappe engineering                                                  */
/* ------------------------------------------------------------------ */

export type FrappePillar = {
  id: string
  title: string
  icon: 'backend' | 'frontend' | 'erp' | 'advanced'
  summary: string
  items: string[]
}

export const frappePillars: FrappePillar[] = [
  {
    id: 'backend',
    title: 'Backend Engineering',
    icon: 'backend',
    summary: 'The Python layer where business rules live.',
    items: [
      'Custom DocTypes',
      'Document Events',
      'Controller development',
      'Python business logic',
      'Whitelisted methods',
      'Server-side validations',
      'Background processing',
      'Database queries',
      'API integrations',
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    icon: 'frontend',
    summary: 'Form behaviour that guides the operator.',
    items: [
      'Client Scripts',
      'Form Events',
      'List View customisation',
      'Custom buttons and actions',
      'Dynamic fields',
      'JavaScript API calls',
      'Interactive workflows',
    ],
  },
  {
    id: 'erpnext',
    title: 'ERPNext Customisation',
    icon: 'erp',
    summary: 'Standard documents extended, never broken.',
    items: [
      'Sales Invoice',
      'Sales Order',
      'Quotation',
      'Payment Entry',
      'Customer',
      'Purchase Invoice',
      'Employee',
      'Journal Entry',
      'HRMS workflows',
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Customisation',
    icon: 'advanced',
    summary: 'Documents, permissions and reporting at the edges.',
    items: [
      'Custom Print Formats',
      'Jinja templates',
      'Arabic RTL layouts',
      'Bilingual documents',
      'Query Reports',
      'Workflow automation',
      'Custom permissions and data access',
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Product development                                                 */
/* ------------------------------------------------------------------ */

export type Product = {
  id: string
  index: string
  title: string
  kind: string
  status: string
  statusTone: 'active' | 'concept' | 'research'
  description: string
  stack: string[]
  repo: string | null
  /** One of the built-in generated visuals, or omit when using `image`. */
  visual: 'modular' | 'ticket' | 'fleet' | 'ocr' | 'copilot'
  /** Optional real screenshot: file placed in `public/`, e.g. 'projects/app.png'. */
  image?: string | null
  /** Renders the large featured card. Only one project should set this. */
  featured?: boolean
}

/**
 * ── ADD A NEW PROJECT ────────────────────────────────────────────────
 * 1. Copy the template below to the end of the `products` array.
 * 2. Give it a unique `id` and the next `index` ('06', '07', …).
 * 3. `visual` must be one of: modular | ticket | fleet | ocr | copilot
 * 4. Optional real screenshot: put the file in `public/projects/` and add
 *    `image: 'projects/my-screenshot.png'`.
 * 5. Add `featured: true` to exactly one project (the large card).
 * 6. `statusTone` must be: active | concept | research
 *
 * Template — copy everything between the markers:
 *
 *   // ── copy ──
 *   {
 *     id: 'my-new-project',
 *     index: '06',
 *     title: 'My New Project',
 *     kind: 'Frappe Application',
 *     status: 'Under development',
 *     statusTone: 'active',
 *     description: 'One or two sentences describing the project honestly.',
 *     stack: ['Frappe', 'Python', 'MariaDB'],
 *     repo: null,
 *     visual: 'modular',
 *   },
 *   // ── end ──
 */
export const products: Product[] = [
  {
    id: 'zero-touch',
    index: '01',
    title: 'Zero Touch',
    kind: 'Frappe Application',
    status: 'Under development',
    statusTone: 'active',
    description:
      'A modular Frappe application exploring reusable application architecture and business automation, built as a foundation rather than a single-purpose tool.',
    stack: ['Frappe Framework', 'Python', 'JavaScript', 'MariaDB'],
    repo: 'https://github.com/Zero056/Zero-Touch',
    visual: 'modular',
    featured: true,
  },
  {
    id: 'support-ticketing',
    index: '02',
    title: 'Customer Support & Ticketing',
    kind: 'Product concept',
    status: 'Concept / In development',
    statusTone: 'concept',
    description:
      'A standalone Frappe application for customer communication: ticket assignment, live chat, support workflows and audit trails.',
    stack: ['Frappe', 'Python', 'REST APIs'],
    repo: null,
    visual: 'ticket',
  },
  {
    id: 'fleet-iot',
    index: '03',
    title: 'GPS & IoT Fleet Management',
    kind: 'Product research',
    status: 'Concept / Research',
    statusTone: 'research',
    description:
      'A platform concept integrating GPS devices, IoT hardware, vehicle tracking and logistics operations into one operational view.',
    stack: ['IoT', 'Integrations', 'Python'],
    repo: null,
    visual: 'fleet',
  },
  {
    id: 'document-ocr',
    index: '04',
    title: 'AI Document OCR',
    kind: 'Product concept',
    status: 'Concept / In development',
    statusTone: 'concept',
    description:
      'Document processing with OCR, structured extraction, handwriting recognition and translation — designed to feed clean data into business systems.',
    stack: ['Python', 'AI / OCR', 'Automation'],
    repo: null,
    visual: 'ocr',
  },
  {
    id: 'employee-copilot',
    index: '05',
    title: 'Employee AI Copilot',
    kind: 'Product research',
    status: 'Concept / Research',
    statusTone: 'research',
    description:
      'An AI-powered HR and employee intelligence concept focused on skills, development and intelligent HR workflows.',
    stack: ['Python', 'AI', 'HRMS'],
    repo: null,
    visual: 'copilot',
  },
]

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export const processSteps = [
  {
    step: '01',
    title: 'Understand',
    text: 'Business requirements and operational workflows. The process as it actually runs, not as it is described in a document.',
    detail: 'Requirements · Process mapping · Constraints',
  },
  {
    step: '02',
    title: 'Architect',
    text: 'Design maintainable application structures: the data model, document states, permissions and boundaries between systems.',
    detail: 'DocTypes · Data model · Permissions',
  },
  {
    step: '03',
    title: 'Engineer',
    text: 'Implement backend logic and user experiences, with validation where the business cannot afford a mistake.',
    detail: 'Python · Client scripts · Validation',
  },
  {
    step: '04',
    title: 'Integrate',
    text: 'Connect systems, APIs and business processes so data moves once, correctly, and in the right direction.',
    detail: 'APIs · Accounting · Third-party systems',
  },
  {
    step: '05',
    title: 'Deliver',
    text: 'Test, refine and deliver reliable solutions — with reporting and documentation the team can operate without me.',
    detail: 'Testing · Reports · Handover',
  },
]
