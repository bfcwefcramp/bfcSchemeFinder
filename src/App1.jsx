import { useMemo, useState } from 'react';
import { 
  ArrowRight, CheckCircle, Briefcase, Leaf, Users, Factory, Building2, 
  IndianRupee, ChevronRight, ChevronLeft, ExternalLink, Search, Award, 
  Zap, Info, ShieldCheck, Sprout, Plane, Tractor, Coffee, Landmark, 
  Calendar, Target, Sparkles, PhoneCall, MessageCircle, ChevronDown, Star
} from 'lucide-react';

const humanizeConstant = (value = '') => {
  const formatted = value
    .toLowerCase()
    .split('_')
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(' ')
    .trim();
  return formatted || 'General';
};

// --- DATA: COMPLETE SCHEME MASTER COLLECTION ---
// Merged existing SIDBI data with your Excel file content (CMRY, Goa Schemes, PMFME, etc.)
const RAW_SCHEMES_DATA = [
  // --- GOVT & STATE SPECIFIC SCHEMES (From your Excel) ---
  { 
    scheme_name: "Chief Minister’s Rojgar Yojana (CMRY)", 
    min_amount_cr: 0.01, 
    max_amount_cr: 0.25, // Usually up to 25L for general, higher for specific cases
    target_demographics: ["ALL", "WOMAN_PROMOTER", "SC_ST_PROMOTER"], 
    target_sectors: ["ALL"], 
    target_purpose: ["PROJECT_SETUP", "CAPEX_MACHINERY_ACQUISITION", "WORKING_CAPITAL_GENERAL"], 
    is_for_new_unit: true, 
    key_benefit_keywords: ["LOW_INTEREST", "SUBSIDY_ON_INTEREST", "GOA_STATE_SCHEME"], 
    loan_type: "SUBSIDY_CUM_LOAN", 
    max_tenure_yrs: 10, 
    ideal_turnover_segments: ["MICRO"], 
    apply_url: "https://www.edcgoa.co.in/" 
  },
  { 
    scheme_name: "PMEGP (Prime Minister's Employment Generation)", 
    min_amount_cr: 0.01, 
    max_amount_cr: 0.50, // 50 Lakhs for Manufacturing
    target_demographics: ["ALL"], 
    target_sectors: ["MANUFACTURING", "SERVICE"], 
    target_purpose: ["PROJECT_SETUP", "CAPEX_MACHINERY_ACQUISITION", "EMPLOYMENT_GENERATION"], 
    is_for_new_unit: true, 
    key_benefit_keywords: ["SUBSIDY_UP_TO_35%", "COLLATERAL_FREE_POSSIBLE"], 
    loan_type: "SUBSIDY_CUM_LOAN", 
    ideal_turnover_segments: ["MICRO"], 
    apply_url: "https://www.kviconline.gov.in/pmegpeportal" 
  },
  { 
    scheme_name: "PMEGP 2nd Loan (Expansion)", 
    min_amount_cr: 0.01, 
    max_amount_cr: 1.0, // 1 Cr for expansion
    target_demographics: ["ALL"], 
    target_sectors: ["MANUFACTURING", "SERVICE"], 
    target_purpose: ["PROJECT_EXPANSION", "TECHNOLOGY_UPGRADATION"], 
    is_for_new_unit: false, 
    key_benefit_keywords: ["SUBSIDY_15%", "EXPANSION_SUPPORT"], 
    loan_type: "SUBSIDY_CUM_LOAN", 
    ideal_turnover_segments: ["MICRO", "SMALL"], 
    apply_url: "https://www.kviconline.gov.in/pmegp" 
  },
  { 
    scheme_name: "PMFME (Food Processing)", 
    min_amount_cr: 0.01, 
    max_amount_cr: 1.0, 
    target_demographics: ["ALL", "SHG", "FPO"], 
    target_sectors: ["AGRO_PROCESSING"], 
    target_purpose: ["PROJECT_SETUP", "PROJECT_EXPANSION", "TECHNOLOGY_UPGRADATION"], 
    is_for_new_unit: null, 
    key_benefit_keywords: ["SUBSIDY_35%", "BRANDING_SUPPORT", "ODOP_FOCUS"], 
    loan_type: "SUBSIDY_CUM_LOAN", 
    ideal_turnover_segments: ["MICRO"], 
    apply_url: "https://pmfme.mofpi.gov.in/" 
  },
  { 
    scheme_name: "Goa Umbrella Scheme (Incentives)", 
    loan_type: "GRANT_INFRASTRUCTURE", 
    target_demographics: ["ALL"], 
    target_sectors: ["MANUFACTURING"], 
    target_purpose: ["CAPEX_FACTORY_CONSTRUCTION", "EMPLOYMENT_GENERATION", "GREEN_VALUE_CHAIN"], 
    is_for_new_unit: null, 
    key_benefit_keywords: ["CAPITAL_SUBSIDY", "INTEREST_SUBSIDY", "EMPLOYMENT_REBATE"], 
    is_grant_scheme: true, 
    ideal_turnover_segments: ["MICRO", "SMALL"], 
    apply_url: "https://goaonline.gov.in/" 
  },
  { 
    scheme_name: "MUDRA Yojana (Tarun)", 
    min_amount_cr: 0.05, 
    max_amount_cr: 0.10, // 10 Lakhs limit
    target_demographics: ["ALL"], 
    target_sectors: ["ALL"], 
    target_purpose: ["PROJECT_SETUP", "WORKING_CAPITAL_GENERAL", "CAPEX_MACHINERY_ACQUISITION"], 
    is_for_new_unit: null, 
    key_benefit_keywords: ["COLLATERAL_FREE_LOAN", "QUICK_DISBURSAL"], 
    loan_type: "LOAN", 
    ideal_turnover_segments: ["MICRO"], 
    apply_url: "https://www.mudra.org.in/" 
  },
  { 
    scheme_name: "PM Vishwakarma", 
    min_amount_cr: 0.01, 
    max_amount_cr: 0.03, // 3 Lakhs
    target_demographics: ["ARTISANS"], 
    target_sectors: ["MANUFACTURING", "SERVICE"], 
    target_purpose: ["PROJECT_SETUP", "TOOLKIT_PURCHASE"], 
    is_for_new_unit: null, 
    key_benefit_keywords: ["LOW_INTEREST_5%", "TOOLKIT_INCENTIVE", "COLLATERAL_FREE_LOAN"], 
    loan_type: "LOAN", 
    ideal_turnover_segments: ["MICRO"], 
    apply_url: "https://pmvishwakarma.gov.in" 
  },
  { 
    scheme_name: "Goa Credit Guarantee (GCGS)", 
    min_amount_cr: 0.01, 
    max_amount_cr: 5.0, // Matches CGTMSE usually
    target_demographics: ["ALL"], 
    target_sectors: ["ALL"], 
    target_purpose: ["LOAN_GUARANTEE"], 
    is_for_new_unit: null, 
    key_benefit_keywords: ["ADDITIONAL_COVERAGE", "COLLATERAL_FREE_LOAN"], 
    loan_type: "GUARANTEE_COVER", 
    is_hybrid_scheme: true, 
    ideal_turnover_segments: ["MICRO", "SMALL"], 
    apply_url: "https://www.edcgoa.co.in/" 
  },
  { 
    scheme_name: "CGTMSE (Central Guarantee)", 
    min_amount_cr: 0.01, 
    max_amount_cr: 5.0, 
    target_demographics: ["ALL"], 
    target_sectors: ["ALL"], 
    target_purpose: ["LOAN_GUARANTEE", "PROJECT_SETUP", "WORKING_CAPITAL_GENERAL"], 
    is_for_new_unit: null, 
    key_benefit_keywords: ["COLLATERAL_FREE_LOAN", "GUARANTEE_COVERAGE"], 
    loan_type: "GUARANTEE_COVER", 
    ideal_turnover_segments: ["MICRO", "SMALL"], 
    apply_url: "https://www.cgtmse.in/" 
  },
  { 
    scheme_name: "Stand Up India", 
    min_amount_cr: 0.10, 
    max_amount_cr: 1.0, // 10L to 1Cr
    target_demographics: ["SC_ST_PROMOTER", "WOMAN_PROMOTER"], 
    target_sectors: ["ALL"], 
    target_purpose: ["PROJECT_SETUP", "GREENFIELD_PROJECTS"], 
    is_for_new_unit: true, 
    key_benefit_keywords: ["SC_ST_WOMEN_FOCUS", "GREENFIELD_PROJECTS"], 
    loan_type: "LOAN", 
    ideal_turnover_segments: ["MICRO", "SMALL"], 
    apply_url: "https://www.standupmitra.in/" 
  },

  // --- SIDBI LOANS (Existing Data) ---
  { scheme_name: "EXPRESS Loan", min_amount_cr: 0.10, max_amount_cr: 1.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION"], is_for_new_unit: false, key_benefit_keywords: ["FAST_APPROVAL", "100%_FINANCING_W_FD"], loan_type: "MACHINERY", ideal_turnover_segments: ["MICRO", "SMALL"], apply_url: "https://direct.sidbi.in/" },
  { scheme_name: "SPEED Loan", min_amount_cr: 0.50, max_amount_cr: 15.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION"], is_for_new_unit: false, key_benefit_keywords: ["HIGH_LIMIT", "MINIMAL_COLLATERAL"], loan_type: "MACHINERY", ideal_turnover_segments: ["SMALL", "MEDIUM"], apply_url: "https://direct.sidbi.in/" },
  { scheme_name: "ARISE", min_amount_cr: 0.10, max_amount_cr: 50.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION", "CAPEX_FACTORY_CONSTRUCTION", "PROJECT_EXPANSION"], is_for_new_unit: false, key_benefit_keywords: ["HIGH_LIMIT", "SUSTAINABLE", "COVERS_LAND"], loan_type: "PROJECT_LOAN", ideal_turnover_segments: ["SMALL", "MEDIUM"], apply_url: "https://www.sidbi.in/en/arise" },
  { scheme_name: "STHAPAN", min_amount_cr: 0.10, max_amount_cr: 50.0, target_demographics: ["ALL"], target_sectors: ["MANUFACTURING", "SERVICE"], target_purpose: ["CAPEX_MACHINERY_ACQUISITION", "CAPEX_FACTORY_CONSTRUCTION", "PROJECT_SETUP"], is_for_new_unit: true, key_benefit_keywords: ["HIGH_LIMIT", "GREENFIELD_FOCUS", "COVERS_LAND"], loan_type: "PROJECT_LOAN", ideal_turnover_segments: ["SMALL", "MEDIUM"], apply_url: "https://www.sidbi.in/en/sthapan" },
  { scheme_name: "UBHARTE SITAARE", min_amount_cr: 0.50, max_amount_cr: 30.0, target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["PROJECT_MODERNIZATION", "EXPORT_POTENTIAL"], is_for_new_unit: false, key_benefit_keywords: ["PERFORMANCE_INCENTIVES", "GLOBAL_GROWTH"], loan_type: "PROJECT_LOAN", requires_export_focus: true, ideal_turnover_segments: ["SMALL", "MEDIUM"], apply_url: "https://www.sidbi.in/en/ubharte-sitaare" },
  { scheme_name: "4E Scheme (Energy)", min_amount_cr: 0.10, max_amount_cr: 10.0, target_demographics: ["ALL"], target_sectors: ["GREEN_VALUE_CHAIN", "ALL"], target_purpose: ["ENERGY_EFFICIENCY", "CAPEX_MACHINERY_ACQUISITION"], is_for_new_unit: false, key_benefit_keywords: ["100%_FINANCING", "ENERGY_EFFICIENCY"], loan_type: "GREEN", ideal_turnover_segments: ["SMALL"], apply_url: "https://www.sidbi.in/en/4e-scheme" },

  // --- OTHER GRANTS & SCHEMES ---
  { scheme_name: "ZED Certification", loan_type: "SUBSIDY_QUALITY", target_demographics: ["ALL"], target_sectors: ["MANUFACTURING"], target_purpose: ["QUALITY_CERTIFICATION", "ENVIRONMENTAL_COMPLIANCE"], is_for_new_unit: null, key_benefit_keywords: ["ZED_CERTIFICATION", "SUBSIDY_ON_CONSULTANCY"], is_grant_scheme: true, ideal_turnover_segments: ["SMALL", "MEDIUM"], apply_url: "https://zed.msme.gov.in/" },
  { scheme_name: "MSME Cluster Development", loan_type: "GRANT_INFRASTRUCTURE", max_amount_cr: 20.0, target_demographics: ["SPV_OR_GOVT"], target_sectors: ["MANUFACTURING"], target_purpose: ["INFRASTRUCTURE_DEVELOPMENT", "COMMON_FACILITY_CENTRE"], is_for_new_unit: null, key_benefit_keywords: ["GOVT_GRANT", "CAPITAL_SUBSIDY_UP_TO_70%"], is_grant_scheme: true, ideal_turnover_segments: ["SMALL", "MEDIUM"], requires_cluster_membership: true, apply_url: "https://cluster.dcmsme.gov.in/" },
  { scheme_name: "Aspire (Rural Incubation)", loan_type: "SUBSIDY_INCUBATION", target_demographics: ["ALL"], target_sectors: ["RURAL_INDUSTRY", "INNOVATION_STARTUPS"], target_purpose: ["INCUBATION", "LIVELIHOOD_MISSION"], is_for_new_unit: true, key_benefit_keywords: ["RURAL_FOCUS", "FUNDING_FOR_INCUBATORS"], is_grant_scheme: true, ideal_turnover_segments: ["MICRO"], apply_url: "https://aspire.msme.gov.in/" },
  { scheme_name: "International Cooperation Scheme", loan_type: "SUBSIDY_MARKETING", target_demographics: ["ALL"], target_sectors: ["ALL"], target_purpose: ["MARKETING_ASSISTANCE", "EXHIBITION_PARTICIPATION", "EXPORT_POTENTIAL"], is_for_new_unit: null, key_benefit_keywords: ["TRAVEL_REIMBURSEMENT", "TRADE_FAIR_SUPPORT"], is_grant_scheme: true, ideal_turnover_segments: ["SMALL", "MEDIUM"], apply_url: "http://www.ic.msme.gov.in" },
];

// --- TAXONOMY & HELPERS ---
const LOAN_TYPE_TAXONOMY = {
  TERM_CAPEX_LOAN: { label: 'Term Loan / CAPEX', source_types: ['MACHINERY', 'PROJECT_LOAN', 'OTHER', 'LOAN'] },
  WORKING_CAPITAL: { label: 'Working Capital', source_types: ['WORKING_CAPITAL'] },
  GREEN_TRANSITION: { label: 'Green & Sustainability', source_types: ['GREEN'] },
  GUARANTEE_SUPPORT: { label: 'Guarantee / Risk Cover', source_types: ['GUARANTEE_COVER'] },
  GRANT_CAPEX_TECH: { label: 'Grant / Subsidy', source_types: ['GRANT_INFRASTRUCTURE', 'SUBSIDY_CAPEX', 'SUBSIDY_QUALITY', 'SUBSIDY_INCUBATION', 'SUBSIDY_CUM_LOAN', 'SUBSIDY_MARKETING', 'TRAINING_GRANT'] },
};

const classifyLoanType = (scheme) => {
  if (scheme.is_grant_scheme || scheme.loan_type.includes('SUBSIDY') || scheme.loan_type === 'TRAINING_GRANT') return 'GRANT_CAPEX_TECH';
  if (scheme.loan_type === 'GUARANTEE_COVER') return 'GUARANTEE_SUPPORT';
  if ((scheme.target_purpose || []).some(p => p.includes('GREEN') || p.includes('ENERGY'))) return 'GREEN_TRANSITION';
  if (scheme.loan_type === 'WORKING_CAPITAL') return 'WORKING_CAPITAL';
  return 'TERM_CAPEX_LOAN';
};

const getLoanTypeLabel = (code) => LOAN_TYPE_TAXONOMY[code]?.label ?? humanizeConstant(code || 'Loan');
const getLoanSubtypeLabel = (scheme) => (scheme.loan_subtype && scheme.loan_subtype !== scheme.loan_type) ? humanizeConstant(scheme.loan_subtype) : '';
const convertLakhsToCrores = (value) => { const n = parseFloat(value ?? '0'); return (isNaN(n) || n <= 0) ? 0 : n / 100; };
const mapEmployeesToBracket = (count) => { const n = parseInt(count, 10); return (isNaN(n) || n <= 0) ? null : n <= 10 ? 'MICRO' : n <= 50 ? 'SMALL' : 'MEDIUM'; };

const SCHEMES_DATA = RAW_SCHEMES_DATA.map((scheme) => ({
  ...scheme,
  loan_subtype: scheme.loan_type,
  loan_type: classifyLoanType(scheme),
  ideal_employee_brackets: scheme.ideal_employee_brackets || []
}));

// --- COMPONENTS ---
const SectionHeading = ({ eyebrow, title, description, align = 'center' }) => (
  <div className={`${align === 'left' ? 'text-left' : 'text-center'} space-y-3 mb-10`}>
    {eyebrow && <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 rounded-full"><Sparkles size={14} /> {eyebrow}</span>}
    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">{title}</h2>
    {description && <p className={`text-lg text-slate-500 max-w-3xl ${align === 'left' ? '' : 'mx-auto'}`}>{description}</p>}
  </div>
);

const RequirementForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    required_amount_lakhs: '',
    business_sector: 'Manufacturing',
    is_greenfield_unit: 'false',
    msme_demographics: [],
    loan_purpose_keywords: [],
    collateral_willingness: 'true',
    scheme_type_preference: 'ALL',
    company_size_segment: 'MICRO',
    has_export_orders: false,
    has_iec_code: false,
    is_cluster_member: false,
    employee_count: ''
  });

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
  const handleMultiSelect = (category, item) => {
    setFormData(prev => ({ 
      ...prev, 
      [category]: prev[category].includes(item) ? prev[category].filter(i => i !== item) : [...prev[category], item] 
    }));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      <div className="bg-slate-800 text-white p-6">
        <h2 className="text-2xl font-bold flex items-center gap-2"><Search className="text-blue-400" /> Scheme Finder</h2>
        <p className="text-slate-300 mt-1">We'll filter 45+ schemes to find your perfect match.</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit({ ...formData, required_amount_cr: convertLakhsToCrores(formData.required_amount_lakhs) }); }} className="p-6 space-y-8">
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Funding Required (₹ Lakhs)</label>
            <div className="relative">
              <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="number" name="required_amount_lakhs" required className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 bg-slate-50" placeholder="e.g. 45" value={formData.required_amount_lakhs} onChange={handleInputChange} />
            </div>
          </div>
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Project Status</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              {['true', 'false'].map(val => (
                <button key={val} type="button" onClick={() => setFormData({...formData, is_greenfield_unit: val})} className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${formData.is_greenfield_unit === val ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}>{val === 'true' ? 'New Unit (Greenfield)' : 'Existing Business'}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Business Size (Turnover)</label>
          <div className="grid sm:grid-cols-3 gap-3">
            {[{v:'MICRO', l:'Micro (< 5Cr)'}, {v:'SMALL', l:'Small (5-50Cr)'}, {v:'MEDIUM', l:'Medium (50-250Cr)'}].map(opt => (
              <button key={opt.v} type="button" onClick={() => setFormData({...formData, company_size_segment: opt.v})} className={`w-full py-3 rounded-lg border text-sm font-semibold ${formData.company_size_segment === opt.v ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600'}`}>{opt.l}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Purpose</label>
          <div className="flex flex-wrap gap-2">
            {[
              {id: 'CAPEX_MACHINERY_ACQUISITION', label: 'Machinery / CAPEX'},
              {id: 'PROJECT_SETUP', label: 'New Project Setup'},
              {id: 'WORKING_CAPITAL_GENERAL', label: 'Working Capital'},
              {id: 'TECHNOLOGY_UPGRADATION', label: 'Tech Upgrade'},
              {id: 'PROJECT_EXPANSION', label: 'Expansion'},
            ].map(item => (
              <button key={item.id} type="button" onClick={() => handleMultiSelect('loan_purpose_keywords', item.id)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${formData.loan_purpose_keywords.includes(item.id) ? 'bg-blue-100 border-blue-500 text-blue-700' : 'bg-white border-slate-300 text-slate-600'}`}>{item.label}</button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Demographics / Special Category</label>
          <div className="flex flex-wrap gap-2">
            {['WOMAN_PROMOTER', 'SC_ST_PROMOTER', 'ARTISANS', 'SHG'].map(tag => (
              <button key={tag} type="button" onClick={() => handleMultiSelect('msme_demographics', tag)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${formData.msme_demographics.includes(tag) ? 'bg-purple-100 border-purple-500 text-purple-700' : 'bg-white border-slate-300 text-slate-600'}`}>{tag.replace(/_/g, ' ')}</button>
            ))}
          </div>
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all">Find Matching Schemes</button>
      </form>
    </div>
  );
};

const SchemeDetails = ({ scheme, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto pb-20">
      <button onClick={onBack} className="flex items-center text-slate-500 hover:text-blue-600 mb-6 font-medium"><ChevronLeft size={20} /> Back to Results</button>
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 text-white p-8">
          <div className="flex items-center gap-3 mb-3">
             <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500">{getLoanTypeLabel(scheme.loan_type)}</span>
             {scheme.is_for_new_unit && <span className="bg-emerald-500 px-3 py-1 rounded-full text-xs font-bold">STARTUP / NEW UNIT</span>}
          </div>
          <h2 className="text-3xl font-bold mb-2">{scheme.scheme_name}</h2>
          <p className="text-slate-300">Max Amount: {scheme.max_amount_cr} Cr • Tenure: {scheme.max_tenure_yrs || 'N/A'} Yrs</p>
        </div>
        <div className="p-8 space-y-6">
          <div>
             <h3 className="font-bold text-slate-900 mb-2">Key Benefits</h3>
             <div className="flex flex-wrap gap-2">
                {scheme.key_benefit_keywords.map(k => <span key={k} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-lg text-sm font-medium border border-indigo-100">{k.replace(/_/g, ' ')}</span>)}
             </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
             <div><h3 className="font-bold mb-2">Target Purpose</h3><ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">{scheme.target_purpose.map(p => <li key={p}>{p.replace(/_/g, ' ')}</li>)}</ul></div>
             <div><h3 className="font-bold mb-2">Eligibility</h3><ul className="list-disc pl-5 text-slate-600 text-sm space-y-1"><li>Sector: {scheme.target_sectors.join(', ')}</li><li>Segment: {scheme.ideal_turnover_segments?.join(', ') || 'All'}</li></ul></div>
          </div>
          <div className="pt-6 border-t border-slate-100 flex justify-end">
             <a href={scheme.apply_url} target="_blank" rel="noreferrer" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">Apply Now</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ResultsGrid = ({ results, onReset, onViewDetails }) => (
  <div className="max-w-6xl mx-auto pb-20">
    <div className="flex justify-between items-center mb-8">
      <div><h2 className="text-3xl font-bold text-slate-800">Matched Schemes</h2><p className="text-slate-500">Found {results.length} schemes matching your criteria</p></div>
      <button onClick={onReset} className="bg-white border border-slate-300 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50">Modify Search</button>
    </div>
    {results.length === 0 ? (
       <div className="text-center py-20 bg-white rounded-2xl border border-dashed"><Info className="mx-auto text-slate-300 mb-4" size={48} /><h3 className="text-xl font-bold text-slate-600">No matches found</h3><p className="text-slate-400">Try adjusting your amount or purpose filters.</p></div>
    ) : (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((scheme, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl transition-shadow flex flex-col">
             <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wide ${scheme.is_grant_scheme ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{getLoanTypeLabel(scheme.loan_type)}</span>
                {scheme.min_amount_cr && <span className="text-xs font-semibold text-slate-500">₹{scheme.min_amount_cr}-{scheme.max_amount_cr} Cr</span>}
             </div>
             <h3 className="text-lg font-bold text-slate-800 mb-2">{scheme.scheme_name}</h3>
             <p className="text-xs text-slate-500 mb-4 line-clamp-2">{scheme.key_benefit_keywords.join(', ').replace(/_/g, ' ')}</p>
             <button onClick={() => onViewDetails(scheme)} className="mt-auto w-full py-2 border border-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 text-sm">View Details</button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const App = () => {
  const [view, setView] = useState('form');
  const [matchedSchemes, setMatchedSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);

  const filterSchemes = (userReq) => {
    const amount = parseFloat(userReq.required_amount_cr);
    const isGreenfield = userReq.is_greenfield_unit === 'true';
    const userSegment = userReq.company_size_segment || 'MICRO';
    const userPurposes = userReq.loan_purpose_keywords || [];

    // INTELLIGENT MAPPING: Relax specific tags
    const userWantsCapex = userPurposes.some(p => p.includes('CAPEX') || p.includes('MACHINERY') || p.includes('SETUP'));
    
    return SCHEMES_DATA.filter(scheme => {
      // 1. Amount Check (Inclusive of limits)
      if (scheme.min_amount_cr && amount < scheme.min_amount_cr) return false;
      if (scheme.max_amount_cr && amount > scheme.max_amount_cr) return false;

      // 2. New vs Existing Unit (Handle Null for 'Both')
      if (scheme.is_for_new_unit !== null && scheme.is_for_new_unit !== isGreenfield) return false;

      // 3. Segment Check (Micro/Small/Medium)
      if (scheme.ideal_turnover_segments && !scheme.ideal_turnover_segments.includes(userSegment)) return false;

      // 4. Purpose Check (Smart Matching)
      // If user selected no purpose, show everything.
      if (userPurposes.length === 0) return true;
      
      const schemePurposes = scheme.target_purpose || [];
      const exactMatch = schemePurposes.some(p => userPurposes.includes(p));
      const generalMatch = schemePurposes.includes('WORKING_CAPITAL_GENERAL') && userPurposes.includes('WORKING_CAPITAL_GENERAL');
      // Fix: If user wants CAPEX, schemes for "PROJECT_SETUP" should also match
      const projectSetupMatch = userWantsCapex && schemePurposes.includes('PROJECT_SETUP');

      if (!exactMatch && !generalMatch && !projectSetupMatch) return false;

      // 5. Demographics (Optional strictness)
      const userDemos = userReq.msme_demographics || [];
      if (scheme.target_demographics.some(d => d !== 'ALL')) {
         // Scheme has specific restrictions. Does user match any?
         const hasMatch = scheme.target_demographics.some(d => userDemos.includes(d));
         // If scheme targets specific groups (e.g. Women) and user didn't select it, filtering depends on strictness.
         // Here we show it if the user matches, OR if the scheme also allows ALL.
         if (!hasMatch && !scheme.target_demographics.includes('ALL')) return false;
      }

      return true;
    });
  };

  const handleFormSubmit = (data) => {
    const results = filterSchemes(data);
    setMatchedSchemes(results);
    setView('results');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <header className="bg-white border-b border-slate-200 p-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-xl"><Briefcase className="text-blue-600" /> MSME Finder</div>
          <button onClick={() => setView('form')} className="text-sm font-semibold text-blue-600">Start Over</button>
        </div>
      </header>
      <main className="p-4 md:p-8">
        {view === 'form' && <RequirementForm onSubmit={handleFormSubmit} />}
        {view === 'results' && <ResultsGrid results={matchedSchemes} onReset={() => setView('form')} onViewDetails={(s) => {setSelectedScheme(s); setView('details');}} />}
        {view === 'details' && selectedScheme && <SchemeDetails scheme={selectedScheme} onBack={() => setView('results')} />}
      </main>
    </div>
  );
};

export default App;