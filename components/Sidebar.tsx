import React from 'react';
import { SITE_CONFIG } from '../constants';
import { Github, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-100
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-72'}
      `}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="p-4 self-end text-gray-400 hover:text-black transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div
          className={`flex flex-col flex-grow p-8 transition-opacity duration-300 ${
            isCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Header/Brand */}
          <div className="mb-12 relative group">
            <h1 className="text-2xl font-bold tracking-tight serif mb-2">
              <a href="#/" className="hover:opacity-70 transition-opacity">
              {SITE_CONFIG.name}
              </a>
            </h1>

            <div className="w-10 h-1 bg-black mb-6"></div>

            <div className="relative inline-block">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-full flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-2 h-2 bg-black rotate-45"></div>
                <div className="w-2 h-2 bg-black rotate-45"></div>
              </div>

              <img
                src={SITE_CONFIG.avatar}
                alt={SITE_CONFIG.name}
                // className="w-20 h-20 grayscale border border-gray-200 mb-4 object-cover relative z-10"
                className="w-20 h-20 border border-gray-200 mb-4 object-cover relative z-10"
              />
            </div>

            <p className="text-sm text-gray-500 font-medium tracking-tight">
              {SITE_CONFIG.school}
            </p>

            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            {SITE_CONFIG.description}
            </p>
          </div>

          {/* 3) Minimal Info：PhD Candidate->Master's Student; AI Researcher->AI Safety Researcher; Cat Enthusiast 保留但更贴切 */}
          <div className="text-[10px] text-gray-300 mt-auto pt-8 border-t border-gray-50 uppercase tracking-widest leading-loose">
            Master&apos;s Student <br />
            AI Safety Researcher <br />
            Cat Enthusiast
          </div>

          {/* 4) Socials：去掉 twitter，仅保留 GitHub + Email */}
          <div className="flex items-center space-x-4 mt-6">
            <a
              href={SITE_CONFIG.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </a>

            <a
              href={SITE_CONFIG.socials.email}
              className="text-gray-400 hover:text-black transition-colors"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
