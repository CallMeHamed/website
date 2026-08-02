import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';
import TEXT from "./Text.jsx";
import Logo from "../../Images/logo.png";

function Header({ onHomeClick, onNavigate }) {
  const links = [
    { key: 'home', label: TEXT.header.home, action: () => onHomeClick?.() },
    { key: 'about', label: TEXT.header.about, action: () => onNavigate?.('about') },
    { key: 'services', label: TEXT.header.services, action: () => onNavigate?.('services') },
    { key: 'contact', label: TEXT.header.contact, action: () => onNavigate?.('contact') },
    { key: 'admin', label: TEXT.header.login, action: () => onNavigate?.('admin') },
  ];

  return (
    <header className="header-shell">
      <nav className="navbar navbar-expand-lg header-navbar sticky-top" dir="rtl">
        <div className="container">
          <button
            className="navbar-toggler header-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <button
            type="button"
            className="navbar-brand header-brand-btn"
            onClick={() => onHomeClick?.()}
          >
            <span>{TEXT.appName}</span>
            <img src={Logo} alt="Logo" />
          </button>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav header-nav-list">
              {links.map((link) => (
                <li className="nav-item" key={link.key}>
                  <button type="button" className="nav-link header-nav-link" onClick={link.action}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="offcanvas offcanvas-end header-offcanvas" tabIndex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">القائمة</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav header-nav-list mobile-nav-list">
            {links.map((link) => (
              <li className="nav-item" key={link.key}>
                <button type="button" className="nav-link header-nav-link" onClick={link.action}>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
