import { Navbar, Nav, Container } from "react-bootstrap";
import { Brand } from "../Brand";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container fluid>
        <Brand />
        <Navbar.Toggle aria-controls="main-navigation" />

        <Navbar.Collapse id="main-navigation" className="justify-content-center">
          <Nav className="gap-lg-3">
            <NavLink
              to="/composers"
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-primary fw-bold"
                  : "nav-link text-dark"
              }
            >
              Compositores
            </NavLink>
            <NavLink
              to="/works"
              className={({ isActive }) =>
                isActive
                  ? "nav-link text-primary fw-bold"
                  : "nav-link text-dark"
              }
            >
              Peças
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
