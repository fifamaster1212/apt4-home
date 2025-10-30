import { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import apt4Logo from '../../assets/apt4-logo.svg';

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-[var(--app-bg)] border-b border-gray-200">
      {/* Announcement Banner */}
      <div className="bg-blue-600 border-b border-blue-700">
        <div className="max-w-[90rem] mx-auto px-4 h-10 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-white font-light">
            <span>Announcing our $500M Fund IV.</span>
            <a href="/" className="inline-flex items-center gap-1 text-white hover:text-white/90 no-underline">
              Read More
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-[90rem] mx-auto px-4 h-14">
        <div className="flex items-center h-full relative" role="navigation" aria-label="Primary">
          {/* Logo */}
          <div
            className="flex items-center gap-1 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-lg font-libre font-semibold tracking-tight text-gray-900 leading-tight">
              APT4 Ventures
            </span>
          </div>

          {/* Center nav */}
          <nav className="hidden lg:flex ml-10">
            <ul className="flex items-center gap-8 text-sm text-gray-700">
              <li>
                <a href="/" className="hover:text-gray-900 no-underline">Home</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-gray-900 no-underline">Portfolio</a>
              </li>
              <li>
                <a href="/blog" className="hover:text-gray-900 no-underline">Blog</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-900 no-underline">Contact</a>
              </li>
            </ul>
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => {}}
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-none"
            >
              Pitch Us
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </button>
            <button
              onClick={() => {}}
              className="hidden sm:inline-flex items-center justify-center px-4 py-1.5 text-sm border border-gray-300 text-gray-900 bg-white hover:bg-gray-50 rounded-none"
            >
              LPs
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              className="lg:hidden p-2 text-gray-500 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-[96px] left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg">
            <div className="p-4">
              <nav>
                <ul className="flex flex-col gap-3 text-gray-700">
                  <li>
                    <a href="#home" className="block px-1 py-1 hover:text-gray-900">Home</a>
                  </li>
                  
                  <li>
                    <a href="#portfolio" className="block px-1 py-1 hover:text-gray-900">Portfolio</a>
                  </li>
                  <li>
                    <a href="#blog" className="block px-1 py-1 hover:text-gray-900">Blog</a>
                  </li>
                  <li>
                    <a href="#contact" className="block px-1 py-1 hover:text-gray-900">Contact</a>
                  </li>
                </ul>
              </nav>
              <div className="mt-4 flex items-center gap-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white border border-blue-600 rounded-none">
                  Pitch Us
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-900 bg-white hover:bg-gray-50 rounded-none">
                  LPs
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}