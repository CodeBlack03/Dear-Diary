import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Route } from "react-router";

import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
const Header = ({ history, match }) => {
  return (
    <>
      <header>
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          // collapseOnSelect
          className="justify-content-space-evenly"
        >
          <Container>
            <LinkContainer to="/" style={{ outline: "none" }}>
              <Navbar.Brand className="p-3">
                <i
                  className="fas fa-journal-whills"
                  style={{ fontSize: 50, outline: "none" }}
                ></i>{" "}
                Dear-Diary
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Navbar.Collapse id="basic-navbar-nav" style={{ outline: "none" }}>
              <Nav className="ml-auto" style={{ outline: "none" }}>
                <Nav.Link eventKey="1" style={{ outline: "none" }}>
                  <NavDropdown
                    title="Filter"
                    id="filter"
                    style={{ outline: "none" }}
                  >
                    <LinkContainer
                      to="/notes/search/week"
                      style={{ outline: "none" }}
                    >
                      <NavDropdown.Item>Weekly</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer
                      to="/notes/search/month"
                      style={{ outline: "none" }}
                    >
                      <NavDropdown.Item>Monthly</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      to="/notes/search/year"
                      style={{ outline: "none" }}
                    >
                      <NavDropdown.Item>Yearly</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown
                    title="Sort"
                    id="sort"
                    style={{ outline: "none" }}
                  >
                    <LinkContainer
                      to="/notes/search/sort/asc"
                      style={{ outline: "none" }}
                    >
                      <NavDropdown.Item>Oldest First</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer
                      to="/notes/search/sort/desc"
                      style={{ outline: "none" }}
                    >
                      <NavDropdown.Item>Newest First</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
