import React from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const navLinks = [
    { path: "/orders", label: "Orders" },
    { path: "/filter", label: "Filter Orders" },
    { path: "/stats", label: "Stats" },
  ];

  return (
    <header className="app-header" style={{ padding: "10px", background: "#333", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div className="header-inner" style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
        <Link to="/orders" className="logo" style={{ color: "#fff", textDecoration: "none", fontSize: "1.5rem", fontWeight: "bold" }}>
          <span className="logo-icon">🍔</span>
          <span className="logo-text"> Food Delivery</span>
        </Link>

        <nav className="nav-links" style={{ display: "flex", gap: "20px" }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: location.pathname === link.path ? "#ffcc00" : "#fff",
                textDecoration: "none",
                fontWeight: location.pathname === link.path ? "bold" : "normal"
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;