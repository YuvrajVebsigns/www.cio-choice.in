'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [advisoryOpen, setAdvisoryOpen] = useState(false);
  const [redCarpetOpen, setRedCarpetOpen] = useState(false);
  const [recognizedOpen, setRecognizedOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);
  const [coverageHovered, setCoverageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [winnerHovered, setWinnerHovered] = useState(false);

  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advisoryYears = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ];
  const redCarpetYears = [
    2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ];
  const mediaYears = [2019, 2017];
  const recognizedBrandYears = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ];

  const resetMediaMenu = () => {
    setCoverageHovered(false);
    setWinnerHovered(false);
  };

  const closeMobileMenu = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setMobileOpen(false);
    setAdvisoryOpen(false);
    setRedCarpetOpen(false);
    setRecognizedOpen(false);
    setMediaOpen(false);
    setProcessOpen(false);
    resetMediaMenu();
    setIsHidden(false);
  };

  const openDropdown = (type: 'advisory' | 'redCarpet' | 'recognized' | 'media' | 'process') => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setAdvisoryOpen(type === 'advisory');
    setRedCarpetOpen(type === 'redCarpet');
    setRecognizedOpen(type === 'recognized');
    setMediaOpen(type === 'media');
    setProcessOpen(type === 'process');
    if (type !== 'media') resetMediaMenu();
  };

  const closeDropdowns = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    dropdownTimer.current = setTimeout(() => {
      setAdvisoryOpen(false);
      setRedCarpetOpen(false);
      setRecognizedOpen(false);
      setMediaOpen(false);
      setProcessOpen(false);
      resetMediaMenu();
    }, 140);
  };

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 992);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) < 8) return;
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (diff < 0) setIsHidden(false);

      if (diff > 0 && currentScrollY > 140 && !mobileOpen) {
        hideTimer.current = setTimeout(() => setIsHidden(true), 180);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimer.current) clearTimeout(hideTimer.current);
      if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" onClick={closeMobileMenu}>
          <Image
            src="/assets/logo/Heading.png"
            alt="CORE Media"
            width={150}
            height={100}
            priority
          />
        </Link>

        <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <div
            className={`nav-dropdown advisory-dropdown ${advisoryOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('advisory')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/advisory-panel') ? 'active' : ''}`}
              aria-expanded={advisoryOpen}
              onClick={() => {
                setAdvisoryOpen((s) => !s);
                setRedCarpetOpen(false);
                setRecognizedOpen(false);
                setMediaOpen(false);
              }}
            >
              Advisory Panel
              <ChevronDown
                size={16}
                style={{
                  transform: advisoryOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                {advisoryYears.map((year) => (
                  <li key={year}>
                    <Link
                      href={`/advisory-panel/${year}`}
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      Advisory Panel {year}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`nav-dropdown ${redCarpetOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('redCarpet')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/red-carpet-night') ? 'active' : ''}`}
              aria-expanded={redCarpetOpen}
              onClick={() => {
                setRedCarpetOpen((s) => !s);
                setAdvisoryOpen(false);
                setRecognizedOpen(false);
                setMediaOpen(false);
              }}
            >
              Red Carpet Night
              <ChevronDown
                size={16}
                style={{
                  transform: redCarpetOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                {redCarpetYears.map((year) => (
                  <li key={year}>
                    <Link
                      href={`/red-carpet-night/red-carpet-night-${year}`}
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      Red Carpet Night {year}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`nav-dropdown ${recognizedOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('recognized')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/recognized-brands') ? 'active' : ''}`}
              aria-expanded={recognizedOpen}
              onClick={() => {
                setRecognizedOpen((s) => !s);
                setAdvisoryOpen(false);
                setRedCarpetOpen(false);
                setMediaOpen(false);
                setProcessOpen(false);
              }}
            >
              Recognized Brands
              <ChevronDown
                size={16}
                style={{
                  transform: recognizedOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                {recognizedBrandYears.map((year) => (
                  <li key={year}>
                    <Link
                      href={`/recognized-brands/${year}`}
                      className="mega-item"
                      onClick={closeMobileMenu}
                    >
                      Recognized Brands {year}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={`nav-dropdown ${processOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('process')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname === '/process' || pathname === '/enter' ? 'active' : ''}`}
              aria-expanded={processOpen}
              onClick={() => {
                setProcessOpen((s) => !s);
                setAdvisoryOpen(false);
                setRedCarpetOpen(false);
                setRecognizedOpen(false);
                setMediaOpen(false);
              }}
            >
              Process
              <ChevronDown
                size={16}
                style={{
                  transform: processOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown">
              <ul>
                <li>
                  <Link href="/process-flow" className="mega-item" onClick={closeMobileMenu}>
                    Process and Flow
                  </Link>
                </li>
                <li>
                  <Link href="/enter" className="mega-item" onClick={closeMobileMenu}>
                    Enter
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link href="/blog" className="nav-link" onClick={closeMobileMenu}>
            Blogs
          </Link>

          <Link href="/events" className="nav-link" onClick={closeMobileMenu}>
            Events
          </Link>

          <Link href="/gallery" className="nav-link" onClick={closeMobileMenu}>
            Gallery
          </Link>

          <div
            className={`nav-dropdown media-nav-dropdown ${mediaOpen ? 'open' : ''}`}
            onMouseEnter={() => !isMobile && openDropdown('media')}
            onMouseLeave={() => !isMobile && closeDropdowns()}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/media') ? 'active' : ''}`}
              aria-expanded={mediaOpen}
              onClick={() => {
                setMediaOpen((s) => !s);
                setAdvisoryOpen(false);
                setRedCarpetOpen(false);
                setRecognizedOpen(false);
                if (mediaOpen) resetMediaMenu();
              }}
            >
              Media
              <ChevronDown
                size={16}
                style={{
                  transform: mediaOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel nav-year-dropdown media-mega-panel">
              <ul className="media-main-list">
                <li
                  className="media-menu-item has-flyout-left"
                  onMouseEnter={() => setCoverageHovered(true)}
                  onMouseLeave={() => setCoverageHovered(false)}
                >
                  <span
                    className="mega-item media-menu-label"
                    onClick={() => setCoverageHovered((s) => !s)}
                    onKeyDown={(e) => e.key === 'Enter' && setCoverageHovered((s) => !s)}
                    role="button"
                    tabIndex={0}
                  >
                    <ChevronLeft size={14} />
                    Media Coverage
                  </span>
                  <div
                    className={`media-flyout media-flyout-left ${coverageHovered ? 'visible' : ''}`}
                  >
                    <ul>
                      {mediaYears.map((year) => (
                        <li key={year}>
                          <Link
                            href={`/media/media-coverage/${year}-media-coverage`}
                            className="mega-item"
                            onClick={closeMobileMenu}
                          >
                            Media Coverage {year}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li
                  className="media-menu-item has-flyout-left"
                  onMouseEnter={() => setWinnerHovered(true)}
                  onMouseLeave={() => setWinnerHovered(false)}
                >
                  <span
                    className="mega-item media-menu-label"
                    onClick={() => setWinnerHovered((s) => !s)}
                    onKeyDown={(e) => e.key === 'Enter' && setWinnerHovered((s) => !s)}
                    role="button"
                    tabIndex={0}
                  >
                    <ChevronLeft size={14} />
                    Winning Brand Videos
                  </span>
                  <div
                    className={`media-flyout media-flyout-left ${winnerHovered ? 'visible' : ''}`}
                  >
                    <ul>
                      {mediaYears.map((year) => (
                        <li key={year}>
                          <Link
                            href={`/media/winning-brand-videos/${year}`}
                            className="mega-item"
                            onClick={closeMobileMenu}
                          >
                            {year}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* <Link
            href="/contact"
            className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Contact
          </Link> */}
        </nav>

        <div className="navbar-actions">
          <Link href="/#contact-section" className="talk-btn" onClick={closeMobileMenu}>
            <span>Let’s Talk</span>
            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>

          <button
            className={`menu-btn ${mobileOpen ? 'open' : ''}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((s) => !s);
              setIsHidden(false);
            }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
