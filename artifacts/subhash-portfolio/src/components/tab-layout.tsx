import { useEffect, useState, ReactNode } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X, MapPin } from 'lucide-react';
import { SmoothScrollProvider } from '@/components/motion/smooth-scroll';
import { AmbientScene } from '@/components/motion/ambient-scene';

export const navItems = [
  { label: 'About', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Experience', path: '/experience' },
  { label: 'Resume', path: '/resume' },
];

interface TabLayoutProps {
  children: ReactNode;
}

export function TabLayout({ children }: TabLayoutProps) {
  const [location, setLocation] = useLocation();
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('subhash-theme');
    return saved !== 'light';
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('subhash-theme', dark ? 'dark' : 'light');
  }, [dark]);

  const activeIndex = navItems.findIndex((item) => item.path === location);
  const currentNavIndex = activeIndex === -1 ? 0 : activeIndex;

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold && currentNavIndex < navItems.length - 1) {
      setLocation(navItems[currentNavIndex + 1].path);
    } else if (info.offset.x > swipeThreshold && currentNavIndex > 0) {
      setLocation(navItems[currentNavIndex - 1].path);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const handleLetsTalkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    closeMenu();
    if (location === '/' || location === '') {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setLocation('/');
      window.setTimeout(() => {
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <SmoothScrollProvider>
      <div className="portfolio-shell">
        {/* Layered 4-Depth Ambient Scene */}
        <AmbientScene />

        {/* Floating Glass Header */}
        <header className="site-header glass-header">
        <Link className="brand-mark" href="/" data-testid="link-home">
          <span className="brand-symbol">S</span>
          <span>SUBHASH<br /><em>MAURYA</em></span>
        </Link>

        <nav className={`main-nav glass-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path === '/' && location === '');
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`nav-link-item ${isActive ? 'active' : ''}`}
                onClick={closeMenu}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="active-nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          {/* Mobile Drawer "Let's Talk" Button */}
          <a
            className="mobile-nav-talk-btn glass-btn"
            href="/#contact"
            onClick={handleLetsTalkClick}
            data-testid="link-mobile-drawer-talk"
          >
            Let&apos;s talk <ArrowUpRight size={16} />
          </a>
        </nav>

        <div className="header-actions">
          {/* Dual Theme Toggle Button (Dark Default / Crisp White Light) */}
          <button
            className="theme-toggle glass-action-btn"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            data-testid="button-theme-toggle"
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
            <span>{dark ? 'Light' : 'Dark'}</span>
          </button>

          {/* Desktop & Header "Let's Talk" CTA */}
          <a
            className="header-contact glass-talk-btn"
            href="/#contact"
            onClick={handleLetsTalkClick}
            data-testid="link-header-contact"
          >
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>

          {/* Mobile Hamburger Drawer Toggle */}
          <button
            className="menu-toggle glass-action-btn"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-menu-toggle"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Page Content Viewport */}
      <motion.main
        key={location}
        className="page-transition-frame"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={handleDragEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="page-content-wrapper"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>

      {/* Unified Dark Glass Footer */}
      <footer className="workspace-footer glass-footer footer-dark-mode">
        <div className="footer-inner">
          <div className="footer-status">
            <span className="status-dot" />
            <span>Open to Founder&apos;s Office, SDE-1 &amp; Product Engineering roles</span>
          </div>
          <div className="footer-meta">
            <span><MapPin size={13} /> Bangalore, India (IST UTC+5:30)</span>
            <span>© {new Date().getFullYear()} Subhash Maurya</span>
          </div>
        </div>
      </footer>
    </div>
  </SmoothScrollProvider>
);
}
