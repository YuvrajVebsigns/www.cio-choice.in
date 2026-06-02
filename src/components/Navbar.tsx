// 'use client';

// import Link from 'next/link';
// import Image from 'next/image';
// import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
// import { useEffect, useRef, useState } from 'react';

// export default function Navbar() {
//   const [isHidden, setIsHidden] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const openServices = () => {
//     if (servicesCloseTimer.current) {
//       clearTimeout(servicesCloseTimer.current);
//       servicesCloseTimer.current = null;
//     }

//     setServicesOpen(true);
//   };

//   const closeServices = () => {
//     if (servicesCloseTimer.current) {
//       clearTimeout(servicesCloseTimer.current);
//     }

//     servicesCloseTimer.current = setTimeout(() => {
//       setServicesOpen(false);
//       servicesCloseTimer.current = null;
//     }, 140);
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         // Scrolling down
//         setIsHidden(true);
//       } else {
//         // Scrolling up
//         setIsHidden(false);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);

//       if (servicesCloseTimer.current) {
//         clearTimeout(servicesCloseTimer.current);
//       }
//     };
//   }, [lastScrollY]);

//   return (
//     <header
//       className={`navbar ${isHidden ? 'navbar-hide' : ''} ${mobileOpen ? 'mobile-open' : ''}`}
//     >
//       <div className="navbar-container">
//         {/* Logo */}
//         <Link href="/" className="navbar-logo">
//           <Image src="/assets/logo/logo.png" alt="CORE Media" width={150} height={100} priority />
//         </Link>

//         {/* Nav Links */}
//         <nav className={`navbar-menu ${mobileOpen ? 'open' : ''}`}>
//           <Link href="/" className="nav-link active">
//             Home
//           </Link>

//           {/* <div className="nav-dropdown"> */}
//           {/* <button className="nav-link">
//               Pages
//               <ChevronDown size={16} />
//             </button> */}
//           {/* Mega panel */}
//           {/* <div className="mega-panel">
//               <div className="mega-inner"> */}
//           {/* COLUMN 1 */}
//           {/* <div className="mega-column">
//                   <h4>Main Pages</h4>

//                   <ul>
//                     <li>
//                       <a href="#">About us</a>
//                     </li>
//                     <li>
//                       <a href="#">Our history</a>
//                     </li>
//                     <li>
//                       <a href="#">Feedbacks</a>
//                     </li>
//                     <li>
//                       <a href="#">Contact</a>
//                     </li>
//                   </ul>
//                 </div> */}

//           {/* COLUMN 2 */}
//           {/* <div className="mega-column">
//                   <h4>Other Pages</h4>

//                   <ul>
//                     <li>
//                       <a href="#">Services</a>
//                     </li>

//                     <li>
//                       <a href="#">Blog details</a>
//                     </li>
//                     <li>
//                       <a href="#">Term & conditions</a>
//                     </li>
//                   </ul>
//                 </div> */}

//           {/* RIGHT RED CARD */}
//           {/* <div className="mega-right-card">
//                   <div className="mega-card-inner">
//                     <div>
//                       <div className="mega-blog-tag">Latest Blog</div>

//                       <h2 className="mega-blog-title">
//                         Modern <br />
//                         Home Makeover
//                       </h2>

//                       <p className="mega-blog-text">
//                         Discover premium interior inspiration, architecture ideas, and elegant
//                         modern living concepts for your next project.
//                       </p>
//                     </div>

//                     <a href="#" className="mega-blog-btn">
//                       Get in touch
//                     </a>
//                   </div>
//                 </div> */}
//           {/* </div>
//             </div> */}
//           {/* </div> */}

//           <div
//             className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}
//             onMouseEnter={openServices}
//             onMouseLeave={closeServices}
//           >
//             <button
//               type="button"
//               className="nav-link"
//               aria-expanded={servicesOpen}
//               onClick={openServices}
//             >
//               Services
//               <ChevronDown size={16} />
//             </button>
//             {/* Mega panel for Services */}
//             <div className="mega-panel" onMouseEnter={openServices} onMouseLeave={closeServices}>
//               <div className="mega-column">
//                 {/* <h4>Our Services</h4> */}
//                 <ul>
//                   {/* <li>
//                     <Link href="/survey" className="mega-item">
//                       <span className="mega-icon" aria-hidden />
//                       <span>Survey</span>
//                     </Link>
//                   </li> */}
//                   <li>
//                     <Link
//                       href="/videos"
//                       className="mega-item"
//                       onClick={() => setServicesOpen(false)}
//                     >
//                       <span className="mega-icon" aria-hidden />
//                       <span>Video</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/events"
//                       className="mega-item"
//                       onClick={() => setServicesOpen(false)}
//                     >
//                       <span className="mega-icon" aria-hidden />
//                       <span> Events</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       href="/dialoges"
//                       className="mega-item"
//                       onClick={() => setServicesOpen(false)}
//                     >
//                       <span className="mega-icon" aria-hidden />
//                       <span>Dialogues</span>
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <Link href="/blog" className="nav-link" onClick={() => setMobileOpen(false)}>
//             Blog
//           </Link>
//           <Link href="/register" className="nav-link" onClick={() => setMobileOpen(false)}>
//             Registration
//           </Link>
//           <Link href="/nominate" className="nav-link" onClick={() => setMobileOpen(false)}>
//             Nominate
//           </Link>
//           <Link href="/#contact-section" className="nav-link" onClick={() => setMobileOpen(false)}>
//             Contact
//           </Link>
//         </nav>

//         {/* Right Side */}
//         <div className="navbar-actions">
//           {/* Search */}
//           {/* <button className="search-btn">
//             <Search size={20} strokeWidth={2} />
//           </button> */}

//           {/* CTA */}
//           <Link href="/#contact-section" className="talk-btn">
//             <span>Let’s Talk</span>

//             <div className="talk-btn-icon">
//               <ArrowUpRight size={18} />
//             </div>
//           </Link>

//           {/* Mobile Menu */}
//           <button
//             className={`menu-btn ${mobileOpen ? 'open' : ''}`}
//             aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
//             aria-expanded={mobileOpen}
//             onClick={() => setMobileOpen((s) => !s)}
//           >
//             {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }

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
    pathname === '/videos' || pathname === '/events' || pathname === '/dialoges';

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
                    <Link href="/videos" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Video</span>
                    </Link>
                  </li>

                  <li>
                    <Link href="/events" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Events</span>
                    </Link>
                  </li>

                  <li>
                    <Link href="/dialoges" className="mega-item" onClick={closeMobileMenu}>
                      <span className="mega-icon" aria-hidden />
                      <span>Dialogues</span>
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
            href="/register"
            className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Registration
          </Link>

          <Link
            href="/nominate"
            className={`nav-link ${pathname === '/nominate' ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Nominate
          </Link>

          <Link href="/#contact-section" className="nav-link" onClick={closeMobileMenu}>
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
