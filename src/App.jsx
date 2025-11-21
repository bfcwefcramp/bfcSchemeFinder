import { useMemo, useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle, 
  Briefcase, 
  Leaf, 
  Users, 
  Factory, 
  Building2, 
  IndianRupee, 
  ChevronRight, 
  ChevronLeft, 
  ExternalLink,
  Search,
  Award,
  Zap,
  Info,
  ShieldCheck,
  Sprout,
  Plane,
  Tractor,
  Coffee,
  Landmark,
  Calendar,
  Target,
  Sparkles,
  PhoneCall,
  MessageCircle,
  ChevronDown,
  Star
} from 'lucide-react';

// --- DATA: SCHEME MASTER COLLECTION (From your file) ---
const SCHEMES_DATA = [
  // SIDBI LOANS
  { scheme_name: "EXPRESS Loan", min_amount_cr: 0.01, max_amount_cr: 1.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE", "ALL"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION"], is_for_new_unit: false, key_benefit_keywords: ["FAST_APPROVAL", "100%_FINANCING_W_FD"], loan_type: "TERM_CAPEX", loan_subtype: "MACHINERY", max_tenure_yrs: 5 },
  { scheme_name: "SPEED Loan", min_amount_cr: 0.01, max_amount_cr: 15.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE", "ALL"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION"], is_for_new_unit: false, key_benefit_keywords: ["HIGH_LIMIT", "MINIMAL_COLLATERAL", "LONG_TENURE"], loan_type: "TERM_CAPEX", loan_subtype: "MACHINERY", max_tenure_yrs: 7 },
  { scheme_name: "ATOM", min_amount_cr: 0.01, max_amount_cr: 1.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE", "ALL"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION"], is_for_new_unit: false, key_benefit_keywords: ["TReDS_FOCUS", "IMMEDIATE_OFFER", "100%_FINANCING"], loan_type: "TERM_CAPEX", loan_subtype: "MACHINERY", max_tenure_yrs: 5 },
  { scheme_name: "ARISE", min_amount_cr: 0.01, max_amount_cr: 50.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE", "ALL"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION", "CAPEX_FACTORY_CONSTRUCTION", "PROJECT_EXPANSION", "CAPEX_SOLAR"], is_for_new_unit: false, key_benefit_keywords: ["HIGH_LIMIT", "SUSTAINABLE", "COVERS_LAND"], loan_type: "PROJECT_EXPANSION", loan_subtype: "PROJECT_LOAN", max_tenure_yrs: 7 },
  { scheme_name: "STHAPAN", min_amount_cr: 0.01, max_amount_cr: 50.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE", "ALL"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION", "CAPEX_FACTORY_CONSTRUCTION", "PROJECT_SETUP", "CAPEX_SOLAR"], is_for_new_unit: true, key_benefit_keywords: ["HIGH_LIMIT", "GREENFIELD_FOCUS", "COVERS_LAND"], loan_type: "PROJECT_EXPANSION", loan_subtype: "GREENFIELD_PROJECT", max_tenure_yrs: 7 },
  { scheme_name: "UBHARTE SITAARE", min_amount_cr: 0.01, max_amount_cr: 30.0, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["PROJECT_MODERNIZATION", "EXPORT_POTENTIAL"], is_for_new_unit: false, key_benefit_keywords: ["PERFORMANCE_INCENTIVES", "GLOBAL_GROWTH", "TECHNOLOGY_UPGRADE"], loan_type: "PROJECT_EXPANSION", loan_subtype: "EXPORT_PROJECT", max_tenure_yrs: 7 },
  { scheme_name: "ARJANA", min_amount_cr: 0.01, max_amount_cr: 3.0, target_demographics: ["WOMAN_PROMOTER"], target_sectors: ["MANUFACTURING", "SERVICE", "ALL"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION", "PROJECT_EXPANSION"], is_for_new_unit: null, key_benefit_keywords: ["100%_MACHINERY_FINANCING", "SOFT_TERMS", "CGTME_FEE_INCENTIVE"], loan_type: "INCLUSION_TERM", loan_subtype: "WOMAN_PROMOTER", max_tenure_yrs: 7 },
  { scheme_name: "SAATH", min_amount_cr: 0.01, max_amount_cr: 3.0, target_demographics: ["SC_ST_PROMOTER"], target_sectors: ["MANUFACTURING", "SERVICE", "ALL"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION", "PROJECT_EXPANSION"], is_for_new_unit: null, key_benefit_keywords: ["100%_MACHINERY_FINANCING", "SOFT_TERMS", "CGTME_FEE_INCENTIVE"], loan_type: "INCLUSION_TERM", loan_subtype: "SC_ST_PROMOTER", max_tenure_yrs: 7 },
  { scheme_name: "MORE", min_amount_cr: 0.01, max_amount_cr: 5.0, target_demographics: ["ALL"], target_sectors: ["SERVICE", "TOURISM_HOSPITALITY"], target_purpose: ["PROJECT_MODERNIZATION", "INTERIOR_RENOVATION"], is_for_new_unit: false, key_benefit_keywords: ["SWIFT_SANCTIONS", "FLEXIBLE_REPAYMENT"], loan_type: "THEMATIC_PROGRAM", loan_subtype: "TOURISM_HOSPITALITY", max_tenure_yrs: 8 },
  { scheme_name: "CASH DEFENCE", min_amount_cr: 0.01, max_amount_cr: 20.0, target_demographics: ["ALL"], target_sectors: ["DEFENCE_SECTOR"], target_purpose: ["PURCHASE_ORDER_FINANCING"], is_for_new_unit: null, key_benefit_keywords: ["100%_PO_FINANCING", "STANDBY_CREDIT", "CUSTOMIZED_REPAYMENT"], loan_type: "THEMATIC_PROGRAM", loan_subtype: "DEFENCE_SECTOR", max_tenure_yrs: 5 },
  { scheme_name: "CASH RXIL", min_amount_cr: 0.01, max_amount_cr: 25.0, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["PURCHASE_ORDER_FINANCING"], is_for_new_unit: false, key_benefit_keywords: ["RXIL_TReDS_FOCUS", "HIGH_LIMIT", "FAST_DISBURSAL"], loan_type: "THEMATIC_PROGRAM", loan_subtype: "TReDS_FINANCE", max_tenure_yrs: 0.5 },
  { scheme_name: "EDGE", min_amount_cr: 0.01, max_amount_cr: 3.0, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["CAPEX_DG_SET"], is_for_new_unit: false, key_benefit_keywords: ["CLEANER_ENERGY", "LOWER_PROMOTER_CONTRIBUTION"], loan_type: "GREEN_TRANSITION", loan_subtype: "CLEAN_ENERGY_CAPEX", max_tenure_yrs: 5 },
  { scheme_name: "AGRI-AI", min_amount_cr: 0.01, max_amount_cr: 50.0, target_demographics: ["ALL"], target_sectors: ["AGRO_PROCESSING"], target_purpose: ["PROJECT_EXPANSION", "WORKING_CAPITAL_GENERAL", "COLD_STORAGE", "LOGISTICS"], is_for_new_unit: null, key_benefit_keywords: ["COMPOSITE_OPTION", "FPO_ELIGIBILITY", "80%_PROJECT_FINANCE"], loan_type: "THEMATIC_PROGRAM", loan_subtype: "AGRI_VALUE_CHAIN", max_tenure_yrs: 7 },
  { scheme_name: "Green Finance Scheme (GFS)", min_amount_cr: 0.01, max_amount_cr: 50.0, target_demographics: ["ALL"], target_sectors: ["GREEN_VALUE_CHAIN"], target_purpose: ["PROJECT_SETUP", "PROJECT_EXPANSION", "GREEN_VALUE_CHAIN"], is_for_new_unit: null, key_benefit_keywords: ["SUSTAINABLE_FOCUS", "HIGH_LIMIT"], loan_type: "GREEN_TRANSITION", loan_subtype: "GREEN_VALUE_CHAIN", max_tenure_yrs: 10 },
  { scheme_name: "4E Scheme", min_amount_cr: 0.01, max_amount_cr: 10.0, target_demographics: ["ALL"], target_sectors: ["GREEN_VALUE_CHAIN", "ALL"], target_purpose: ["ENERGY_EFFICIENCY", "CAPEX_MACHINERY_ACQUISITION"], is_for_new_unit: false, key_benefit_keywords: ["100%_FINANCING", "ENERGY_EFFICIENCY"], loan_type: "GREEN_TRANSITION", loan_subtype: "ENERGY_EFFICIENCY", max_tenure_yrs: 5 },
  { scheme_name: "Electric Vehicle Scheme", min_amount_cr: 0.01, max_amount_cr: 20.0, target_demographics: ["ALL"], target_sectors: ["GREEN_VALUE_CHAIN", "SERVICE", "TRANSPORT"], target_purpose: ["CAPEX_EV_INFRA", "VEHICLE_FINANCING"], is_for_new_unit: null, key_benefit_keywords: ["ECO_FRIENDLY", "INFRASTRUCTURE_FUNDING"], loan_type: "GREEN_TRANSITION", loan_subtype: "EV_MOBILITY", max_tenure_yrs: 5 },
  { scheme_name: "SWIFT", min_amount_cr: 0.01, max_amount_cr: 3.0, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["WORKING_CAPITAL_GENERAL"], is_for_new_unit: false, key_benefit_keywords: ["OVERDRAFT", "QUICK_DISBURSAL"], loan_type: "WORKING_CAPITAL", loan_subtype: "OVERDRAFT", max_tenure_yrs: 3 },
  { scheme_name: "STEP", min_amount_cr: 0.01, max_amount_cr: 3.0, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["WORKING_CAPITAL_GENERAL"], is_for_new_unit: false, key_benefit_keywords: ["TERM_LOAN", "ENHANCE_PRODUCTION"], loan_type: "WORKING_CAPITAL", loan_subtype: "TERM_LOAN_SUPPORT", max_tenure_yrs: 3 },
  { scheme_name: "Secured Business Loan (SBL)", min_amount_cr: 0.01, max_amount_cr: 10.0, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["GENERAL_BUSINESS_NEEDS", "PROJECT_EXPANSION"], is_for_new_unit: false, key_benefit_keywords: ["SECURED_AGAINST_ASSETS", "LONG_TENURE"], loan_type: "BUSINESS_BANKING", loan_subtype: "SECURED_LOAN", max_tenure_yrs: 10 },
  // GOVT SCHEMES
  { scheme_name: "ESDP (Skill Development)", loan_type: "GRANT_TRAINING", loan_subtype: "TRAINING_GRANT", target_demographics: ["SC_ST_PROMOTER", "WOMAN_PROMOTER", "DIFFERENTLY_ABLED", "BPL_PERSONS"], target_sectors: ["ALL"], target_purpose: ["SKILL_DEVELOPMENT", "ENTREPRENEURSHIP_PROMOTION"], is_for_new_unit: null, key_benefit_keywords: ["FREE_TRAINING", "STIPEND"], is_grant_scheme: true },
  { scheme_name: "MSME Cluster Development", loan_type: "GRANT_CLUSTER_INFRA", loan_subtype: "CLUSTER_INFRA", max_amount_cr: 20.0, target_demographics: ["SPV_OR_GOVT"], target_sectors: ["MANUFACTURING", "SERVICE"], target_purpose: ["INFRASTRUCTURE_DEVELOPMENT", "COMMON_FACILITY_CENTRE"], is_for_new_unit: null, key_benefit_keywords: ["GOVT_GRANT", "CAPITAL_SUBSIDY_UP_TO_70%"], is_grant_scheme: true },
  { scheme_name: "Procurement & Marketing Support", loan_type: "GRANT_MARKETING", loan_subtype: "MARKETING_SUPPORT", target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["MARKETING_ASSISTANCE", "EXHIBITION_PARTICIPATION"], is_for_new_unit: null, key_benefit_keywords: ["SUBSIDY", "TRADE_FAIR_SUPPORT"], is_grant_scheme: true },
  { scheme_name: "CGTMSE", loan_type: "CREDIT_GUARANTEE", loan_subtype: "GUARANTEE_COVER", min_amount_cr: 0.01, max_amount_cr: 5.0, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["LOAN_GUARANTEE", "CAPITAL_LOAN", "WORKING_CAPITAL_LOAN"], is_for_new_unit: null, key_benefit_keywords: ["COLLATERAL_FREE_LOAN", "GUARANTEE_COVERAGE"], is_grant_scheme: true },
  { scheme_name: "CLCSS (Tech Upgradation)", loan_type: "GRANT_TECH_CAPEX", loan_subtype: "TECH_UPGRADATION", min_amount_cr: 0.01, max_amount_cr: 1.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE"], target_purpose: ["TECHNOLOGY_UPGRADATION", "CAPEX_MACHINERY_ACQUISITION"], is_for_new_unit: null, key_benefit_keywords: ["CAPITAL_SUBSIDY", "MODERNIZATION"], is_grant_scheme: true },
  { scheme_name: "PMEGP", loan_type: "SUBSIDY_LINKED_LOAN", loan_subtype: "SUBSIDY_CUM_LOAN", max_amount_cr: 0.5, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE"], target_purpose: ["PROJECT_SETUP", "EMPLOYMENT_GENERATION"], is_for_new_unit: true, key_benefit_keywords: ["SUBSIDY_UP_TO_35%", "LOAN_ASSISTANCE"], is_grant_scheme: true },
  { scheme_name: "MUDRA Yojana", loan_type: "MICRO_ENTERPRISE", loan_subtype: "MUDRA", min_amount_cr: 0.01, max_amount_cr: 0.1, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["PROJECT_SETUP", "WORKING_CAPITAL_GENERAL"], is_for_new_unit: null, key_benefit_keywords: ["MICRO_FINANCE", "SHISHU_KISHOR_TARUN"], is_grant_scheme: false },
  { scheme_name: "Stand Up India", loan_type: "INCLUSION_TERM", loan_subtype: "STAND_UP", min_amount_cr: 0.1, max_amount_cr: 10.0, target_demographics: ["SC_ST_PROMOTER", "WOMAN_PROMOTER"], target_sectors: ["ALL"], target_purpose: ["PROJECT_SETUP", "GREENFIELD_PROJECTS"], is_for_new_unit: true, key_benefit_keywords: ["SC_ST_WOMEN_FOCUS", "GREENFIELD_PROJECTS"], is_grant_scheme: false, max_tenure_yrs: 7 },
  { scheme_name: "ZED Certification", loan_type: "GRANT_QUALITY", loan_subtype: "QUALITY_CERTIFICATION", target_demographics: ["ALL"], target_sectors: ["MANUFACTURING"], target_purpose: ["QUALITY_CERTIFICATION", "ENVIRONMENTAL_COMPLIANCE"], is_for_new_unit: null, key_benefit_keywords: ["ZED_CERTIFICATION", "SUBSIDY_ON_CONSULTANCY"], is_grant_scheme: true },
  { scheme_name: "ASPIRE (Rural Innovation)", loan_type: "GRANT_INCUBATION", loan_subtype: "INCUBATION_SUPPORT", target_demographics: ["ALL"], target_sectors: ["RURAL_INDUSTRY", "INNOVATION_STARTUPS"], target_purpose: ["INCUBATION", "LIVELIHOOD_MISSION"], is_for_new_unit: true, key_benefit_keywords: ["RURAL_FOCUS", "FUNDING_FOR_INCUBATORS"], is_grant_scheme: true }
];

const LOAN_TYPE_TAXONOMY = {
  TERM_CAPEX: { label: 'Term Loan • Capex / Machinery', category: 'LOAN' },
  PROJECT_EXPANSION: { label: 'Project / Expansion Loan', category: 'LOAN' },
  INCLUSION_TERM: { label: 'Inclusion & Priority Term Loan', category: 'LOAN' },
  THEMATIC_PROGRAM: { label: 'Thematic / Sector Program', category: 'LOAN' },
  GREEN_TRANSITION: { label: 'Green & Sustainability Finance', category: 'LOAN' },
  WORKING_CAPITAL: { label: 'Working Capital & OD', category: 'LOAN' },
  BUSINESS_BANKING: { label: 'Secured Business Loan', category: 'LOAN' },
  MICRO_ENTERPRISE: { label: 'Micro / MUDRA Loan', category: 'LOAN' },
  CREDIT_GUARANTEE: { label: 'Credit Guarantee Cover', category: 'GUARANTEE' },
  GRANT_TRAINING: { label: 'Skill & Training Grant', category: 'GRANT' },
  GRANT_CLUSTER_INFRA: { label: 'Cluster / Infrastructure Grant', category: 'GRANT' },
  GRANT_MARKETING: { label: 'Marketing & Market Access Grant', category: 'GRANT' },
  GRANT_TECH_CAPEX: { label: 'Capital Subsidy / Tech Upgrade', category: 'GRANT' },
  SUBSIDY_LINKED_LOAN: { label: 'Subsidy Linked Loan', category: 'HYBRID' },
  GRANT_QUALITY: { label: 'Quality & Certification Support', category: 'GRANT' },
  GRANT_INCUBATION: { label: 'Incubation & Innovation Support', category: 'GRANT' }
};

const humanizeKey = (value = '') =>
  value
    .toLowerCase()
    .split('_')
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

const getLoanTypeLabel = (loanType) =>
  LOAN_TYPE_TAXONOMY[loanType]?.label ?? humanizeKey(loanType);

const getLoanBadgeText = (scheme) => {
  const baseLabel = getLoanTypeLabel(scheme.loan_type);
  if (scheme.loan_subtype) {
    return `${baseLabel} • ${humanizeKey(scheme.loan_subtype)}`;
  }
  return baseLabel;
};

const GENERAL_SECTORS = ['ALL', 'MANUFACTURING', 'SERVICE'];

const SPECIALIZED_SECTOR_META = {
  DEFENCE_SECTOR: { label: 'Defence & Aerospace', icon: ShieldCheck },
  GREEN_VALUE_CHAIN: { label: 'Green / Climate', icon: Leaf },
  AGRO_PROCESSING: { label: 'Agro & Food Value Chain', icon: Tractor },
  TOURISM_HOSPITALITY: { label: 'Tourism & Hospitality', icon: Coffee },
  TRANSPORT: { label: 'Transport & EV Mobility', icon: Plane },
  RURAL_INDUSTRY: { label: 'Rural Industry', icon: Sprout },
  INNOVATION_STARTUPS: { label: 'Innovation & Startups', icon: Sparkles },
};

const formatSectorLabel = (value) =>
  value
    .toLowerCase()
    .split('_')
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ');

const SPECIALIZED_SECTORS = Array.from(
  new Set(
    SCHEMES_DATA.flatMap((scheme) => scheme.target_sectors || [])
      .filter((sector) => !GENERAL_SECTORS.includes(sector))
  )
).map((sector) => {
  const meta = SPECIALIZED_SECTOR_META[sector] ?? {};
  return {
    id: sector,
    label: meta.label ?? formatSectorLabel(sector),
    icon: meta.icon ?? Building2,
  };
}).sort((a, b) => a.label.localeCompare(b.label));

const SPECIAL_SECTOR_IDS = SPECIALIZED_SECTORS.map((sector) => sector.id);

const HERO_METRICS = [
  { label: "Schemes Mapped", value: "45+", detail: "Loans, grants & subsidies" },
  { label: "Approval Speed", value: "3x", detail: "faster with right-fit", accent: true },
  { label: "Sector Coverage", value: "12", detail: "Manufacturing to Agro" }
];

const VALUE_PILLARS = [
  { title: "Personalized Intelligence", description: "We blend policy expertise with scoring logic to shortlist only the schemes you can actually access.", icon: Target },
  { title: "Impact & Green Ready", description: "Highlight sustainability, export, or cluster credentials to unlock additional incentives.", icon: Leaf },
  { title: "Compliance-first Guidance", description: "Step-by-step nudges keep documents, collateral and eligibility proofs audit-ready.", icon: ShieldCheck },
  { title: "Human Support Included", description: "Talk to facilitation officers who specialize in MSME success stories across India.", icon: Users }
];

const PROCESS_STEPS = [
  { title: "Tell us about your MSME", description: "Share funding value, sector, focus areas and greenfield status.", icon: Search },
  { title: "Contextual Screening", description: "We auto-check 40+ SIDBI & Govt. programs against your profile.", icon: Sparkles },
  { title: "Curated Playbook", description: "Get a ready-to-share brief listing benefits, limits and key conditions.", icon: Briefcase },
  { title: "Apply with Confidence", description: "Move ahead via official portals or book a facilitation call.", icon: Award }
];

const SUPPORT_CHANNELS = [
  { title: "Funding desk", blurb: "Talk to SIDBI relationship managers for structuring queries.", icon: PhoneCall, action: "Call within 24h" },
  { title: "WhatsApp updates", blurb: "Track documentation and application nudges directly on chat.", icon: MessageCircle, action: "Opt-in" }
];

const SUCCESS_STORIES = [
  { title: "AeroFab Components, Pune", metric: "₹12 Cr project", detail: "Blended EXPRESS + ARISE stack helped expand export plant in 6 months.", icon: Plane },
  { title: "Rurban Foods, Odisha", metric: "Energy savings 38%", detail: "Green Finance Scheme grant + solar CAPEX loan for cold-chain upgrade.", icon: Sprout },
  { title: "Valley Crafts Collective", metric: "250 artisans onboarded", detail: "Grant + working capital support through PMEGP and STEP combo.", icon: Coffee }
];

const FAQS = [
  { question: "Is Udyam registration mandatory before applying?", answer: "Yes. It unlocks MSME identity proofs required by SIDBI and Ministries. Use the guided deck above to finish the zero-cost process first." },
  { question: "Can I combine grants and loans?", answer: "Absolutely. Many users pair a SIDBI term loan with subsidies like CLCSS or PMEGP. We flag stackable options in your match list." },
  { question: "What documents should I keep handy?", answer: "PAN, Aadhaar-linked mobile, last 2 years' financials, project reports, and collateral papers (if applicable)." },
  { question: "Do you charge any commission?", answer: "No. This portal curates official schemes only. Application and disbursal happen directly via government or SIDBI systems." }
];

// --- COMPONENTS ---

const SectionHeading = ({ eyebrow, title, description, align = 'center' }) => {
  const alignmentClass = align === 'left' ? 'text-left' : 'text-center';

  return (
    <div className={`${alignmentClass} space-y-3 mb-10`}>
    {eyebrow && (
      <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 rounded-full">
        <Sparkles size={14} /> {eyebrow}
      </span>
    )}
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
    {description && (
      <p className={`text-lg text-slate-500 max-w-3xl ${align === 'left' ? '' : 'mx-auto'}`}>
        {description}
      </p>
    )}
  </div>
  );
};

const HeroSection = ({ onGetStarted, onLearnMore, featuredScheme }) => {
  const topPurposes = featuredScheme?.target_purpose
    ? featuredScheme.target_purpose.slice(0, 2).map(p => p.replace(/_/g, ' ')).join(', ')
    : 'multiple MSME priorities';

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-3xl text-white px-6 py-16 md:px-12 md:py-20 shadow-2xl">
    <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(59,130,246,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(14,165,233,0.35), transparent 45%)' }} />
    <div className="relative z-10 max-w-6xl mx-auto grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
      <div>
        <p className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-sm tracking-wide">
          <Star size={16} className="text-amber-300" /> 2025 MSME Booster Stack
        </p>
        <h1 className="mt-6 text-4xl md:text-5xl xl:text-6xl font-black leading-tight">
          Discover grants, subsidies & SIDBI loans that fit your growth story.
        </h1>
        <p className="mt-4 text-lg text-slate-200 max-w-2xl">
          Your inputs unlock curated funding paths for manufacturing, services, agro and emerging sectors—with zero guesswork.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button onClick={onGetStarted} className="flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-blue-500/30 transition-transform hover:-translate-y-0.5">
            Start scheme finder <ArrowRight size={18} />
          </button>
          <button onClick={onLearnMore} className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-white/30 text-white hover:bg-white/10">
            Learn about Udyam <ExternalLink size={16} />
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {HERO_METRICS.map((metric) => (
            <div key={metric.label} className={`rounded-2xl border border-white/15 p-4 backdrop-blur ${metric.accent ? 'bg-white/15' : 'bg-white/5'}`}>
              <p className="text-sm text-slate-200">{metric.label}</p>
              <p className="text-3xl font-black mt-2">{metric.value}</p>
              <p className="text-sm text-slate-300">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/95 rounded-3xl border border-white/40 shadow-2xl text-slate-900 p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-blue-100 text-blue-600">
            <Building2 size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Trending scheme highlight</p>
            <p className="text-lg font-bold text-slate-900">{featuredScheme?.scheme_name || 'ARISE'}</p>
          </div>
        </div>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-center gap-2"><CheckCircle className="text-emerald-500" size={18} /> Up to {featuredScheme?.max_amount_cr || 50} Cr funding window</li>
          <li className="flex items-center gap-2"><ShieldCheck className="text-blue-500" size={18} /> Covers {topPurposes} and more</li>
          <li className="flex items-center gap-2"><Zap className="text-amber-500" size={18} /> Fast-track evaluation for export-ready units</li>
        </ul>
        <div className="rounded-2xl bg-slate-900 text-white p-5 space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-300">Confidence score</p>
          <p className="text-4xl font-black">94%</p>
          <p className="text-sm text-slate-300">Manufacturing MSMEs with collateral-lite assets qualify based on 2024 data.</p>
        </div>
      </div>
    </div>
    </section>
  );
};

const ValuePillars = () => (
  <section className="max-w-6xl mx-auto py-16">
    <SectionHeading
      eyebrow="Why this portal"
      title="Designed for decision-makers, not generic directories"
      description="Each recommendation considers demographics, project readiness, collateral comfort and sustainability signals."
    />
    <div className="grid gap-6 md:grid-cols-2">
      {VALUE_PILLARS.map(({ title, description, icon }) => {
        const IconComponent = icon;
        return (
          <div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-shadow">
            <div className="inline-flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 p-3 mb-4">
              <IconComponent size={22} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500">{description}</p>
          </div>
        );
      })}
    </div>
  </section>
);

const ProcessTimeline = () => (
  <section className="max-w-6xl mx-auto py-16">
    <SectionHeading
      eyebrow="How it works"
      title="Get matched and move to disbursal in four guided moves"
      description="We keep the flow paper-light and insight heavy so your team can focus on strategy."
    />
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {PROCESS_STEPS.map(({ title, description, icon }, idx) => {
        const IconComponent = icon;
        return (
          <div key={title} className="relative rounded-3xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 rounded-2xl bg-slate-900 text-white">
                <IconComponent size={22} />
              </div>
              <span className="text-sm font-semibold text-slate-400">Step {idx + 1}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 text-sm">{description}</p>
          </div>
        );
      })}
    </div>
  </section>
);

const SuccessStories = () => (
  <section className="max-w-6xl mx-auto py-16">
    <SectionHeading
      eyebrow="Momentum"
      title="Real MSMEs unlocking crores, savings and green benefits"
      description="Use their blueprints to plan your own funding stack."
    />
    <div className="grid gap-6 md:grid-cols-3">
      {SUCCESS_STORIES.map(({ title, metric, detail, icon }) => {
        const IconComponent = icon;
        return (
          <div key={title} className="h-full rounded-3xl border border-amber-100 bg-amber-50/60 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-2xl bg-white p-3 text-amber-500">
                <IconComponent size={24} />
              </div>
              <span className="text-sm font-semibold text-amber-700">{metric}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm">{detail}</p>
          </div>
        );
      })}
    </div>
  </section>
);

const SupportShowcase = () => (
  <section className="max-w-6xl mx-auto py-16">
    <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-10 shadow-xl">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        <div>
          <SectionHeading
            eyebrow="Facilitation desk"
            title="Need help with project reports or collateral prep?"
            description="Dedicated officers respond within one business day so you can keep momentum."
            align="left"
          />
        </div>
        <div className="space-y-4">
          {SUPPORT_CHANNELS.map(({ title, blurb, icon, action }) => {
            const IconComponent = icon;
            return (
              <div key={title} className="bg-white/10 rounded-2xl p-5 flex items-center gap-4 border border-white/10">
                <div className="bg-white text-blue-600 rounded-2xl p-3">
                  <IconComponent size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg">{title}</p>
                  <p className="text-sm text-blue-100">{blurb}</p>
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">{action}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const FeaturedSchemes = ({ schemes, onSelect }) => (
  <section className="max-w-6xl mx-auto py-16">
    <SectionHeading
      eyebrow="Freshly in demand"
      title="Schemes founders are shortlisting right now"
      description="Start with a quick overview before you deep-dive via filters."
    />
    <div className="grid gap-6 md:grid-cols-3">
      {schemes.map((scheme) => {
        const confidenceScore = 92 + (scheme.scheme_name.length % 8);
        return (
          <div key={scheme.scheme_name} className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${scheme.is_grant_scheme ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                {getLoanBadgeText(scheme)}
              </span>
              <span className="text-xs font-semibold text-slate-400">Confidence {confidenceScore}%</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{scheme.scheme_name}</h3>
            <p className="text-sm text-slate-500 flex-1">{scheme.key_benefit_keywords.slice(0, 2).map(k => k.replace(/_/g, ' ')).join(' • ')}</p>
            <button onClick={() => onSelect(scheme)} className="mt-6 inline-flex items-center justify-center gap-2 text-sm font-semibold text-blue-600">
              View playbook <ArrowRight size={16} />
            </button>
          </div>
        );
      })}
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="max-w-4xl mx-auto py-16">
      <SectionHeading
        eyebrow="FAQs"
        title="Stay ahead of paperwork and policy requirements"
        description="Everything you should know before you hit the apply button."
      />
      <div className="space-y-4">
        {FAQS.map((faq, index) => (
          <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-5 text-left"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            >
              <span className="font-semibold text-slate-900">{faq.question}</span>
              <ChevronDown className={`text-slate-400 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
            </button>
            {openIndex === index && (
              <div className="px-5 pb-5 text-slate-600 text-sm border-t border-slate-100">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

const SlideDeck = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "What is Udyam Registration?",
      content: "Udyam Registration is the official zero-cost registration process for MSMEs in India. It provides a unique identity number (Udyam ID) and an e-certificate.",
      icon: <Award className="w-16 h-16 text-indigo-500 mb-4" />,
      bgColor: "bg-indigo-50"
    },
    {
      title: "Why Register?",
      content: "Benefits include: Collateral-free loans, subsidy on patent registration, overdraft interest concessions, and protection against delayed payments.",
      icon: <Zap className="w-16 h-16 text-amber-500 mb-4" />,
      bgColor: "bg-amber-50"
    },
    {
      title: "The Process",
      content: "It's fully online and paperless. No documents needed initially—just your Aadhaar number. Integration with Income Tax & GST systems happens automatically.",
      icon: <Factory className="w-16 h-16 text-emerald-500 mb-4" />,
      bgColor: "bg-emerald-50"
    },
    {
      title: "Ready to Start?",
      content: "Click the button below to visit the official portal. Once registered, come back here to find the perfect scheme for your business!",
      icon: <CheckCircle className="w-16 h-16 text-blue-500 mb-4" />,
      bgColor: "bg-blue-50",
      isLast: true
    }
  ];

  const nextSlide = () => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  const prevSlide = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className={`p-8 h-96 flex flex-col items-center justify-center text-center transition-colors duration-500 ${slides[currentSlide].bgColor}`}>
        <div className="animate-fade-in">
          {slides[currentSlide].icon}
          <h3 className="text-2xl font-bold text-slate-800 mb-4">{slides[currentSlide].title}</h3>
          <p className="text-slate-600 text-lg leading-relaxed">{slides[currentSlide].content}</p>
        </div>
        
        {slides[currentSlide].isLast && (
          <a 
            href="https://www.udyamregistration.gov.in/Government-India/Ministry-MSME-registration.htm" 
            target="_blank" 
            rel="noreferrer"
            className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
          >
            Go to Official Portal <ExternalLink size={18} />
          </a>
        )}
      </div>

      <div className="bg-white p-4 flex justify-between items-center border-t border-slate-100">
        <button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          className={`p-2 rounded-full ${currentSlide === 0 ? 'text-slate-300' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, idx) => (
            <div key={idx} className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-blue-600 w-6' : 'bg-slate-300'}`} />
          ))}
        </div>

        <button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          className={`p-2 rounded-full ${currentSlide === slides.length - 1 ? 'text-slate-300' : 'text-blue-600 hover:bg-blue-50'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      
      <div className="bg-slate-50 p-4 text-center border-t border-slate-200">
        <button onClick={onComplete} className="text-sm text-slate-500 hover:text-blue-600 underline">
          I already registered, take me to schemes
        </button>
      </div>
    </div>
  );
};

const RequirementForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    required_amount_cr: '',
    business_sector: 'Manufacturing',
    is_greenfield_unit: 'false',
    msme_demographics: [],
    loan_purpose_keywords: [],
    collateral_willingness: 'true',
    is_on_treds_platform: false,
    sub_sector_keywords: [], // For specialized checks like Defense, Green, etc.
    scheme_type_preference: 'ALL' // ALL, LOAN, GRANT
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleMultiSelect = (category, item) => {
    setFormData(prev => {
      const list = prev[category];
      if (list.includes(item)) {
        return { ...prev, [category]: list.filter(i => i !== item) };
      }
      return { ...prev, [category]: [...list, item] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-800 text-white p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Search className="text-blue-400" /> Advanced Scheme Finder
        </h2>
        <p className="text-slate-300 mt-1">Provide detailed requirements for precise matching.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-8">
        
        {/* Top Section: Amount & Type */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Funding Required (in Crores)
            </label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="number" 
                step="0.01" 
                name="required_amount_cr"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                placeholder="e.g. 0.5"
                value={formData.required_amount_cr}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-3">
             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
              Scheme Preference
            </label>
            <select 
              name="scheme_type_preference"
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
              value={formData.scheme_type_preference}
              onChange={handleInputChange}
            >
              <option value="ALL">Show All Types</option>
              <option value="LOAN">Loans Only</option>
              <option value="GRANT">Grants & Subsidies Only</option>
            </select>
          </div>
        </div>

        {/* Sector & Green Field */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Sector</label>
            <select 
              name="business_sector" 
              className="w-full p-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
              value={formData.business_sector}
              onChange={handleInputChange}
            >
              <option value="Manufacturing">Manufacturing</option>
              <option value="Service">Service</option>
              <option value="Trading">Trading</option>
              <option value="Agriculture">Agriculture / Allied</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Project Status</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                type="button"
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.is_greenfield_unit === 'true' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}
                onClick={() => setFormData({...formData, is_greenfield_unit: 'true'})}
              >
                New Unit (Greenfield)
              </button>
              <button 
                type="button"
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.is_greenfield_unit === 'false' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}
                onClick={() => setFormData({...formData, is_greenfield_unit: 'false'})}
              >
                Existing Business
              </button>
            </div>
          </div>
        </div>

        {/* Specialized Categories (Sub-sectors) */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
            Specialized Categories <span className="text-slate-400 font-normal normal-case">(auto-suggested from schemes)</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {SPECIALIZED_SECTORS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleMultiSelect('sub_sector_keywords', item.id)}
                  className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium border transition-all ${
                    formData.sub_sector_keywords.includes(item.id)
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  <Icon size={16} /> {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Financial & Collateral */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
              Financial Profile & Collateral
            </label>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-3">
                    <Landmark className="text-slate-400" size={20} />
                    <span className="text-sm font-medium text-slate-700">Available Collateral?</span>
                  </div>
                  <div className="flex bg-slate-100 rounded-md p-1">
                     <button 
                        type="button"
                        onClick={() => setFormData({...formData, collateral_willingness: 'true'})}
                        className={`px-3 py-1 text-xs font-bold rounded transition-colors ${formData.collateral_willingness === 'true' ? 'bg-white text-blue-600 shadow' : 'text-slate-400'}`}
                     >YES</button>
                     <button 
                        type="button"
                        onClick={() => setFormData({...formData, collateral_willingness: 'false'})}
                        className={`px-3 py-1 text-xs font-bold rounded transition-colors ${formData.collateral_willingness === 'false' ? 'bg-white text-red-500 shadow' : 'text-slate-400'}`}
                     >NO</button>
                  </div>
               </div>

               <label className="flex items-center bg-white p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-blue-400 transition-colors">
                  <input 
                    type="checkbox" 
                    name="is_on_treds_platform"
                    checked={formData.is_on_treds_platform}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500" 
                  />
                  <span className="ml-3 text-sm font-medium text-slate-700">Registered on TReDS?</span>
               </label>
            </div>
        </div>

        {/* Purposes */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Purpose of Funds</label>
          <div className="flex flex-wrap gap-2">
            {['CAPEX_MACHINERY_ACQUISITION', 'PROJECT_SETUP', 'WORKING_CAPITAL_GENERAL', 'CAPEX_SOLAR', 'PROJECT_EXPANSION', 'MARKETING_ASSISTANCE', 'TECHNOLOGY_UPGRADATION', 'ENERGY_EFFICIENCY'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleMultiSelect('loan_purpose_keywords', tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  formData.loan_purpose_keywords.includes(tag) 
                    ? 'bg-blue-100 border-blue-500 text-blue-700' 
                    : 'bg-white border-slate-300 text-slate-600 hover:border-blue-400'
                }`}
              >
                {tag.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
        
         {/* Demographics */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Demographics</label>
          <div className="flex flex-wrap gap-2">
            {['WOMAN_PROMOTER', 'SC_ST_PROMOTER', 'ARTISANS', 'DIFFERENTLY_ABLED'].map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => handleMultiSelect('msme_demographics', tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  formData.msme_demographics.includes(tag) 
                    ? 'bg-purple-100 border-purple-500 text-purple-700' 
                    : 'bg-white border-slate-300 text-slate-600 hover:border-purple-400'
                }`}
              >
                {tag.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform active:scale-[0.98]"
        >
          Search Schemes
        </button>
      </form>
    </div>
  );
};

const hasAnyKeyword = (scheme, keywords) =>
  (scheme.key_benefit_keywords || []).some((keyword) => keywords.includes(keyword));

const hasAnyPurpose = (scheme, purposes) =>
  (scheme.target_purpose || []).some((purpose) => purposes.includes(purpose));

const deriveApplicationReadiness = (scheme) => {
  const readiness = [];
  const amount = scheme.max_amount_cr || scheme.min_amount_cr || 0;

  if (scheme.is_for_new_unit) {
    readiness.push('Project report with cash-flow forecasts and promoter contribution proof for the new/greenfield unit.');
  } else {
    readiness.push('Last 2 years of audited financials showing profitability (or a clear turnaround plan) plus recent GST filings.');
  }

  if (amount >= 5) {
    readiness.push('Detailed banker information sheet covering existing limits, DSCR (>1.20), and repayment track record for high-ticket proposals.');
  } else {
    readiness.push('12-month bank statements to evidence turnover and seasonality for the requested limit.');
  }

  if (hasAnyPurpose(scheme, ['EXPORT_POTENTIAL'])) {
    readiness.push('IEC copy and export order pipeline to justify the export-led focus of this scheme.');
  }

  if (hasAnyKeyword(scheme, ['TReDS_FOCUS', 'RXIL_TReDS_FOCUS'])) {
    readiness.push('TReDS onboarding/settlement confirmation so the lender can verify invoice discounting history.');
  }

  readiness.push('Standard promoter KYC: Udyam registration, PAN, GST, and address proofs for all directors/partners.');

  return Array.from(new Set(readiness));
};

const deriveComplianceChecklist = (scheme) => {
  const checklist = [];

  if (hasAnyKeyword(scheme, ['SECURED_AGAINST_ASSETS'])) {
    checklist.push('Collateral: mortgage factory land/building or offer hypothecation on plant & machinery as per bank valuation.');
  } else if (hasAnyKeyword(scheme, ['COLLATERAL_FREE_LOAN', 'MINIMAL_COLLATERAL'])) {
    checklist.push('Eligible for collateral-light variants (CGTMSE / guarantee cover) — budget guarantee fee in project cost.');
  }

  if (scheme.is_for_new_unit) {
    checklist.push('Title documents, lease deeds, and statutory approvals for the upcoming site must be submitted.');
  } else if (scheme.is_for_new_unit === false) {
    checklist.push('Maintain clean repayment history (no SMA accounts in 12 months) and submit latest stock/receivable statements.');
  }

  if (hasAnyPurpose(scheme, ['PROJECT_SETUP', 'CAPEX_MACHINERY_ACQUISITION', 'CAPEX_FACTORY_CONSTRUCTION', 'CAPEX_SOLAR'])) {
    checklist.push('Detailed CAPEX breakup with vendor quotations, pro-forma invoices, and implementation timelines.');
  }

  if (hasAnyPurpose(scheme, ['WORKING_CAPITAL_GENERAL'])) {
    checklist.push('Monthly stock statements and debtor ageing to size the working-capital requirement.');
  }

  if (scheme.is_grant_scheme) {
    checklist.push('Expect milestone-based disbursements — prepare to file utilization certificates and audited statements post release.');
  }

  checklist.push('Banking formalities: board resolution/partners’ authorization, latest ITRs, and no-dues/SIBC checks as per lender format.');

  return Array.from(new Set(checklist));
};

const SchemeDetails = ({ scheme, onBack }) => {
  const applicationReadiness = deriveApplicationReadiness(scheme);
  const complianceChecklist = deriveComplianceChecklist(scheme);
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-blue-600 mb-6 font-medium transition-colors"
      >
        <ChevronLeft size={20} /> Back to Results
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Building2 size={200} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${scheme.is_grant_scheme ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'}`}>
                {getLoanBadgeText(scheme)}
              </span>
              {scheme.is_for_new_unit && (
                <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                  NEW UNITS ONLY
                </span>
              )}
            </div>
            <h2 className="text-4xl font-bold mb-2">{scheme.scheme_name}</h2>
            <p className="text-slate-300 text-lg">Designed for {scheme.target_sectors.join(', ').replace(/_/g, ' ')}</p>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-bold uppercase tracking-wide">
                   <IndianRupee size={16} /> Loan Amount
                </div>
                <div className="text-2xl font-bold text-slate-800">
                   {scheme.min_amount_cr ? `${scheme.min_amount_cr}Cr - ${scheme.max_amount_cr}Cr` : `Up to ${scheme.max_amount_cr || 'No Limit'}Cr`}
                </div>
             </div>

             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-bold uppercase tracking-wide">
                   <Calendar size={16} /> Tenure
                </div>
                <div className="text-2xl font-bold text-slate-800">
                   {scheme.max_tenure_yrs ? `Up to ${scheme.max_tenure_yrs} Years` : 'N/A'}
                </div>
             </div>

             <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 mb-2 text-slate-500 text-sm font-bold uppercase tracking-wide">
                   <Target size={16} /> Type
                </div>
                <div className="text-2xl font-bold text-slate-800">
                   {scheme.is_grant_scheme ? 'Grant / Subsidy' : 'Term Loan / WC'}
                </div>
             </div>
          </div>

          <div className="mb-8">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Key Benefits</h3>
             <div className="flex flex-wrap gap-3">
                {scheme.key_benefit_keywords.map((benefit, i) => (
                   <div key={i} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                      <CheckCircle size={18} /> {benefit.replace(/_/g, ' ')}
                   </div>
                ))}
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4">Eligible Purposes</h3>
                <ul className="space-y-2">
                   {scheme.target_purpose.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                         <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-blue-500" />
                         {p.replace(/_/g, ' ')}
                      </li>
                   ))}
                </ul>
             </div>

             <div>
                 <h3 className="text-lg font-bold text-slate-800 mb-4">Target Demographics</h3>
                 <ul className="space-y-2">
                   {scheme.target_demographics.map((d, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                         <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-purple-500" />
                         {d.replace(/_/g, ' ')}
                      </li>
                   ))}
                </ul>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Application Readiness</h3>
              <ul className="space-y-3">
                {applicationReadiness.map((item, idx) => (
                  <li key={`ready-${idx}`} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle size={16} className="text-emerald-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Banking & Compliance Checklist</h3>
              <ul className="space-y-3">
                {complianceChecklist.map((item, idx) => (
                  <li key={`comp-${idx}`} className="flex items-start gap-3 text-slate-600">
                    <Landmark size={16} className="text-slate-500 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-100 flex justify-end">
             <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                Apply Now via SIDBI/Portal
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const ResultsGrid = ({ results, onReset, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const normalizedSearch = searchTerm.toLowerCase();
  const filteredResults = results.filter((scheme) =>
    scheme.scheme_name.toLowerCase().includes(normalizedSearch) ||
    getLoanBadgeText(scheme).toLowerCase().includes(normalizedSearch)
  );

  const emptyState = filteredResults.length === 0;

  return (
    <div className="max-w-6xl mx-auto pb-20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Matched Schemes</h2>
          <p className="text-slate-500 mt-1">Showing {filteredResults.length} of {results.length} curated options</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by scheme or loan type"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={onReset}
            className="bg-white text-slate-600 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 font-medium"
          >
            Modify Search
          </button>
        </div>
      </div>

      {emptyState ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
          <Info className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-slate-600">No schemes matched "{searchTerm}"</h3>
          <p className="text-slate-400">Try clearing the search or broadening your filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((scheme, idx) => (
            <div key={`${scheme.scheme_name}-${idx}`} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden group">
              <div className="p-5 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider ${scheme.is_grant_scheme ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {getLoanBadgeText(scheme)}
                  </span>
                  {scheme.target_demographics.some(d => d !== "ALL") && (
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">
                      SPECIAL
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {scheme.scheme_name}
                </h3>
                
                <div className="space-y-3 mt-4 text-sm text-slate-600">
                  {scheme.min_amount_cr && (
                    <div className="flex items-center gap-2">
                      <IndianRupee size={14} className="text-slate-400" />
                      <span>
                        Limit: 
                        <span className="font-semibold text-slate-800 ml-1">
                          {scheme.min_amount_cr}Cr - {scheme.max_amount_cr || 'No Limit'}Cr
                        </span>
                      </span>
                    </div>
                  )}
                  
                  {(scheme.key_benefit_keywords.includes("COLLATERAL_FREE_LOAN") || scheme.key_benefit_keywords.includes("MINIMAL_COLLATERAL")) && (
                     <div className="flex items-center gap-2 text-emerald-600 font-medium">
                        <ShieldCheck size={14} />
                        <span>Collateral Free / Minimal</span>
                     </div>
                  )}

                  <div className="flex flex-wrap gap-1 mt-3">
                    {scheme.key_benefit_keywords.slice(0, 3).map((benefit, i) => (
                      <span key={i} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs">
                        {benefit.replace(/_/g, ' ').toLowerCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-50 p-4 border-t border-slate-100 mt-auto">
                <button 
                  onClick={() => onViewDetails(scheme)}
                  className="w-full text-blue-600 font-semibold text-sm flex items-center justify-center gap-1 hover:gap-2 transition-all"
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [view, setView] = useState('landing'); // landing, slideDeck, form, results, details
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const heroHighlightScheme = useMemo(() => (
    SCHEMES_DATA.find(scheme => scheme.scheme_name === "ARISE") || SCHEMES_DATA[0]
  ), []);

  const featuredSchemes = useMemo(() => {
    const curated = SCHEMES_DATA.filter(
      (scheme) => (scheme.max_amount_cr || 0) >= 3 || scheme.loan_type === 'GREEN_TRANSITION'
    );
    return (curated.length ? curated : SCHEMES_DATA).slice(0, 3);
  }, []);

  const filterSchemes = (userReq) => {
    const amount = parseFloat(userReq.required_amount_cr);
    const isGreenfield = userReq.is_greenfield_unit === 'true';
    const wantLoans = userReq.scheme_type_preference === 'LOAN' || userReq.scheme_type_preference === 'ALL';
    const wantGrants = userReq.scheme_type_preference === 'GRANT' || userReq.scheme_type_preference === 'ALL';
    const userPurposes = userReq.loan_purpose_keywords || [];
    const hasUserPurposes = userPurposes.length > 0;

    return SCHEMES_DATA.filter(scheme => {
      const typeMeta = LOAN_TYPE_TAXONOMY[scheme.loan_type] || {};
      const isHybridProduct = typeMeta.category === 'HYBRID';
      // 1. Amount Check
      if (scheme.min_amount_cr && amount < scheme.min_amount_cr) return false;
      if (scheme.max_amount_cr && amount > scheme.max_amount_cr) return false;

      // 2. Greenfield/New Unit Check 
      if (scheme.is_for_new_unit !== null && scheme.is_for_new_unit !== isGreenfield) return false;

      // 3. Loan vs Grant Preference
      if (scheme.is_grant_scheme && !wantGrants) {
        const hybridAllowed = isHybridProduct && wantLoans;
        if (!hybridAllowed) return false;
      }
      if (!scheme.is_grant_scheme && !wantLoans) return false;

      // 4. Sector & Specialized Sector Check
      const schemeSectors = scheme.target_sectors;
      
      // Check for specialized sectors (Defense, Green, Agro)
    const specialSectors = SPECIAL_SECTOR_IDS;
      
      // Does the scheme target ONLY a special sector?
      const isSpecializedScheme = specialSectors.some(s => schemeSectors.includes(s) && !schemeSectors.includes("ALL"));
      
      if (isSpecializedScheme) {
          // If scheme is specialized, user needs at least one matching keyword
          const hasMatchingSpecialty = schemeSectors.some(s => userReq.sub_sector_keywords.includes(s));
          if (!hasMatchingSpecialty) return false;
      } else {
         // Standard Sector Check
         const sectorMatch = schemeSectors.includes("ALL") || 
                             schemeSectors.some(s => userReq.business_sector.toUpperCase().includes(s));
         if (!sectorMatch) return false;
      }

      // 5. TReDS Check
      if (scheme.key_benefit_keywords.includes("TReDS_FOCUS") && !userReq.is_on_treds_platform) return false;

      // 6. Collateral Check
      if (userReq.collateral_willingness === 'false' && scheme.key_benefit_keywords.includes("SECURED_AGAINST_ASSETS")) return false;

      // 7. Demographics Check
      const demoMatch = scheme.target_demographics.includes("ALL") ||
                        scheme.target_demographics.some(d => userReq.msme_demographics.includes(d));
      if (!demoMatch) return false;

      // 8. Purpose Check (Soft match)
  const schemePurposes = scheme.target_purpose || [];
  const purposeMatch = !hasUserPurposes ||
           schemePurposes.some(p => userPurposes.includes(p)) ||
           schemePurposes.includes("WORKING_CAPITAL_GENERAL") ||
           schemePurposes.includes("GENERAL_BUSINESS_NEEDS"); 
      
      if (!purposeMatch) return false;

      return true; 
    });
  };

  const handleFormSubmit = (data) => {
    const results = filterSchemes(data);
    setMatchedSchemes(results);
    setView('results');
  };
  
  const handleViewDetails = (scheme) => {
     setSelectedScheme(scheme);
     setView('details');
  };

  const handleBackToResults = () => {
     setSelectedScheme(null);
     setView('results');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50/40 font-sans text-slate-800">
      <header className="bg-white/90 backdrop-blur border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-2xl text-white">
              <Briefcase size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">MSME Navigator</p>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">Business Facilitation Center</h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
            <button onClick={() => setView('landing')} className={`hover:text-blue-600 ${view === 'landing' ? 'text-blue-600' : ''}`}>Overview</button>
            <button onClick={() => setView('slideDeck')} className={`hover:text-blue-600 ${view === 'slideDeck' ? 'text-blue-600' : ''}`}>Udyam guide</button>
            <button onClick={() => setView('form')} className={`hover:text-blue-600 ${view === 'form' ? 'text-blue-600' : ''}`}>Scheme finder</button>
            <button onClick={() => setView('results')} className={`hover:text-blue-600 ${view === 'results' ? 'text-blue-600' : ''}`}>Matches</button>
          </nav>
          <button onClick={() => setView('form')} className="bg-slate-900 text-white px-5 py-2 rounded-2xl font-semibold hidden sm:inline-flex items-center gap-2">
            Launch finder <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <main className="p-4 md:p-8">
        {view === 'landing' && (
          <div className="space-y-16">
            <HeroSection onGetStarted={() => setView('form')} onLearnMore={() => setView('slideDeck')} featuredScheme={heroHighlightScheme} />
            <ValuePillars />
            <FeaturedSchemes schemes={featuredSchemes} onSelect={handleViewDetails} />
            <ProcessTimeline />
            <SuccessStories />
            <SupportShowcase />
            <FAQSection />
          </div>
        )}

        {view === 'slideDeck' && (
          <div className="max-w-4xl mx-auto pt-10">
            <SectionHeading
              eyebrow="Udyam essentials"
              title="Secure your MSME identity before chasing schemes"
              description="Spend 8 minutes to onboard, then come back for tailored matches."
            />
            <SlideDeck onComplete={() => setView('form')} />
          </div>
        )}

        {view === 'form' && (
          <div className="space-y-8 pt-6">
            <div className="max-w-4xl mx-auto">
              <SectionHeading
                align="left"
                eyebrow="Tell us about your requirement"
                title="Advanced scheme finder"
                description="We match limits, tenure, collateral comfort and specialty areas to shortlist programs that respect your time."
              />
            </div>
            <RequirementForm onSubmit={handleFormSubmit} />
          </div>
        )}

        {view === 'results' && (
          <ResultsGrid 
             results={matchedSchemes} 
             onReset={() => setView('form')} 
             onViewDetails={handleViewDetails} 
          />
        )}
        
        {view === 'details' && selectedScheme && (
           <div className="pt-6">
              <SchemeDetails scheme={selectedScheme} onBack={handleBackToResults} />
           </div>
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-400 text-sm space-y-2">
          <p>© 2025 Business Facilitation Center. All rights reserved.</p>
          <p>Powered by SIDBI & Government of India MSME Initiatives</p>
          <p className="text-slate-500">Need support? Email <a href="mailto:desk@msmeconnect.in" className="text-blue-600">desk@msmeconnect.in</a></p>
        </div>
      </footer>
    </div>
  );
};

export default App;