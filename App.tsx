import React from 'react';
import Sidebar from './components/Sidebar';
import AISummary from './components/AISummary';
import { MOCK_PAPERS, MOCK_NEWS, NAV_LINKS, SITE_CONFIG } from './constants';
import { Paper, NewsEvent } from './types';
import { ChevronDown, ChevronUp, ExternalLink, Award, GraduationCap, Mic2, Bell, FileText, Globe } from 'lucide-react';
// import { PawTrailHover } from "./PawTrailHover";

const PaperBrief: React.FC<{ paper: Paper }> = ({ paper }) => {
  const venueLine = (() => {
    const ccf = paper.ccf ? `, CCF-${paper.ccf}` : '';
    return `${paper.venueFull} (${paper.venueShort}${ccf})`;
  })();

  const highlightAuthorBrief = (authors: string) => {
    const re = /(xinyi\s+wu\*?)/gi;
    const parts = authors.split(re);
    return parts.map((part, i) => {
      const isHit = re.test(part); 
      const isMatch = /^(xinyi\s+wu\*?)$/i.test(part);
      return isMatch ? (
        <span key={i} className="font-semibold text-black">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      );
    });
  };

  return (
    <div className="group border-b border-gray-100 py-3 last:border-0 hover:bg-gray-50/50 transition-colors px-4 -mx-4">
      <div className="flex items-center gap-2 text-[12px] font-bold text-gray-400 tracking-widest mb-2">
      {/* <div className="text-sm text-gray-400 font-[12px] mb-3"> */}
        <span>{venueLine}</span>
      </div>

      <h3 className="text-medium lg:text-lg font-bold serif group-hover:underline underline-offset-4 decoration-1 transition-all">
        <a href="#/publications">{paper.title}</a>
        {/* <span className="text-[12px] text-black"> ✶ </span> */}
      </h3>

      <p className="text-sm text-gray-500 mt-1 font-light serif">
        {highlightAuthorBrief(paper.authors)}
      </p>
    </div>
  );
};

const NewsBrief: React.FC<{ event: NewsEvent }> = ({ event }) => {
  const iconMap = {
    paper: FileText,
    platform: Globe,
    award: Award,
    graduation: GraduationCap,
    talk: Mic2,
    general: Bell,
  } as const;
  
  const Icon = iconMap[event.type ?? 'general'];  

  const Wrapper: React.FC<React.PropsWithChildren> = ({ children }) =>
    event.link ? (
      <a
        href={event.link}
        target="_blank"
        rel="noreferrer"
        className="block"
      >
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  return (
    <Wrapper>
      <div className="group border-b border-gray-100 py-3 last:border-0 hover:bg-gray-50/50 transition-colors px-4 -mx-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3 text-[12px] font-bold text-gray-400 tracking-widest">
            <span className="inline-flex items-center justify-center w-7 h-7 border border-gray-100 bg-white text-gray-400">
              <Icon size={14} />
            </span>
            <span>{event.dateLabel}</span>
          </div>
          {event.link && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-gray-500 inline-flex items-center gap-1">
              <ExternalLink size={12} />
              Link
            </span>
          )}
        </div>

        <p className="text-lg text-gray-700 leading-relaxed font-medium serif">
          {event.content}
          {/* <span className="text-[12px]"> 🐾 </span> */}
        </p>
      </div>
    </Wrapper>
  );
};

