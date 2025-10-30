import { LogoCarousel } from '../common/LogoCarousel';
import { IndexCarousel } from '../common/IndexCarousel';
import { useCallback, useEffect, useMemo, useRef, useState} from 'react';
import { DealsDuo } from '../common/DealsDuo';
import { CreateOrganizationFlow } from '../common/CreateOrganizationFlow';
import { MarketPulse } from '../common/MarketPulse';
import { createPortal } from 'react-dom';

function formatTime(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds || 0));
  const minutes = Math.floor(clamped / 60);
  const seconds = clamped % 60;
  const padded = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${minutes}:${padded}`;
}
import { bankCompanies } from '../../data/banks';
import { commodityIndices, headlineIndices, techLeaders } from '../../data/indices';

// Choose carousel directions once per page load (module scope),
// so they remain stable across re-renders and remounts.
type RowDirection = 'ltr' | 'rtl';
const ROW_DIRECTIONS: { majors: RowDirection; commodities: RowDirection; tech: RowDirection; deals: RowDirection } = {
  majors: Math.random() < 0.5 ? 'ltr' : 'rtl',
  commodities: Math.random() < 0.5 ? 'ltr' : 'rtl',
  tech: Math.random() < 0.5 ? 'ltr' : 'rtl',
  deals: Math.random() < 0.5 ? 'ltr' : 'rtl'
};

export function HomeTab() {
  type TranscriptSegment = {
    start: number;
    end: number;
    speaker: 'Interviewer' | 'Candidate';
    text: string;
  };
  type BehavioralClip = {
    id: string;
    label?: string; // one-word option shown in scenario selector
    prompt: string;
    audioUrl: string;
    durationSec: number;
    segments: TranscriptSegment[];
  };
  type Difficulty = 'Easy' | 'Medium' | 'Hard';
  type Industry = 'Generalist' | 'TMT' | 'Healthcare';
  type Topic = 'Accounting' | 'Valuation' | 'LBO';
  type Flashcard = {
    id: string;
    question: string;
    options: string[];
    difficulty: Difficulty;
    industry: Industry;
    topic: Topic;
  };
  const allFlashcards: Flashcard[] = useMemo(() => {
    const pool: Flashcard[] = [
      // Valuation — Generalist
      {
        id: 'val-exit-multiple-easy-gen',
        question: 'What typically happens to IRR if you increase the exit multiple (holding all else equal)?',
        options: ['Impact depends on entry multiple', 'IRR increases', 'IRR decreases', 'No impact on IRR'],
        difficulty: 'Easy',
        industry: 'Generalist',
        topic: 'Valuation'
      },
      {
        id: 'val-core-methods-med-gen',
        question: 'Which set describes the 3 core valuation methods?',
        options: [
          'DCF, Public Comparables, Precedent Transactions',
          'DCF, P/B, EV/Sales',
          'LBO, ARR, Payback',
          'EV/EBIT, EV/EBITDA, P/E'
        ],
        difficulty: 'Medium',
        industry: 'Generalist',
        topic: 'Valuation'
      },
      // Accounting — TMT
      {
        id: 'acct-working-cap-easy-tmt',
        question: 'Which statement is most directly affected by a change in Working Capital in a DCF?',
        options: [
          'Income Statement, because D&A changes.',
          'Cash Flow Statement, within Cash Flow from Operations.',
          'Balance Sheet only, because current assets and liabilities change.',
          'None; Working Capital is a non-cash item.'
        ],
        difficulty: 'Easy',
        industry: 'TMT',
        topic: 'Accounting'
      },
      {
        id: 'acct-depr-bridge-med-tmt',
        question: 'Increasing depreciation by $10 affects the 3 statements in which way (30% tax)?',
        options: [
          'Net income up $6; cash up $10; PP&E up $10.',
          'Net income down ~$7; CFO up ~$3; PP&E down $10; Retained Earnings down by NI.',
          'Net income unchanged; CFO unchanged; PP&E down $10.',
          'Net income down $10; CFO up $10; PP&E down $10.'
        ],
        difficulty: 'Medium',
        industry: 'TMT',
        topic: 'Accounting'
      },
      // LBO — Healthcare
      {
        id: 'lbo-value-drivers-easy-hc',
        question: 'Which is NOT a primary LBO value creation driver?',
        options: [
          'Multiple expansion',
          'Debt paydown and cash generation',
          'Operational improvements (margin/volume)',
          'Issuing new common stock to the public during hold'
        ],
        difficulty: 'Easy',
        industry: 'Healthcare',
        topic: 'LBO'
      },
      {
        id: 'lbo-sources-uses-med-hc',
        question: 'In an LBO Sources & Uses, where does the sponsor equity contribution appear?',
        options: [
          'Uses only',
          'Sources only',
          'Both Sources and Uses',
          'Neither Sources nor Uses'
        ],
        difficulty: 'Medium',
        industry: 'Healthcare',
        topic: 'LBO'
      },
      // Valuation — TMT
      {
        id: 'val-cap-structure-hard-tmt',
        question: 'Which valuation multiple is most capital-structure neutral?',
        options: ['P/E', 'EV/EBITDA', 'Price/Book', 'Dividend Yield'],
        difficulty: 'Hard',
        industry: 'TMT',
        topic: 'Valuation'
      },
      // Accounting — Generalist
      {
        id: 'acct-deferred-tax-hard-gen',
        question: 'A company records accelerated tax depreciation vs. straight-line book. What is the likely tax balance impact?',
        options: [
          'Deferred tax asset increases',
          'Deferred tax liability increases',
          'No deferred tax impact',
          'Permanent difference increases equity'
        ],
        difficulty: 'Hard',
        industry: 'Generalist',
        topic: 'Accounting'
      },
      // LBO — Generalist
      {
        id: 'lbo-interest-coverage-med-gen',
        question: 'Which metric best assesses near-term debt service capacity in an LBO?',
        options: ['P/E', 'Free Cash Flow to Equity', 'Interest Coverage (EBITDA/Interest)', 'PEG Ratio'],
        difficulty: 'Medium',
        industry: 'Generalist',
        topic: 'LBO'
      },
      {
        id: 'lbo-exit-assumption-hard-tmt',
        question: 'When modeling LBO exits, which assumption is most common for base cases?',
        options: [
          'Exit at entry multiple (or modest change)',
          'Exit at IPO with high growth',
          'Liquidation value based on PP&E',
          'Exit multiple always expands by 2x'
        ],
        difficulty: 'Hard',
        industry: 'TMT',
        topic: 'LBO'
      }
    ];
    return pool;
  }, []);
  const difficultyOptions: Array<'All' | Difficulty> = ['All', 'Easy', 'Medium', 'Hard'];
  const industryOptions: Array<'All' | Industry> = ['All', 'Generalist', 'TMT', 'Healthcare'];
  const topicOptions: Array<'All' | Topic> = ['All', 'Accounting', 'Valuation', 'LBO'];
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | Difficulty>('All');
  const [industryFilter, setIndustryFilter] = useState<'All' | Industry>('All');
  const [topicFilter, setTopicFilter] = useState<'All' | Topic>('All');
  const [techFilterDropdown, setTechFilterDropdown] = useState<null | 'difficulty' | 'industry' | 'topic'>(null);
  const flashcards = useMemo(() => {
    return allFlashcards.filter((c) =>
      (difficultyFilter === 'All' || c.difficulty === difficultyFilter) &&
      (industryFilter === 'All' || c.industry === industryFilter) &&
      (topicFilter === 'All' || c.topic === topicFilter)
    );
  }, [allFlashcards, difficultyFilter, industryFilter, topicFilter]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const goToNextCard = useCallback(() => {
    setCurrentCardIndex((idx) => (flashcards.length ? (idx + 1) % flashcards.length : 0));
  }, [flashcards.length]);
  useEffect(() => {
    setCurrentCardIndex(0);
  }, [flashcards.length]);

  // Lightweight behavioral demo: audio + clickable transcript
  const behavioralClips: BehavioralClip[] = useMemo(
    () => [
      {
        id: 'tmays',
        label: 'Intro',
        prompt: 'Tell me about yourself',
        // Small, publicly hosted sample audio. Replace with a local file under /public when ready.
        audioUrl: 'https://www.soundjay.com/buttons/sounds/button-3.mp3',
        durationSec: 8,
        segments: [
          { start: 0, end: 1.2, speaker: 'Interviewer', text: 'Tell me about yourself.' },
          { start: 1.2, end: 3.5, speaker: 'Candidate', text: 'I am a junior studying finance and computer science.' },
          { start: 3.5, end: 5.6, speaker: 'Candidate', text: 'I led a student fund, analyzing equity pitches across sectors.' },
          { start: 5.6, end: 8, speaker: 'Candidate', text: 'I enjoy modeling and I am preparing for investment banking.' }
        ]
      },
      {
        id: 'leadership',
        label: 'Leadership',
        prompt: 'Leadership challenge',
        audioUrl: 'https://www.soundjay.com/buttons/sounds/button-3.mp3',
        durationSec: 8,
        segments: [
          { start: 0, end: 1.2, speaker: 'Interviewer', text: 'Describe a leadership challenge.' },
          { start: 1.2, end: 3.5, speaker: 'Candidate', text: 'Our team missed a deadline; I re-scoped deliverables and reassigned owners.' },
          { start: 3.5, end: 5.6, speaker: 'Candidate', text: 'We instituted daily standups to unblock dependencies.' },
          { start: 5.6, end: 8, speaker: 'Candidate', text: 'Shipped on time with better quality and clearer accountability.' }
        ]
      },
      {
        id: 'failure',
        label: 'Failure',
        prompt: 'Tell me about a failure',
        audioUrl: 'https://www.soundjay.com/buttons/sounds/button-3.mp3',
        durationSec: 8,
        segments: [
          { start: 0, end: 1.3, speaker: 'Interviewer', text: 'Tell me about a failure.' },
          { start: 1.3, end: 3.6, speaker: 'Candidate', text: 'I missed an early project deadline due to poor scoping.' },
          { start: 3.6, end: 5.8, speaker: 'Candidate', text: 'I aligned expectations, built a granular plan, and communicated risks.' },
          { start: 5.8, end: 8, speaker: 'Candidate', text: 'We delivered successfully and I adopted that planning approach thereafter.' }
        ]
      },
      {
        id: 'why us',
        label: 'Why Us',
        prompt: 'Why our firm?',
        audioUrl: 'https://www.soundjay.com/buttons/sounds/button-3.mp3',
        durationSec: 8,
        segments: [
          { start: 0, end: 1.2, speaker: 'Interviewer', text: 'Why our firm?' },
          { start: 1.2, end: 3.4, speaker: 'Candidate', text: 'Your platform strengths in M&A and culture of apprenticeship.' },
          { start: 3.4, end: 5.9, speaker: 'Candidate', text: 'I spoke with analysts about deal exposure and mentorship.' },
          { start: 5.9, end: 8, speaker: 'Candidate', text: 'I can contribute immediately while growing on complex transactions.' }
        ]
      }
    ],
    []
  );

  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [manualActiveIndex, setManualActiveIndex] = useState<number | null>(null);

  // Use stable directions selected at module load
  const rowDirections = ROW_DIRECTIONS;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [currentClipIndex]);

  const activeSegmentIndex = useMemo(() => {
    const segs = behavioralClips[currentClipIndex].segments;
    const idx = segs.findIndex((s) => currentTime >= s.start && currentTime < s.end);
    // If nothing matches (e.g., at end), keep last segment highlighted
    return idx === -1 ? segs.length - 1 : idx;
  }, [behavioralClips, currentClipIndex, currentTime]);

  const effectiveActiveIndex = manualActiveIndex ?? activeSegmentIndex;

  useEffect(() => {
    if (!isPlaying) return; // prevent unwanted page scroll on initial load
    const el = segmentRefs.current[effectiveActiveIndex];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [effectiveActiveIndex, currentClipIndex, isPlaying]);

  const seekTo = (timeSec: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(timeSec, behavioralClips[currentClipIndex].durationSec - 0.01));
    if (!isPlaying) audio.play().catch(() => {});
  };

  // Application Tracker state
  type TrackingStatus = 'Not applied' | 'Phone' | 'Superday' | 'Offer';
  type Application = {
    id: string;
    company: string;
    role: string;
    location?: string;
    appliedOn: string; // ISO date
    tracking: TrackingStatus;
    priority: boolean;
    deadline: string; // ISO date for application deadline
    nextStepDate?: string; // ISO date for interviews, etc.
  };
  const MIGRATION_DEFAULT_DEADLINES: Record<string, string> = {
    'Goldman Sachs': '2025-09-01',
    'Morgan Stanley': '2025-08-25'
  };
  const toISODate = (d: Date) => d.toISOString().slice(0, 10);
  const addDays = (dateStr: string, days: number) => {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return toISODate(new Date(Date.now() + days * 86400000));
    d.setDate(d.getDate() + days);
    return toISODate(d);
  };
  const migrateApplications = (input: any[]): Application[] => {
    return input.map((raw) => {
      const priorStatus: string | undefined = raw?.status;
      const tracking: TrackingStatus = raw?.tracking
        ? raw.tracking
        : priorStatus
        ? (priorStatus === 'Applied' ? 'Not applied' : priorStatus)
        : 'Not applied';
      const deadline: string = raw?.deadline
        ? raw.deadline
        : MIGRATION_DEFAULT_DEADLINES[raw?.company as string] ?? addDays(raw?.appliedOn ?? toISODate(new Date()), 21);
      const appliedOn = raw?.appliedOn ?? toISODate(new Date());
      return {
        id: String(raw?.id ?? `${Math.random()}`),
        company: String(raw?.company ?? ''),
        role: String(raw?.role ?? ''),
        location: raw?.location ? String(raw.location) : undefined,
        appliedOn,
        tracking,
        priority: Boolean(raw?.priority),
        deadline,
        nextStepDate: raw?.nextStepDate ? String(raw.nextStepDate) : undefined
      } satisfies Application;
    });
  };
  // Tracking options for the custom dropdown
  const getTrackingColor = (status: TrackingStatus) => {
    switch (status) {
      case 'Not applied':
        return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'Phone':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Superday':
        return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Offer':
        return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };
  const trackingOptions: TrackingStatus[] = ['Not applied', 'Phone', 'Superday', 'Offer'];
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const triggerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [portalPos, setPortalPos] = useState<{ left: number; top: number; width: number; direction: 'down' | 'up' } | null>(null);
  const menuPortalRef = useRef<HTMLDivElement | null>(null);
  const defaultApplications: Application[] = [
    {
      id: 'tc-ai-series-a',
      company: 'TechCorp AI',
      role: 'Series A Investment',
      location: 'San Francisco, CA',
      appliedOn: new Date().toISOString().slice(0, 10),
      tracking: 'Offer',
      priority: true,
      deadline: '2025-09-01'
    },
    {
      id: 'df-systems-seed',
      company: 'DataFlow Systems',
      role: 'Seed Investment',
      location: 'New York, NY',
      appliedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 10),
      tracking: 'Superday',
      priority: false,
      deadline: '2025-08-25'
    },
    {
      id: 'cv-series-b',
      company: 'CloudVault',
      role: 'Series B Investment',
      location: 'Austin, TX',
      appliedOn: new Date().toISOString().slice(0, 10),
      tracking: 'Phone',
      priority: false,
      deadline: ''
    }
  ];
  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem('applicationTracker');
      const raw = saved ? (JSON.parse(saved) as any[]) : defaultApplications;
      const migrated = migrateApplications(raw);
      // Ensure the CloudVault Series B row exists even for existing users
      if (!migrated.some((a) => a.id === 'cv-series-b')) {
        migrated.push({
          id: 'cv-series-b',
          company: 'CloudVault',
          role: 'Series B Investment',
          location: 'Austin, TX',
          appliedOn: new Date().toISOString().slice(0, 10),
          tracking: 'Not applied',
          priority: false,
          deadline: addDays(new Date().toISOString().slice(0, 10), 21)
        });
      }
      return migrated;
    } catch {
      return migrateApplications(defaultApplications);
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem('applicationTracker', JSON.stringify(applications));
    } catch {}
  }, [applications]);
  // Rows: preserve insertion order (no sorting)
  const rows = applications;
  const handleTrackingChange = (id: string, option: TrackingStatus) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, tracking: option } : a)));
    setOpenDropdownId(null);
    setPortalPos(null);
  };

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!openDropdownId) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      const trigger = openDropdownId ? triggerRefs.current[openDropdownId] : null;
      const menu = menuPortalRef.current;
      if ((menu && menu.contains(target)) || (trigger && trigger.contains(target))) {
        return;
      }
      setOpenDropdownId(null);
      setPortalPos(null);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdownId(null);
        setPortalPos(null);
      }
    };
    const handleScrollOrResize = () => {
      setOpenDropdownId(null);
      setPortalPos(null);
    };
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKey);
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKey);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [openDropdownId]);

  const openTrackingDropdown = (id: string) => {
    const trigger = triggerRefs.current[id];
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const estimatedHeight = trackingOptions.length * 32 + 12;
    const direction: 'down' | 'up' = spaceBelow < estimatedHeight ? 'up' : 'down';
    const widthRounded = Math.round(rect.width);
    setPortalPos({ left: rect.left, top: direction === 'down' ? rect.bottom : rect.top, width: widthRounded, direction });
    setOpenDropdownId(id);
  };

  // Organizations: directory, invite, analytics
  type OrgRole = 'Admin' | 'Member';
  type OrgStatus = 'Active' | 'Invited';
  type OrgMember = {
    id: string;
    name: string;
    role: OrgRole;
    vertical: string;
    mocks7d: number;
    technical: string;
    behavioral: string;
  };

  const orgMembers = useMemo<OrgMember[]>(
    () => [
      { id: 'm-1', name: 'Sarah Chen', role: 'Admin', vertical: 'AI & Machine Learning', mocks7d: 3, technical: 'A', behavioral: 'A' },
      { id: 'm-2', name: 'Michael Rodriguez', role: 'Member', vertical: 'FinTech', mocks7d: 6, technical: 'A', behavioral: 'A' },
      { id: 'm-3', name: 'Dr. Lisa Park', role: 'Member', vertical: 'Healthcare', mocks7d: 1, technical: 'B', behavioral: 'B' },
      { id: 'm-4', name: 'David Kim', role: 'Member', vertical: 'Cybersecurity', mocks7d: 0, technical: 'C', behavioral: 'C' },
      { id: 'm-5', name: 'Jennifer Walsh', role: 'Member', vertical: 'Cloud Computing', mocks7d: 0, technical: 'C', behavioral: 'B' },
      { id: 'm-6', name: 'Alex Thompson', role: 'Member', vertical: 'CleanTech', mocks7d: 2, technical: 'B', behavioral: 'B' },
      { id: 'm-7', name: 'Dr. Maria Santos', role: 'Admin', vertical: 'Quantum Computing', mocks7d: 4, technical: 'A', behavioral: 'A' },
      { id: 'm-8', name: 'James Wilson', role: 'Member', vertical: 'Blockchain', mocks7d: 1, technical: 'B', behavioral: 'B' }
    ],
    []
  );

  const orgRoleOptions: Array<'All' | OrgRole> = ['All', 'Admin', 'Member'];
  const orgStatusOptions: Array<'All' | OrgStatus> = ['All', 'Active', 'Invited'];
  const orgVerticals = useMemo(() => Array.from(new Set(orgMembers.map((m) => m.vertical))), [orgMembers]);
  const orgVerticalOptions: Array<'All' | string> = useMemo(() => ['All', ...orgVerticals], [orgVerticals]);

  const [orgRoleFilter, setOrgRoleFilter] = useState<'All' | OrgRole>('All');
  const [orgVerticalFilter, setOrgVerticalFilter] = useState<'All' | string>('All');


  const filteredMembers = useMemo(() => {
    return orgMembers.filter((m) =>
      (orgRoleFilter === 'All' || m.role === orgRoleFilter) &&
      (orgVerticalFilter === 'All' || m.vertical === orgVerticalFilter)
    );
  }, [orgMembers, orgRoleFilter, orgVerticalFilter]);

  return (
    <div className="space-y-12">
        {/* Enterprise Hero */}
        <section className="relative overflow-hidden bg-white border border-gray-200 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-sky-500/5 to-purple-500/10" />
          <div className="relative mx-auto max-w-[90rem] px-5 py-12 lg:py-16">
            <div className="max-w-3xl">
              <p className="text-[10px] uppercase tracking-wider text-blue-700/80 font-semibold mb-2">Venture Capital Excellence</p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-news tracking-tight text-gray-900 leading-[1.08]">
                Partnering with exceptional founders to build the future
              </h1>
              <p className="mt-4 text-sm sm:text-base text-gray-700 max-w-2xl">
                We invest in early-stage technology companies with transformative potential. Our portfolio spans AI, fintech, healthcare, and enterprise software across North America and Europe.
              </p>
              <div className="mt-6">
                {/* Email capture + Start Free CTA with gray outline on input and blue outline on button */}
                <form className="flex w-full max-w-xl bg-white shadow-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email to stay updated"
                    className="flex-1 h-10 px-4 text-sm text-gray-800 placeholder-gray-500 focus:outline-none border border-gray-300"
                  />
                  <button type="submit" className="ml-[-1px] h-10 px-4 sm:px-5 text-sm bg-blue-600 hover:bg-blue-700 text-white border border-blue-600">
                    Subscribe
                    <span className="sr-only">Subscribe to APT4 Ventures updates</span>
                  </button>
                </form>
              </div>

              {/* Removed hero badges per request */}
            </div>
          </div>
        </section>

        {/* Company Logos Carousel */}
        <section className="mx-auto max-w-[90rem] px-5">
          <LogoCarousel 
            title="Trusted by leading technology companies and entrepreneurs"
            heightClass="h-14"
            companies={bankCompanies}
          />
        </section>

        {/* Technical Panel */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-[90rem] px-5 py-12 animate-fade-in">
            <div className="grid lg:grid-cols-5 gap-10 items-center">
              {/* Left: Text (40%) */}
              <div className="lg:col-span-2">
                <h2 className="font-news text-3xl sm:text-4xl leading-tight text-gray-900">Deep Technical Expertise</h2>
                <div className="mt-2 h-0.5 w-10 bg-blue-600/80"></div>
                <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-xl">Our team brings decades of experience in technology, finance, and operations to help portfolio companies scale and succeed.</p>
                
              </div>

              {/* Right: Visual (60%) */}
              <div className="lg:col-span-3">
                <div className="relative w-full rounded-xl border border-gray-200 ring-1 ring-blue-100 shadow-lg bg-gradient-to-b from-gray-50 to-gray-100 p-2 sm:p-3">
                  {/* Rectangular dropdown filters, minimal and clean */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* Difficulty dropdown */}
                    <div className="relative">
                      <div
                        className={`flex items-center justify-between px-2 py-1 h-8 w-full text-xs bg-white border border-gray-300 rounded cursor-pointer transition-colors ${techFilterDropdown === 'difficulty' ? 'ring-1 ring-blue-300 border-blue-300' : 'hover:border-blue-300'}`}
                        onClick={() => setTechFilterDropdown(techFilterDropdown === 'difficulty' ? null : 'difficulty')}
                        aria-haspopup="listbox"
                        aria-expanded={techFilterDropdown === 'difficulty'}
                      >
                        <span className="truncate">
                          {difficultyFilter === 'All' ? 'All difficulties' : difficultyFilter}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-gray-600">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.54a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {techFilterDropdown === 'difficulty' && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-md rounded z-20">
                          <div className="py-1">
                            {difficultyOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => { setDifficultyFilter(opt as any); setTechFilterDropdown(null); setCurrentCardIndex(0); }}
                                className={`w-full text-left px-2 py-1 h-8 text-xs hover:bg-gray-50 ${difficultyFilter === opt ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                                role="option"
                                aria-selected={difficultyFilter === opt}
                              >
                                {opt === 'All' ? 'All difficulties' : opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Industry dropdown */}
                    <div className="relative">
                      <div
                        className={`flex items-center justify-between px-2 py-1 h-8 w-full text-xs bg-white border border-gray-300 rounded cursor-pointer transition-colors ${techFilterDropdown === 'industry' ? 'ring-1 ring-blue-300 border-blue-300' : 'hover:border-blue-300'}`}
                        onClick={() => setTechFilterDropdown(techFilterDropdown === 'industry' ? null : 'industry')}
                        aria-haspopup="listbox"
                        aria-expanded={techFilterDropdown === 'industry'}
                      >
                        <span className="truncate">
                          {industryFilter === 'All' ? 'All industries' : industryFilter}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-gray-600">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.54a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {techFilterDropdown === 'industry' && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-md rounded z-20">
                          <div className="py-1">
                            {industryOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => { setIndustryFilter(opt as any); setTechFilterDropdown(null); setCurrentCardIndex(0); }}
                                className={`w-full text-left px-2 py-1 h-8 text-xs hover:bg-gray-50 ${industryFilter === opt ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                                role="option"
                                aria-selected={industryFilter === opt}
                              >
                                {opt === 'All' ? 'All industries' : opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* Topic dropdown */}
                    <div className="relative">
                      <div
                        className={`flex items-center justify-between px-2 py-1 h-8 w-full text-xs bg-white border border-gray-300 rounded cursor-pointer transition-colors ${techFilterDropdown === 'topic' ? 'ring-1 ring-blue-300 border-blue-300' : 'hover:border-blue-300'}`}
                        onClick={() => setTechFilterDropdown(techFilterDropdown === 'topic' ? null : 'topic')}
                        aria-haspopup="listbox"
                        aria-expanded={techFilterDropdown === 'topic'}
                      >
                        <span className="truncate">
                          {topicFilter === 'All' ? 'All topics' : topicFilter}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-gray-600">
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.54a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </div>
                      {techFilterDropdown === 'topic' && (
                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-md rounded z-20">
                          <div className="py-1">
                            {topicOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => { setTopicFilter(opt as any); setTechFilterDropdown(null); setCurrentCardIndex(0); }}
                                className={`w-full text-left px-2 py-1 h-8 text-xs hover:bg-gray-50 ${topicFilter === opt ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
                                role="option"
                                aria-selected={topicFilter === opt}
                              >
                                {opt === 'All' ? 'All topics' : opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Card below filters */}
                  <div
                    id="technical"
                    role="button"
                    tabIndex={0}
                    onClick={goToNextCard}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        goToNextCard();
                      }
                    }}
                    className="mt-2 relative w-full aspect-[4/3] select-none cursor-pointer"
                    aria-label="Flashcards: click to advance to the next card"
                  >
                    {/* Card container */}
                    <div className="absolute inset-2 sm:inset-2 bg-white border border-gray-200 shadow-lg ring-1 ring-blue-100 rounded-xl p-4 sm:p-6 flex flex-col">
                      <div className="text-[11px] uppercase tracking-wider text-blue-700/80">Investment Focus Areas</div>
                      <div className="mt-3 flex-1">
                        {flashcards.length === 0 ? (
                          <div className="h-full w-full flex items-center justify-center">
                            <span className="text-xs text-gray-500">No cards match the selected filters.</span>
                          </div>
                        ) : (
                          <>
                            <div className="text-sm sm:text-base font-semibold text-gray-900">
                              {flashcards[currentCardIndex].question}
                            </div>
                            <ol className="mt-3 space-y-2 min-h-[7rem] sm:min-h-[8rem]">
                              {flashcards[currentCardIndex].options.map((opt, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-center gap-3 border border-gray-200 hover:border-blue-300 bg-white p-3 rounded-md"
                                >
                                  <span className="inline-flex h-7 w-7 items-center justify-center rounded bg-sky-50 border border-sky-200 text-sky-700 font-semibold shrink-0">
                                    {idx + 1}
                                  </span>
                                  <span className="text-[13px] sm:text-sm text-gray-800 leading-snug">
                                    {opt}
                                  </span>
                                </li>
                              ))}
                            </ol>
                          </>
                        )}
                      </div>
                      <div className="mt-4 grid grid-cols-3 items-center text-xs text-gray-500">
                        <div>
                          {flashcards.length > 0 ? `Card ${currentCardIndex + 1} / ${flashcards.length}` : '0 cards'}
                        </div>
                        <div className="flex justify-center">
                          {flashcards.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-700">{flashcards[currentCardIndex].difficulty}</span>
                              <span className="px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-700">{flashcards[currentCardIndex].industry}</span>
                              <span className="px-2 py-0.5 rounded border border-gray-200 bg-gray-50 text-gray-700">{flashcards[currentCardIndex].topic}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end">
                          <span>{flashcards.length > 0 ? 'Click to continue →' : ''}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Behavioral Panel */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-[90rem] px-5 py-12 animate-fade-in">
            <div className="grid lg:grid-cols-5 gap-10 items-center">
              {/* Left: Visual (60%) to alternate sides */}
              <div className="lg:col-span-3">
                {/* Scenario selector above the interview card */}
                <div className="mb-3 flex flex-wrap gap-2">
                    {behavioralClips.map((clip, idx) => (
                      <button
                        key={clip.id}
                        onClick={() => {
                          setCurrentClipIndex(idx);
                          setCurrentTime(0);
                          setManualActiveIndex(null);
                          const a = audioRef.current;
                          if (a) {
                            a.pause();
                            a.currentTime = 0;
                          }
                        }}
                        className={
                        'rounded text-[11px] sm:text-xs px-3 py-1 border transition-colors ' +
                          (idx === currentClipIndex
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white/90 backdrop-blur border-gray-300 text-gray-800 hover:border-blue-300')
                        }
                        aria-pressed={idx === currentClipIndex}
                      >
                      {clip.label ?? clip.prompt.split(' ')[0]}
                      </button>
                    ))}
                  </div>

                <div id="behavioral" className="relative w-full aspect-[16/10] rounded-lg border border-gray-200 ring-1 ring-blue-100 shadow-lg bg-gradient-to-b from-gray-100 to-gray-50">
                  {/* Two-pane layout: player + transcript */}
                  <div className="absolute inset-3 sm:inset-4 bg-white/90 backdrop-blur border border-gray-200 rounded-lg overflow-hidden grid grid-cols-5">
                    {/* Player pane */}
                    <div className="col-span-5 md:col-span-2 border-r border-gray-200 p-3 sm:p-4 flex flex-col">
                      <div className="text-[11px] uppercase tracking-wider text-blue-700/80">Founder Partnership</div>
                      <div className="mt-2 text-sm font-semibold text-gray-900">{behavioralClips[currentClipIndex].prompt}</div>
                      {/* Neon orb animation */
                      }
                      <div className="mt-4 h-28 flex items-center justify-center">
                        <div className="relative" aria-hidden="true">
                          {/* Outer glow */}
                          <div className="absolute -inset-2 rounded-full bg-sky-400/20 blur-2xl orb-halo" />
                          <div className="absolute -inset-4 rounded-full bg-indigo-500/15 blur-[28px] orb-halo" style={{ animationDelay: '0.6s' }} />
                          {/* SVG ring with animated gradient stroke */}
                          <svg width="120" height="120" viewBox="0 0 120 120" className="orb-breathe orb-core orb-hue">
                            <defs>
                              <filter id="liquid">
                                <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="3">
                                  <animate attributeName="baseFrequency" dur="12s" values="0.006;0.010;0.007;0.009;0.006" repeatCount="indefinite" />
                                </feTurbulence>
                                <feDisplacementMap in="SourceGraphic" scale="6" />
                              </filter>
                              <radialGradient id="orbCore" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
                                <stop offset="60%" stopColor="#3B82F6" stopOpacity="0.6" />
                                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.2" />
                              </radialGradient>
                              <linearGradient id="orbStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#22D3EE" />
                                <stop offset="50%" stopColor="#60A5FA" />
                                <stop offset="100%" stopColor="#8B5CF6" />
                              </linearGradient>
                            </defs>
                            {/* Core */}
                            <circle cx="60" cy="60" r="42" fill="url(#orbCore)" filter="url(#liquid)" />
                            {/* Specular highlight that gently orbits */}
                            <g className="orb-specular">
                              <circle cx="92" cy="40" r="6" fill="#FFFFFF" fillOpacity="0.12" />
                              <circle cx="92" cy="40" r="10" fill="url(#orbCore)" fillOpacity="0.08" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Transcript pane */}
                    <div className="col-span-5 md:col-span-3 p-3 sm:p-4 overflow-auto">
                      <div className="space-y-2">
                        {behavioralClips[currentClipIndex].segments.map((seg, idx) => {
                          const isActive = idx === effectiveActiveIndex;
                          return (
                            <div
                              key={idx}
                              ref={(el) => (segmentRefs.current[idx] = el)}
                              onClick={() => {
                                setManualActiveIndex(idx);
                                seekTo(seg.start + 0.01);
                              }}
                              className={
                                'cursor-pointer border rounded px-3 py-2 text-sm ' +
                                (isActive
                                  ? 'bg-sky-50 border-sky-300 shadow-sm'
                                  : 'bg-white border-gray-200 hover:border-blue-300')
                              }
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  setManualActiveIndex(idx);
                                  seekTo(seg.start + 0.01);
                                }
                              }}
                              aria-label={`Seek to ${Math.round(seg.start)} seconds`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-medium text-gray-700">
                                  {seg.speaker}
                                </div>
                                <div className="text-[11px] text-gray-500">
                                  {formatTime(seg.start)} – {formatTime(seg.end)}
                                </div>
                              </div>
                              <div className="mt-1 text-gray-900">{seg.text}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Text (40%) */}
              <div className="lg:col-span-2">
                <h2 className="font-news text-3xl sm:text-4xl leading-tight text-gray-900">Strategic Partnership Approach</h2>
                <div className="mt-2 h-0.5 w-10 bg-blue-600/80"></div>
                <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-xl">We work closely with founders to provide strategic guidance, operational support, and access to our extensive network of industry leaders.</p>
                
              </div>
            </div>
          </div>
        </section>

        {/* Live Panel (3-card layout) */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-[90rem] px-5 py-12 animate-fade-in">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-news text-3xl sm:text-4xl leading-tight text-gray-900">Market Intelligence & Insights</h2>
              <div className="mx-auto mt-2 h-0.5 w-10 bg-blue-600/80"></div>
              <p className="mt-3 text-sm sm:text-base text-gray-700">Stay ahead of market trends, track portfolio performance, and identify emerging opportunities in technology sectors.</p>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {/* Card 1: Index strip */}
              <article className="rounded-xl border border-gray-200 shadow-lg bg-gradient-to-b from-slate-100 to-slate-50 flex flex-col">
                <div className="rounded-t-xl border-b border-gray-200 ring-1 ring-blue-100 bg-white">
                  <div className="p-3 space-y-3">
                    <IndexCarousel title="Major indices" items={headlineIndices} heightClass="h-12" durationSec={36} direction={rowDirections.majors} />
                    <IndexCarousel title="Commodities" items={commodityIndices} heightClass="h-12" durationSec={40} direction={rowDirections.commodities} />
                    <IndexCarousel title="Tech leaders" items={techLeaders} heightClass="h-12" durationSec={44} direction={rowDirections.tech} />
                  </div>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-semibold tracking-tight text-gray-900">Market indicators</h3>
                  <p className="mt-1 text-sm text-gray-600">Tech indices, venture funding trends, and sector performance — real-time insights.</p>
                </div>
              </article>
              {/* Card 2: Deal flow */}
              <article className="rounded-xl border border-gray-200 shadow-lg bg-gradient-to-b from-slate-100 to-slate-50 flex flex-col">
                <div className="rounded-t-xl border-b border-gray-200 ring-1 ring-blue-100 bg-white p-3">
                  <div className="text-center mb-2">
                    <p className="text-xs text-gray-600">Portfolio Activity</p>
                  </div>
                  <DealsDuo />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-semibold tracking-tight text-gray-900">Portfolio highlights</h3>
                  <p className="mt-1 text-sm text-gray-600">Recent investments, funding rounds, and strategic partnerships across our portfolio.</p>
                </div>
              </article>
              {/* Card 3: Market Pulse */}
              <article className="rounded-xl border border-gray-200 shadow-lg bg-gradient-to-b from-slate-100 to-slate-50 flex flex-col">
                <div className="rounded-t-xl border-b border-gray-200 ring-1 ring-blue-100 bg-white p-3">
                  <div className="text-center mb-2">
                    <p className="text-xs text-gray-600">Sector Insights</p>
                  </div>
                  <MarketPulse />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base font-semibold tracking-tight text-gray-900">Industry insights</h3>
                  <p className="mt-1 text-sm text-gray-600">Deep analysis of technology trends, market dynamics, and investment opportunities.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        

        {/* Applications Panel */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-[90rem] px-5 py-12 animate-fade-in">
            <div className="grid lg:grid-cols-5 gap-10 items-start">
              {/* Left: Text (40%) */}
              <div className="lg:col-span-2">
                <h2 className="font-news text-3xl sm:text-4xl leading-tight text-gray-900">Portfolio Company Performance</h2>
                <div className="mt-2 h-0.5 w-10 bg-blue-600/80"></div>
                <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-xl">Monitor portfolio company progress, track key metrics, and identify growth opportunities across all investments.</p>
              </div>
              {/* Right: Interactive Tracker (60%) */}
              <div className="lg:col-span-3">
                <div id="applications" className="relative w-full border border-gray-200 ring-1 ring-blue-100 shadow-lg bg-gradient-to-b from-gray-50 to-white">

                  {/* Table */}
                  <div className="divide-y divide-gray-200">
                    <div className="grid grid-cols-12 px-3 sm:px-4 py-2 text-[11px] uppercase tracking-wider text-gray-600 bg-gray-50 border-b border-gray-200 divide-x divide-gray-200">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-5 text-center">Company</div>
                      <div className="col-span-3 text-center">Stage</div>
                      <div className="col-span-3 text-center">Sector</div>
                    </div>
                    {rows.map((app, idx) => {
                      return (
                        <div key={app.id} className="grid grid-cols-12 px-3 sm:px-4 py-2 gap-0 items-start divide-x divide-gray-200 odd:bg-white even:bg-gray-50">
                          {/* Row number */}
                          <div className="col-span-1 text-center text-xs text-gray-500 py-2 px-2">{idx + 1}</div>
                          {/* Role */}
                          <div className="col-span-12 sm:col-span-5 min-w-0 px-2 py-2 text-center">
                            <div className="text-sm font-semibold text-gray-900 truncate" title={`${app.company} — ${app.role}`}>{app.company}</div>
                            <div className="text-[13px] text-gray-700 truncate">{app.role}</div>
                            {/* Tip moved under Status dropdown */}
                          </div>
                          {/* Status */}
                          <div className="col-span-12 sm:col-span-3 px-2 py-2 text-center">
                            <div className="inline-flex items-start gap-2">
                              <div className="relative" ref={(el) => { triggerRefs.current[app.id] = el; }}>
                                <div
                                  className={`flex items-center justify-between px-2 py-0.5 h-7 w-32 text-[11px] border cursor-pointer transition-colors ${
                                    app.tracking ? getTrackingColor(app.tracking) : 'bg-gray-100 text-gray-600 border-gray-200'
                                  }`}
                                  onClick={() => openTrackingDropdown(app.id)}
                                >
                                  <span className="truncate max-w-[7rem]">{app.tracking || 'Not applied'}</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3 text-current"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.19l3.71-3.96a.75.75 0 111.08 1.04l-4.25 4.54a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" /></svg>
                                </div>
                              </div>
                            </div>
                             {app.nextStepDate && (
                               <div className="mt-1 text-[11px] text-gray-500">Next: {new Date(app.nextStepDate).toLocaleDateString()}</div>
                             )}
                           </div>
                          {/* Location */}
                          <div className="col-span-12 sm:col-span-3 px-2 py-2 text-center">
                            {app.location ? (
                              <span className="text-[12px] text-gray-700 break-words" title={app.location}>{app.location}</span>
                            ) : (
                              <span className="text-[12px] text-gray-400">—</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {rows.length === 0 && (
                      <div className="px-3 sm:px-4 py-6 text-sm text-gray-600">No applications yet.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Organizations Panel */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-[90rem] px-5 py-12 animate-fade-in">
            <div className="flex flex-col items-center">
              {/* Top: Text */}
              <div className="text-center mb-10">
                <h2 className="font-news text-3xl sm:text-4xl leading-tight text-gray-900">Portfolio Network & Ecosystem</h2>
                <div className="mt-2 h-0.5 w-10 bg-blue-600/80 mx-auto"></div>
                <p className="mt-3 text-sm sm:text-base text-gray-700 max-w-xl">Connect portfolio companies with our network of advisors, industry experts, and strategic partners to accelerate growth and success.</p>
              </div>
              {/* Bottom: Organization Display - Placeholder */}
              <div className="w-full">
                <div className="grid grid-cols-5 gap-8 relative">
                  {/* Left Placeholder - Wider */}
                  <div className="col-span-2 relative z-10 flex items-start">
                    <CreateOrganizationFlow />
                  </div>
                  {/* Right Placeholder - Smaller */}
                  <div className="col-span-3 relative z-0">
                                          <div className="relative w-full border border-gray-200 ring-1 ring-blue-100 shadow-lg bg-gray-50">
                      {/* Subtle texture pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                          backgroundSize: '20px 20px'
                        }}></div>
                      </div>
                      
                      {/* Header */}
                                              <div className="relative border-b border-gray-200 ring-1 ring-blue-100 bg-gray-100 p-4 overflow-hidden">
                        {/* Subtle texture pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '20px 20px'
                          }}></div>
                        </div>
                        
                        <div className="relative">
                          {/* Top row with title and stats */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">Portfolio Advisory Board</h3>
                                <p className="text-sm text-gray-600">APT4 Ventures Network</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="text-sm font-medium text-gray-900">24 advisors</div>
                                <div className="text-xs text-gray-500">Active</div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Bottom row with informative elements */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              {/* Performance metrics */}
                              <div className="flex items-center space-x-3">
                                <div className="text-center bg-green-50 px-2 py-1 rounded border border-green-200">
                                  <div className="text-sm font-bold text-green-700">A+</div>
                                  <div className="text-xs text-green-600">Performance</div>
                                </div>
                                <div className="text-center bg-blue-50 px-2 py-1 rounded border border-blue-200">
                                  <div className="text-xs font-semibold text-blue-700">17</div>
                                  <div className="text-xs text-blue-600">Companies</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              {/* Last activity */}
                              <div className="text-right">
                                <div className="text-xs text-gray-500">Last activity</div>
                                <div className="text-xs font-medium text-gray-900">2 hours ago</div>
                              </div>
                              
                              {/* Status badges */}
                              <div className="flex items-center space-x-1">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200">
                                  Active
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>



                      {/* Tab Content - Members */}
                      <div className="relative p-4">

                        {/* Members Table */}
                        <div className="border border-gray-200 bg-white">
                          {/* Table Header */}
                          <div className="grid grid-cols-12 px-3 py-2 text-[11px] uppercase tracking-wider text-gray-600 bg-gray-50 border-b border-gray-200 divide-x divide-gray-200">
                            <div className="col-span-1 text-center">#</div>
                            <div className="col-span-2 text-center">Name</div>
                            <div className="col-span-3 text-center">Expertise</div>
                            <div className="col-span-2 text-center">Companies</div>
                            <div className="col-span-2 text-center">Sector</div>
                            <div className="col-span-2 text-center">Experience</div>
                          </div>
                          
                          {/* Table Rows */}
                          <div className="divide-y divide-gray-200">
                            {filteredMembers.map((member, idx) => (
                              <div key={member.id} className="grid grid-cols-12 px-3 py-2 gap-0 items-center divide-x divide-gray-200 odd:bg-white even:bg-gray-50">
                                {/* Row number */}
                                <div className="col-span-1 text-center text-xs text-gray-500">{idx + 1}</div>
                                
                                {/* Name */}
                                <div className="col-span-2 px-2 py-1 text-center">
                                  <div className="text-xs font-medium text-gray-900 truncate" title={member.name}>
                                    {member.name}
                                  </div>
                                </div>
                                
                                {/* Vertical */}
                                <div className="col-span-3 px-2 py-1 text-center">
                                  <span className="text-xs text-gray-700 truncate" title={member.vertical}>
                                    {member.vertical}
                                  </span>
                                </div>
                                
                                {/* Interviews */}
                                <div className="col-span-2 px-2 py-1 text-center">
                                  <span className="text-xs text-gray-900 font-mono">
                                    {member.mocks7d}
                                  </span>
                                </div>
                                
                                {/* Technical */}
                                <div className="col-span-2 px-2 py-1 text-center">
                                  <span className="text-xs text-gray-900 font-mono">
                                    {member.technical}
                                  </span>
                                </div>
                                
                                {/* Behavioral */}
                                <div className="col-span-2 px-2 py-1 text-center">
                                  <span className="text-xs text-gray-900 font-mono">
                                    {member.behavioral}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          {filteredMembers.length === 0 && (
                            <div className="px-3 py-6 text-xs text-gray-600 text-center">No members match the selected filters.</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security / Compliance */}
        <section className="relative overflow-hidden">
          <div className="relative mx-auto max-w-[90rem] px-5 py-12 lg:py-16">
            <div className="rounded-none bg-gray-950 text-gray-100 border border-gray-800 overflow-hidden">
              <div className="grid lg:grid-cols-5 gap-8 p-8 sm:p-10">
                <div className="lg:col-span-2">
                  <h2 className="font-news text-3xl sm:text-4xl leading-tight">Confidentiality & Trust</h2>
                  <div className="mt-2 h-0.5 w-10 bg-blue-500/80"></div>
                  <p className="mt-3 text-sm sm:text-base text-gray-300">We maintain the highest standards of confidentiality and trust in all our investment activities and portfolio relationships.</p>
                </div>
                <div className="lg:col-span-3">
                  <div className="grid sm:grid-cols-2 gap-6 items-stretch">
                    <div className="border border-gray-800/60 bg-gray-900/40 p-5 rounded-md h-full flex flex-col justify-center gap-1">
                      <div className="text-sm font-semibold text-white">Confidentiality</div>
                      <div className="text-sm text-gray-300">Portfolio company information is protected with the highest security standards.</div>
                    </div>
                    <div className="border border-gray-800/60 bg-gray-900/40 p-5 rounded-md h-full flex flex-col justify-center gap-1">
                      <div className="text-sm font-semibold text-white">Encryption</div>
                      <div className="text-sm text-gray-300">In transit and at rest with modern standards.</div>
                    </div>
                    <div className="border border-gray-800/60 bg-gray-900/40 p-5 rounded-md h-full flex flex-col justify-center gap-1">
                      <div className="text-sm font-semibold text-white">Access control</div>
                      <div className="text-sm text-gray-300">Role-based access, secure authentication, comprehensive audit trails.</div>
                    </div>
                    <div className="border border-gray-800/60 bg-gray-900/40 p-5 rounded-md h-full flex flex-col justify-center gap-1">
                      <div className="text-sm font-semibold text-white">Portfolio management</div>
                      <div className="text-sm text-gray-300">Comprehensive portfolio tracking, secure data sharing, and collaboration tools.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Removed footer chips per request */}
          </div>
        </section>

        {openDropdownId && portalPos && createPortal(
          <div
            ref={menuPortalRef}
            style={{ position: 'fixed', left: portalPos.left, top: portalPos.direction === 'down' ? portalPos.top : undefined, bottom: portalPos.direction === 'up' ? (window.innerHeight - portalPos.top) : undefined, width: portalPos.width, minWidth: portalPos.width, maxWidth: portalPos.width, boxSizing: 'border-box' as const }}
            className="z-50"
          >
            <div className="w-full bg-white border border-gray-200 rounded-sm shadow-md">
              <div className="py-1">
                {trackingOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleTrackingChange(openDropdownId, option)}
                    className={`w-full text-left px-2 py-0.5 h-7 text-[11px] whitespace-nowrap hover:bg-gray-50 ${
                      (applications.find((a) => a.id === openDropdownId)?.tracking === option) ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}