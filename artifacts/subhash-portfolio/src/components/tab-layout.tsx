import { useEffect, useState, ReactNode } from 'react';
import { useLocation, Link } from 'wouter';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ArrowUpRight, Menu, Palette, X, MapPin } from 'lucide-react';
import { SmoothScrollProvider, useLenis } from '@/components/motion/smooth-scroll';
import { AmbientScene } from '@/components/motion/ambient-scene';
import { ScrollTrigger } from '@/lib/animations';

export const THEME_PRESETS = [
  { id: 'obsidian', label: 'Obsidian Vermilion', isDark: true, swatches: ['#09090B', '#FF4F18', '#F6F5F1'] },
  { id: 'cobalt', label: 'Midnight Cobalt', isDark: true, swatches: ['#0B1026', '#3B82F6', '#06B6D4'] },
  { id: 'emerald', label: 'Forest Emerald', isDark: true, swatches: ['#071712', '#10B981', '#F59E0B'] },
  { id: 'plum', label: 'Royal Plum', isDark: true, swatches: ['#140B24', '#A855F7', '#F43F5E'] },
  { id: 'alabaster', label: 'Warm Alabaster', isDark: false, swatches: ['#F6F5F1', '#D93D0E', '#09090B'] },
] as const;

export type ThemeId = (typeof THEME_PRESETS)[number]['id'];

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
  return (
    <SmoothScrollProvider>
      <TabLayoutInner>{children}</TabLayoutInner>
    </SmoothScrollProvider>
  );
}

function TabLayoutInner({ children }: TabLayoutProps) {
  const [location, setLocation] = useLocation();
  const { scrollTo } = useLenis();
  const [themeId, setThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('subhash-theme-id') as ThemeId | null;
    if (saved && THEME_PRESETS.some((t) => t.id === saved)) return saved;
    return 'obsidian';
  });
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeTheme = THEME_PRESETS.find((t) => t.id === themeId) ?? THEME_PRESETS[0];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', activeTheme.id);
    document.documentElement.classList.toggle('dark', activeTheme.isDark);
    localStorage.setItem('subhash-theme-id', activeTheme.id);
    localStorage.setItem('subhash-theme', activeTheme.isDark ? 'dark' : 'light');
  }, [activeTheme]);

  useEffect(() => {
    scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => window.clearTimeout(id);
  }, [location]);

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
      scrollTo('#contact', { offset: -88 });
    } else {
      setLocation('/');
      window.setTimeout(() => {
        scrollTo('#contact', { offset: -88 });
      }, 320);
    }
  };

  return (
      <div className="portfolio-shell">
        {/* Layered Ambient Scene */}
        <AmbientScene />

        {/* Floating Glass Header */}
        <header className="site-header glass-header">
        <div className="scroll-progress-bar" aria-hidden="true" />
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
          {/* Multi-Color Theme Switcher */}
          <div className="theme-switcher-wrap">
            <button
              className="theme-toggle glass-action-btn"
              onClick={() => setThemeMenuOpen((o) => !o)}
              aria-label="Switch color theme"
              aria-expanded={themeMenuOpen}
              data-testid="button-theme-toggle"
            >
              <Palette size={14} />
              <span className="theme-swatch-dots" aria-hidden="true">
                {activeTheme.swatches.map((hex) => (
                  <i key={hex} style={{ background: hex }} />
                ))}
              </span>
              <span className="theme-toggle-name">{activeTheme.label.split(' ')[0]}</span>
            </button>

            <AnimatePresence>
              {themeMenuOpen && (
                <motion.div
                  className="theme-popover"
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
                >
                  <div className="theme-popover-head">Select Color Theme</div>
                  {THEME_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      className={`theme-option-btn ${preset.id === activeTheme.id ? 'is-active' : ''}`}
                      onClick={() => {
                        setThemeId(preset.id);
                        setThemeMenuOpen(false);
                      }}
                    >
                      <span className="theme-swatch-dots">
                        {preset.swatches.map((hex) => (
                          <i key={hex} style={{ background: hex }} />
                        ))}
                      </span>
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
  );
}