const PublicationItem: React.FC<{ paper: Paper }> = ({ paper }) => {
  const highlightAuthor = (authors: string) => {
    // 匹配：Xinyi Wu 或 Xinyi Wu*
    const regex = /(Xinyi\s+Wu\*?)/gi;
  
    return authors.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="font-semibold text-black">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };  

  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showBib, setShowBib] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const venueLine = (() => {
    const ccf = paper.ccf ? `, CCF-${paper.ccf}` : '';
    return `${paper.venueFull} (${paper.venueShort}${ccf})`;
  })();

  const hasBibtex = typeof paper.bibtex === 'string' && paper.bibtex.trim().length > 0;

  const toggleAbstract = () => {
    if (!paper.abstract) return;
    setIsExpanded(v => !v);
  };

  const copyBibtex = async () => {
    if (!hasBibtex) return;
    try {
      await navigator.clipboard.writeText(paper.bibtex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback: user can manually copy
    }
  };

  return (
    <div className="mb-10 border-l-2 border-transparent hover:border-black pl-6 transition-all">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          {/* Title (click to toggle abstract) */}
          <h3
            onClick={toggleAbstract}
            className={[
              'text-lg lg:text-xl font-bold serif leading-snug mb-2',
              paper.abstract
                ? 'cursor-pointer hover:underline underline-offset-4 decoration-1'
                : '',
            ].join(' ')}
            title={paper.abstract ? 'Click to view abstract' : undefined}
          >
            {paper.title}
          </h3>

          {/* Venue under title */}
          {/* <div className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3"> */}
          <div className="text-sm text-gray-400 font-medium mb-3">
            {venueLine}
          </div>

          {/* <p className="text-sm text-gray-600 mb-4 serif">{paper.authors}</p> */}
          <p className="text-sm text-gray-600 mb-4 serif">
            {highlightAuthor(paper.authors)}
          </p>

          {/* Actions: PDF -> Code -> BibTeX */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {paper.pdfUrl && (
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1 hover:text-gray-500"
              >
                <ExternalLink size={14} />
                <span>PDF</span>
              </a>
            )}

            {paper.codeUrl && (
              <a
                href={paper.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1 hover:text-gray-500"
              >
                <ExternalLink size={14} />
                <span>Code</span>
              </a>
            )}

            {hasBibtex && (
              <button
                onClick={() => setShowBib(v => !v)}
                className="text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1 hover:text-gray-500"
              >
                <span>BibTeX</span>
                {showBib ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
            )}

          </div>

          {/* Abstract (opens when title clicked) */}
          {paper.abstract && isExpanded && (
            <div className="mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="bg-gray-50 p-6 rounded-sm border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-gray-400">
                    Abstract
                  </h4>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black inline-flex items-center gap-1"
                  >
                    <ChevronUp size={14} />
                    <span>Hide</span>
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-gray-600 font-light serif">
                  {paper.abstract}
                </p>
              </div>
            </div>
          )}

          {/* BibTeX block (Copy button inside) */}
          {hasBibtex && showBib && (
            <div className="mt-4 border border-gray-100 rounded-sm bg-white overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/40 flex items-center justify-between">
                <div className="text-xs uppercase font-bold tracking-widest text-gray-400">
                  BibTeX
                </div>
                <button
                  onClick={copyBibtex}
                  className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black"
                >
                  {copied ? 'Copied ✓' : 'Copy'}
                </button>
              </div>
              <pre className="px-4 py-4 text-xs leading-relaxed overflow-x-auto text-gray-700">
{paper.bibtex}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


const NewsItem: React.FC<{ event: NewsEvent }> = ({ event }) => {
  const fallbackImg =
    'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80';

  const imgSrc = event.imageUrl || fallbackImg;
  const imgAlt = event.imageAlt || 'News image';

  const Inner = (
    <div className="group flex items-start gap-6 mb-10">
      {/* Left: Image (bigger than icon) */}
      <div className="shrink-0">
        <div className="relative w-28 sm:w-36 md:w-44">
          <div className="aspect-[4/3] overflow-hidden border border-gray-100 bg-white shadow-sm">
            <img
              src={imgSrc}
              alt={imgAlt}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>

          {/* Optional: subtle timeline line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-px h-10 bg-gray-100 hidden md:block" />
        </div>
      </div>

      {/* Right: Text */}
      <div className="pt-1 flex-1">
        <div className="flex items-center justify-between gap-4">
          <div className="text-[12px] font-bold text-gray-400 tracking-widest">
            {event.dateLabel}
          </div>

          {event.link && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 group-hover:text-gray-500 inline-flex items-center gap-1">
              <ExternalLink size={12} />
              Link
            </span>
          )}
        </div>

        <p className="mt-2 text-medium text-gray-700 leading-relaxed font-medium">
          {event.content}
        </p>
      </div>
    </div>
  );

  return event.link ? (
    <a href={event.link} target="_blank" rel="noreferrer" className="block">
      {Inner}
    </a>
  ) : (
    Inner
  );
};



const App: React.FC = () => {
  const [currentPath, setCurrentPath] = React.useState(window.location.hash || '#/');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const sortedNews = React.useMemo(
    () => [...MOCK_NEWS].sort((a, b) => b.sortDate.localeCompare(a.sortDate)),
    []
  );
  
  const sortedPapers = React.useMemo(
    () => [...MOCK_PAPERS].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)),
    []
  );  

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'ml-16' : 'ml-72'}`}>
        {/* Top Navigation Bar */}
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-50 px-8 py-4 flex justify-between items-center">
          <div className="flex space-x-8">
            {NAV_LINKS.map(link => (
              <a 
                key={link.label}
                href={link.href}
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-black ${
                  currentPath === link.href ? 'text-black border-b border-black' : 'text-gray-400'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="text-[10px] uppercase font-bold tracking-widest text-gray-300">
            Last Update: {new Date().toLocaleDateString()}
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-8 py-16 lg:py-24">
          {/* HOME VIEW */}
          {currentPath === '#/' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="mb-20">
                <h1 className="text-4xl lg:text-5xl font-bold serif tracking-tight leading-tight mb-6">
                  Amor Fati
                </h1>
                <p className="max-w-xl text-lg lg:text-xl text-gray-600 font-light leading-relaxed serif italic">
                  The real problem is not whether machines think but whether men do.
                  Understanding the system before it understands us.
                </p>
              </header>

              {/* ① NEWS FIRST */}
              <section className="mb-16">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-black">
                    News
                    <span className="text-[12px]"> 🐾 </span>
                  </h2>
                  <a
                    href="#/news"
                    className="text-[10px] uppercase underline text-gray-400 hover:text-black"
                  >
                    View All
                  </a>
                </div>

                {/* <div className="space-y-2"> */}
                <div className="divide-y divide-gray-100">
                  {sortedNews.slice(0, 3).map(event => (
                    <NewsBrief key={event.id} event={event} />
                  ))}
                </div>
              </section>

              {/* ② THEN PUBLICATIONS */}
              <section>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-black">
                    Publications
                    <span className="text-[12px] text-black"> ✶ </span>
                  </h2>
                  <a
                    href="#/publications"
                    className="text-[10px] uppercase underline text-gray-400 hover:text-black"
                  >
                    View All
                  </a>
                </div>

                {/* <div className="space-y-2"> */}
                <div className="divide-y divide-gray-100">
                  {sortedPapers.slice(0, 3).map(paper => (
                    <PaperBrief key={paper.id} paper={paper} />
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* NEWS VIEW */}
          {currentPath === '#/news' && (
            <div className="animate-in fade-in duration-500">
              {/* <h2 className="text-4xl font-bold serif mb-16 tracking-tight">
                News
              </h2> */}
              <div className="max-w-2xl">
                {sortedNews.map(event => (
                  <NewsItem key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* PUBLICATIONS VIEW */}
          {currentPath === '#/publications' && (
            <div className="animate-in fade-in duration-500">
              <div className="space-y-4">
                {MOCK_PAPERS.map(paper => (
                  <PublicationItem key={paper.id} paper={paper} />
                ))}
              </div>
            </div>
          )}

        </main>

        <footer className="max-w-4xl mx-auto px-8 py-12 border-t border-gray-50 flex justify-between items-center text-[10px] uppercase font-bold tracking-[0.2em] text-gray-300">
          <div>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}</div>
          <div className="flex items-center space-x-2">
            <span>Per Aspera Ad Astra</span>
            <span className="text-gray-200">🐈‍⬛</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;