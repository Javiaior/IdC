// components/Navbar.js

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Navbar Links */}
        <div className={`links-container ${isMenuOpen ? "open" : ""}`}>
          <ul className="nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/updates">Actualizaciones</Link>
            </li>
            <li>
              <Link href="/athletes">Atletas</Link>
            </li>
            <li>
              <Link href="/events">Eventos</Link>
            </li>
          </ul>
        </div>

        {/* Hamburger Menu Button */}
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
}
