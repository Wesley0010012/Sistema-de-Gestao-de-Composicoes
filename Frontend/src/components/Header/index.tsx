import { Navbar, Nav, Container } from "react-bootstrap";
import { Brand } from "../Brand";
import { NavLink, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth/auth";

export default function Header() {
  const { pathname } = useLocation();
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const shouldShowAdminSections =
    isAdminPage && !isLoginPage && isAuthenticated();

  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container fluid>
        <Brand />

        {shouldShowAdminSections && (
          <>
            <Navbar.Toggle aria-controls="main-navigation" />

            <Navbar.Collapse id="main-navigation" className="justify-content-center">
              <Nav className="gap-lg-3">
                <NavLink
                  to="/admin/composers"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-primary fw-bold"
                      : "nav-link text-dark"
                  }
                >
                  Compositores
                </NavLink>
                <NavLink
                  to="/admin/works"
                  className={({ isActive }) =>
                    isActive
                      ? "nav-link text-primary fw-bold"
                      : "nav-link text-dark"
                  }
                >
                  Obras
                </NavLink>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}
