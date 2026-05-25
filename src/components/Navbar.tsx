'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, Menu, ChevronDown, ArrowUpRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsHidden(true);
      } else {
        // Scrolling up
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`navbar ${isHidden ? 'navbar-hide' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image src="/assets/logo/logo.png" alt="CORE Media" width={150} height={100} priority />
        </Link>

        {/* Nav Links */}
        <nav className="navbar-menu">
          <Link href="/" className="nav-link active">
            Home
          </Link>

          <div className="nav-dropdown">
            <button className="nav-link">
              Pages
              <ChevronDown size={16} />
            </button>
            {/* Mega panel */}
            <div className="mega-panel">
              <div className="mega-inner">
                {/* COLUMN 1 */}
                <div className="mega-column">
                  <h4>Main Pages</h4>

                  <ul>
                    <li>
                      <a href="#">About us</a>
                    </li>
                    <li>
                      <a href="#">Our history</a>
                    </li>
                    <li>
                      <a href="#">Feedbacks</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>

                {/* COLUMN 2 */}
                <div className="mega-column">
                  <h4>Other Pages</h4>

                  <ul>
                    <li>
                      <a href="#">Services</a>
                    </li>

                    <li>
                      <a href="#">Blog details</a>
                    </li>
                    <li>
                      <a href="#">Term & conditions</a>
                    </li>
                  </ul>
                </div>

                {/* RIGHT RED CARD */}
                <div className="mega-right-card">
                  <div className="mega-card-inner">
                    <div>
                      <div className="mega-blog-tag">Latest Blog</div>

                      <h2 className="mega-blog-title">
                        Modern <br />
                        Home Makeover
                      </h2>

                      <p className="mega-blog-text">
                        Discover premium interior inspiration, architecture ideas, and elegant
                        modern living concepts for your next project.
                      </p>
                    </div>

                    <a href="#" className="mega-blog-btn">
                      Get in touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="nav-dropdown">
            <button className="nav-link">
              Services
              <ChevronDown size={16} />
            </button>
            {/* Mega panel for Services */}
            <div className="mega-panel">
              <div className="mega-column">
                {/* <h4>Our Services</h4> */}
                <ul>
                  <li>
                    <Link href="/services/survey" className="mega-item">
                      <span className="mega-icon" aria-hidden />
                      <span>Survey</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/video" className="mega-item">
                      <span className="mega-icon" aria-hidden />
                      <span>Video</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/events" className="mega-item">
                      <span className="mega-icon" aria-hidden />
                      <span>Bespoke Events</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/social" className="mega-item">
                      <span className="mega-icon" aria-hidden />
                      <span>Social Media</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <Link href="/blog" className="nav-link">
            Blog
          </Link>

          <Link href="/contact" className="nav-link">
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="navbar-actions">
          {/* Search */}
          <button className="search-btn">
            <Search size={20} strokeWidth={2} />
          </button>

          {/* CTA */}
          <Link href="/contact" className="talk-btn">
            <span>Let’s Talk</span>

            <div className="talk-btn-icon">
              <ArrowUpRight size={18} />
            </div>
          </Link>

          {/* Mobile Menu */}
          <button className="menu-btn">
            <Menu size={34} strokeWidth={2} />
          </button>
        </div>
      </div>
    </header>
  );
}
