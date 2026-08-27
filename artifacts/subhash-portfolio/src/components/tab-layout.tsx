import { useEffect, useState, ReactNode } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ArrowUpRight, Menu, Moon, Sun, X, MapPin } from 'lucide-react';

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
  const [dark, setDark] = useState(() => localStorage.getItem('subhash-theme') === 'dark');
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

  // Footer theme contrast rule:
  // On Home page: Light Mode -> Light Footer (to alternate with Dark Contact Section above it).
  // On Other pages: Light Mode -> Dark Footer (to alternate with Light Page Body above it).
  const isHomePage = location === '/' || location === '';
  const footerThemeClass = isHomePage
    ? dark
      ? 'footer-dark-mode'
      : 'footer-home-light'
    : dark
    ? 'footer-other-dark'
    : 'footer-other-light';

  return (
    <div className="portfolio-shell">
      <div className="grain" aria-hidden="true" />

      {/* Sleek Original Header */}
      <header className="site-header">
        <Link className="brand-mark" href="/" data-testid="link-home">
          <span className="brand-symbol">S</span>
          <span>SUBHASH<br /><em>MAURYA</em></span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path === '/' && location === '');
            return (
              <Link
                key={item.path}
                href={item.path}
                className={isActive ? 'active' : ''}
                onClick={closeMenu}
                data-testid={`link-nav-${item.label.toLowerCase()}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="header-actions">
          {/* Theme Toggle Button: Light Theme displays Light icon/label, Dark Theme displays Dark icon/label */}
          <button
            className="theme-toggle"
            onClick={() => setDark((value) => !value)}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
            data-testid="button-theme-toggle"
          >
            {!dark ? <Sun size={16} /> : <Moon size={16} />}
            <span>{!dark ? 'Light' : 'Dark'}</span>
          </button>
          
          <a
            className="header-contact"
            href="#contact"
            onClick={handleLetsTalkClick}
            data-testid="link-header-contact"
          >
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            data-testid="button-menu-toggle"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="page-content-wrapper"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </motion.main>

      {/* Dynamic Contrast Inverted Footer */}
      <footer className={`workspace-footer ${footerThemeClass}`}>
        <div className="footer-inner">
          <div className="footer-status">
            <span className="status-dot" />
            <span>Available for SDE / Mobile / Full-stack roles</span>
          </div>
          <div className="footer-meta">
            <span><MapPin size={13} /> Bhopal, MP (IST UTC+5:30)</span>
            <span>© {new Date().getFullYear()} Subhash Maurya</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
