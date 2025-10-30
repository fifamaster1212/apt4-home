import { ArrowUp, Linkedin, Instagram, Mail, ArrowRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';

export function Footer() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    // Basic validation with friendly messages aligned to site tone
    if (!trimmedEmail.includes('@')) {
      setEmailError("Please include an '@' in the email address.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setEmailError('Enter a valid email address (e.g., name@company.com).');
      return;
    }

    setEmailError(null);
    // Simulate successful subscribe
    setIsSubscribed(true);
    setEmail('');
  };

  useEffect(() => {
    if (!isSubscribed) return;
    const timeoutId = window.setTimeout(() => {
      setIsSubscribed(false);
    }, 1000);
    return () => window.clearTimeout(timeoutId);
  }, [isSubscribed]);

  return (
    <footer className="bg-gray-100 text-gray-700 mt-8">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-libre font-semibold tracking-tight text-black">APT4 Ventures</h3>
            <p className="text-xs text-gray-600">
              Partnering with exceptional founders to build the future of technology
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://www.linkedin.com/company/rolodex-education"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.instagram.com/cosmonos.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="mailto:support@cosmonos.com"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (trimmed to avoid broken routes) */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-2 text-sm">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="#contact" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#top" className="text-xs text-gray-600 hover:text-gray-900 transition-colors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Back to Top
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-2 text-sm">Resources</h4>
            <ul className="space-y-1">
              <li>
                <a href="#faq" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="/blog" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#help-center" className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-2 text-sm">Stay Updated</h4>
            <p className="text-xs text-gray-600 mb-2">
              Get the latest venture capital insights and portfolio updates.
            </p>
            <form className="space-y-1" onSubmit={handleNewsletterSubmit}>
              <div className="flex">
                <input
                  type="email"
                  value={isSubscribed ? '' : email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError(null);
                  }}
                  placeholder={isSubscribed ? 'Subscribed!' : 'Enter your email'}
                  aria-invalid={emailError ? 'true' : 'false'}
                  aria-describedby={emailError ? 'newsletter-email-error' : undefined}
                  disabled={isSubscribed}
                  className={
                    "flex-1 px-3 py-2 text-xs focus:outline-none focus:ring-1 border " +
                    (isSubscribed
                      ? "bg-green-600 text-white placeholder-white border-green-600 focus:ring-green-500"
                      : "bg-white text-gray-900 border-gray-300 focus:ring-gray-400") +
                    (emailError ? " border-red-500 focus:ring-red-400" : "")
                  }
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={
                    "px-3 py-2 transition-colors border border-l-0 " +
                    (isSubscribed
                      ? "bg-green-700 text-white hover:bg-green-700 border-green-600"
                      : "bg-gray-900 text-white hover:bg-gray-800 border-gray-300")
                  }
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {emailError && (
                <p id="newsletter-email-error" className="text-xs text-red-600">
                  {emailError}
                </p>
              )}
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 py-3">
      <div className="relative flex items-center justify-between">
        
        {/* Left: Copyright */}
        <div className="text-xs text-gray-600">
          © {currentYear} APT4 Ventures. All rights reserved.
        </div>

        {/* Center: Policies (absolute center) */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4">
          <a
            href="#privacy"
            onClick={(e) => e.preventDefault()}
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#terms"
            onClick={(e) => e.preventDefault()}
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#cookies"
            onClick={(e) => e.preventDefault()}
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
          >
            Cookie Policy
          </a>
        </div>

        {/* Right: Scroll button */}
        <button
          onClick={scrollToTop}
          className="bg-gray-200 p-1.5 rounded hover:bg-gray-300 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
    </footer>
  );
}