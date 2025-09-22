// src/components/layout/NavBarComponent.jsx
import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/AuthProvider";
import "./navbar.css";
import { FaDoorOpen, FaUser } from "react-icons/fa";
const NavBarComponent = () => {
  const { user, signOut, loading } = useAuth();
  const { cartList = [] } = useSelector((state) => state.cart || { cartList: [] });

  const [expanded, setExpanded] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setExpanded(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY >= 100) setIsFixed(true);
      else if (window.scrollY <= 50) setIsFixed(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMenu = () => setExpanded((e) => !e);
  const closeMenu = () => setExpanded(false);

  const handleLogout = async () => {
    try {
      if (window.confirm("Are you sure you want to log out?")) {
        setLoggingOut(true);
        const { error } = await signOut();
        if (error) console.error(error.message);
        navigate("/login");
      }
    } finally {
      setLoggingOut(false);
    }
  };

  if (loading) return null;

  return (
    <Navbar
      fixed="top"
      expand="md"
      expanded={expanded}
      className={isFixed ? "navbar fixed" : "navbar"}
    >
      <Container className="navbar-container">
        {/* Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={closeMenu}
          className="d-flex align-items-center gap-2"
        >
          <i className="fa-solid fa-xl fa-shopping-bag" style={{ color: "#0f3460" }} />
          <h1 className="logo mb-0">PoshMart</h1>
        </Navbar.Brand>

        {/* Right side (mobile): cart + toggler */}
        <div className="d-flex align-items-center gap-3">
          <Nav.Link
            as={Link}
            to="/cart"
            aria-label="Go to Cart Page"
            className="cart d-md-none"
            data-num={cartList.length}
            onClick={closeMenu}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" className="nav-icon">
              <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
            </svg>
          </Nav.Link>

          <Navbar.Toggle
            aria-controls="primary-navbar"
            onClick={toggleMenu}
            aria-expanded={expanded}
          >
            <span></span><span></span><span></span>
          </Navbar.Toggle>
        </div>

        <Navbar.Collapse id="primary-navbar">
          <Nav className="ms-auto align-items-center" onSelect={closeMenu}>
            {/* Links */}
            <Nav.Item>
              <Nav.Link as={Link} to="/" className="navbar-link" onClick={closeMenu}>
                <span className="nav-link-label">Home</span>
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="ms-2">
              <Nav.Link as={Link} to="/shop" className="navbar-link" onClick={closeMenu}>
                <span className="nav-link-label">Shop</span>
              </Nav.Link>
            </Nav.Item>

            {/* Account Dropdown */}
            <NavDropdown

              title={<FaUser size={25} color="#0f3460" />}
              id="account-dropdown" align="end" className="ms-2">
              {!user ? (
                <>
                  <NavDropdown.Item as={Link} to="/login" onClick={closeMenu}>
                    Login
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/signup" onClick={closeMenu}>
                    Sign Up
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Header>{user.email}</NavDropdown.Header>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} disabled={loggingOut}>
                    {loggingOut ? "Logging out…" : "Logout"} <FaDoorOpen size={20} color="#DC143C" />
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
