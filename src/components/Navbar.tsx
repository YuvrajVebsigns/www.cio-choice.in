'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const lastScrollY = useRef(0);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isServicesPage =
    pathname === '/survey-study' ||
    pathname === '/videos' ||
    pathname === '/bespoke-events' ||
    pathname === '/social-media' ||
    pathname === '/events' ||
    pathname === '/dialoges';

  const openServices = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
      servicesCloseTimer.current = null;
    }

    setServicesOpen(true);
  };

  const closeServices = () => {
    if (servicesCloseTimer.current) {
      clearTimeout(servicesCloseTimer.current);
    }

    servicesCloseTimer.current = setTimeout(() => {
      setServicesOpen(false);
      servicesCloseTimer.current = null;
    }, 140);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setServicesOpen(false);
    setIsHidden(false);
  };

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;

      if (Math.abs(diff) < 8) return;

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }

      if (diff < 0) {
        setIsHidden(false);
      }

      if (diff > 0 && currentScrollY > 140 && !mobileOpen) {
        hideTimer.current = setTimeout(() => {
          setIsHidden(true);
        }, 180);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      if (servicesCloseTimer.current) {
        clearTimeout(servicesCloseTimer.current);
      }
    };
  }, [mobileOpen]);

  return (
    <header
      className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
    >
      <div className="navbar-container">
        <Link href="/" className="navbar-logo" onClick={closeMobileMenu}>
          <Image src="/assets/logo/logo.png" alt="CORE Media" width={150} height={100} priority />
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
            className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}
            onMouseEnter={openServices}
            onMouseLeave={closeServices}
          >
            <button
              type="button"
              className={`nav-link ${isServicesPage ? 'active' : ''}`}
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((s) => !s)}
            >
              Services
              <ChevronDown
                size={16}
                style={{
                  transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: '0.3s ease',
                }}
              />
            </button>

            <div className="mega-panel" onMouseEnter={openServices} onMouseLeave={closeServices}>
              <div className="mega-column">
                <ul>
                  <li>
                    <Link href="/survey-study" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Survey / Study</span>
                    </Link>
                  </li>

                  <li>
                    <Link href="/video" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Videos</span>
                    </Link>
                  </li>

                  <li>
                    <Link href="/bespoke-events" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Bespoke Events</span>
                    </Link>
                  </li>

                  <li>
                    <Link href="/social-media" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Social Media</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Link
            href="/blog"
            className={`nav-link ${pathname === '/blog' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Blog
          </Link>

          <Link
            href="/events"
            className={`nav-link ${pathname === '/events' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Event
          </Link>
          <Link
            href="/videos"
            className={`nav-link ${pathname === '/videos' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Video
          </Link>

          <Link
            href="/register"
            className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Registration
          </Link>
          <Link href="/nominate" className="nav-link" onClick={() => setMobileOpen(false)}>
            Nomination
          </Link>

          <Link href="/contact" className="nav-link" onClick={closeMobileMenu}>
            Contact
          </Link>
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
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </div>
    </header>
  );
}
