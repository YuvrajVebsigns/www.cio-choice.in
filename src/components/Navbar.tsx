'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type DropdownName = 'advisory' | 'redCarpet' | 'recognized' | 'process' | 'gallery' | 'media';

export default function Navbar() {
  const pathname = usePathname();

  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [advisoryOpen, setAdvisoryOpen] = useState(false);
  const [redCarpetOpen, setRedCarpetOpen] = useState(false);
  const [recognizedOpen, setRecognizedOpen] = useState(false);
  const [processOpen, setProcessOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  const [photoGalleryOpen, setPhotoGalleryOpen] = useState(false);

  const [coverageOpen, setCoverageOpen] = useState(false);

  const [winnerOpen, setWinnerOpen] = useState(false);

  const lastScrollY = useRef(0);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advisoryYears = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ];

  const redCarpetYears = [
    2027, 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ];

  const recognizedBrandYears = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ];

  const photoGalleryYears = [
    2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013,
  ];

  const mediaCoverageYears = [2024, 2023, 2021, 2020, 2019, 2018, 2017];

  const winningBrandYears = [2019, 2017];

  function resetNestedMenus() {
    setPhotoGalleryOpen(false);
    setCoverageOpen(false);
    setWinnerOpen(false);
  }

  function closeAllDropdowns() {
    setAdvisoryOpen(false);
    setRedCarpetOpen(false);
    setRecognizedOpen(false);
    setProcessOpen(false);
    setGalleryOpen(false);
    setMediaOpen(false);

    resetNestedMenus();
  }

  function getDropdownState(name: DropdownName) {
    switch (name) {
      case 'advisory':
        return advisoryOpen;

      case 'redCarpet':
        return redCarpetOpen;

      case 'recognized':
        return recognizedOpen;

      case 'process':
        return processOpen;

      case 'gallery':
        return galleryOpen;

      case 'media':
        return mediaOpen;

      default:
        return false;
    }
  }

  function openDropdown(name: DropdownName) {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
    }

    setAdvisoryOpen(name === 'advisory');
    setRedCarpetOpen(name === 'redCarpet');
    setRecognizedOpen(name === 'recognized');
    setProcessOpen(name === 'process');
    setGalleryOpen(name === 'gallery');
    setMediaOpen(name === 'media');

    if (name !== 'gallery') {
      setPhotoGalleryOpen(false);
    }

    if (name !== 'media') {
      setCoverageOpen(false);
      setWinnerOpen(false);
    }
  }

  function toggleDropdown(name: DropdownName) {
    const isCurrentlyOpen = getDropdownState(name);

    closeAllDropdowns();

    if (!isCurrentlyOpen) {
      openDropdown(name);
    }
  }

  function handleDropdownClick(name: DropdownName) {
    if (isMobile) {
      toggleDropdown(name);
      return;
    }

    openDropdown(name);
  }

  function scheduleDropdownClose() {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
    }

    dropdownTimer.current = setTimeout(() => {
      closeAllDropdowns();
    }, 150);
  }

  function closeMobileMenu() {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
    }

    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }

    setMobileOpen(false);
    setIsHidden(false);
    closeAllDropdowns();
  }

  useEffect(() => {
    function updateScreenSize() {
      const mobile = window.innerWidth <= 992;

      setIsMobile(mobile);

      if (!mobile) {
        setMobileOpen(false);
      }
    }

    updateScreenSize();

    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  useEffect(() => {
    closeMobileMenu();
    // Close menu whenever route changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      if (Math.abs(difference) < 8) {
        return;
      }

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      if (difference < 0) {
        setIsHidden(false);
      }

      if (difference > 0 && currentScrollY > 140 && !mobileOpen) {
        hideTimer.current = setTimeout(() => {
          setIsHidden(true);
        }, 180);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }

      if (dropdownTimer.current) {
        clearTimeout(dropdownTimer.current);
      }
    };
  }, [mobileOpen]);

  return (
    <header
      className={['navbar', isHidden ? 'navbar-hide' : '', mobileOpen ? 'mobile-open' : '']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="navbar-container">
        <Link
          href="/"
          className="navbar-logo"
          onClick={closeMobileMenu}
          aria-label="CIO Choice home"
        >
          <Image
            src="/assets/logo/Heading.png"
            alt="CIO Choice"
            width={150}
            height={100}
            priority
          />
        </Link>

        <nav className="navbar-menu" aria-label="Main navigation">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <Link
            href="/aboutus"
            className={`nav-link ${pathname?.startsWith('/aboutus') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            About Us
          </Link>

          {/* Advisory Panel */}
          <div
            className={`nav-dropdown advisory-dropdown ${advisoryOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) {
                openDropdown('advisory');
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/advisory-panel') ? 'active' : ''}`}
              aria-expanded={advisoryOpen}
              onClick={() => handleDropdownClick('advisory')}
            >
              <span>Advisory Panel</span>
              <ChevronDown size={16} />
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

          {/* Process */}
          <div
            className={`nav-dropdown ${processOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) {
                openDropdown('process');
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              type="button"
              className={`nav-link ${
                pathname === '/process-flow' || pathname === '/enter' ? 'active' : ''
              }`}
              aria-expanded={processOpen}
              onClick={() => handleDropdownClick('process')}
            >
              <span>Process</span>
              <ChevronDown size={16} />
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

          {/* Red Carpet Night */}
          <div
            className={`nav-dropdown ${redCarpetOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) {
                openDropdown('redCarpet');
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/red-carpet-night') ? 'active' : ''}`}
              aria-expanded={redCarpetOpen}
              onClick={() => handleDropdownClick('redCarpet')}
            >
              <span>Red Carpet Night</span>
              <ChevronDown size={16} />
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

          {/* Recognized Brands */}
          <div
            className={`nav-dropdown ${recognizedOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) {
                openDropdown('recognized');
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/recognized-brands') ? 'active' : ''}`}
              aria-expanded={recognizedOpen}
              onClick={() => handleDropdownClick('recognized')}
            >
              <span>Recognized Brands</span>
              <ChevronDown size={16} />
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
                      {year} Recognized Brands
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Gallery */}
          <div
            className={`nav-dropdown media-nav-dropdown ${galleryOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) {
                openDropdown('gallery');
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/gallery') ? 'active' : ''}`}
              aria-expanded={galleryOpen}
              onClick={() => handleDropdownClick('gallery')}
            >
              <span>Gallery</span>
              <ChevronDown size={16} />
            </button>

            <div className="mega-panel media-mega-panel">
              <ul className="media-main-list">
                <li>
                  <Link
                    href="/gallery/video-gallery"
                    className="mega-item"
                    onClick={closeMobileMenu}
                  >
                    Video Gallery
                  </Link>
                </li>

                <li
                  className="media-menu-item"
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setPhotoGalleryOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setPhotoGalleryOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    className="mega-item media-menu-label"
                    aria-expanded={photoGalleryOpen}
                    onClick={() => {
                      setPhotoGalleryOpen((current) => !current);
                    }}
                  >
                    <span>Photo Gallery</span>

                    <ChevronRight
                      size={15}
                      className={`media-menu-arrow ${photoGalleryOpen ? 'open' : ''}`}
                    />
                  </button>

                  <div
                    className={`media-flyout media-flyout-left ${
                      photoGalleryOpen ? 'visible' : ''
                    }`}
                  >
                    <ul>
                      {photoGalleryYears.map((year) => (
                        <li key={year}>
                          <Link
                            href={`/gallery/photo-gallery/${year}`}
                            className="mega-item"
                            onClick={closeMobileMenu}
                          >
                            Photo Gallery {year}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Media */}
          <div
            className={`nav-dropdown media-nav-dropdown ${mediaOpen ? 'open' : ''}`}
            onMouseEnter={() => {
              if (!isMobile) {
                openDropdown('media');
              }
            }}
            onMouseLeave={() => {
              if (!isMobile) {
                scheduleDropdownClose();
              }
            }}
          >
            <button
              type="button"
              className={`nav-link ${pathname?.startsWith('/media') ? 'active' : ''}`}
              aria-expanded={mediaOpen}
              onClick={() => handleDropdownClick('media')}
            >
              <span>Media</span>
              <ChevronDown size={16} />
            </button>

            <div className="mega-panel media-mega-panel">
              <ul className="media-main-list">
                <li
                  className="media-menu-item"
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setCoverageOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setCoverageOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    className="mega-item media-menu-label"
                    aria-expanded={coverageOpen}
                    onClick={() => {
                      setCoverageOpen((current) => !current);
                      setWinnerOpen(false);
                    }}
                  >
                    <span>Media Coverage</span>

                    <ChevronRight
                      size={15}
                      className={`media-menu-arrow ${coverageOpen ? 'open' : ''}`}
                    />
                  </button>

                  <div
                    className={`media-flyout media-flyout-left ${coverageOpen ? 'visible' : ''}`}
                  >
                    <ul>
                      {mediaCoverageYears.map((year) => (
                        <li key={year}>
                          <Link
                            href={`/media/media-coverage/${year}-media-coverage`}
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

                <li
                  className="media-menu-item"
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setWinnerOpen(true);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setWinnerOpen(false);
                    }
                  }}
                >
                  <button
                    type="button"
                    className="mega-item media-menu-label"
                    aria-expanded={winnerOpen}
                    onClick={() => {
                      setWinnerOpen((current) => !current);
                      setCoverageOpen(false);
                    }}
                  >
                    <span>Winning Brand Videos</span>

                    <ChevronRight
                      size={15}
                      className={`media-menu-arrow ${winnerOpen ? 'open' : ''}`}
                    />
                  </button>

                  <div className={`media-flyout media-flyout-left ${winnerOpen ? 'visible' : ''}`}>
                    <ul>
                      {winningBrandYears.map((year) => (
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

          <Link
            href="/nominate"
            className={`nav-link ${pathname === '/nominate' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Nomination
          </Link>
        </nav>

        <div className="navbar-actions">
          <Link href="/#contact-section" className="talk-btn" onClick={closeMobileMenu}>
            <span>Let’s Talk</span>

            <span className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </span>
          </Link>

          <button
            type="button"
            className="menu-btn"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((current) => !current);
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
