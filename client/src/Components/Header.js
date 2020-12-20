import React from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Route } from "react-router";
import { LinkContainer } from "react-router-bootstrap";
import SearchBox from "./SearchBox";
const Header = ({ history, match }) => {
  let filter = match && match.params ? match.params.filter : "";
  const sort = match && match.params ? match.params.sort : "";

  const sortAscending = () => {
    document.location.href = !filter
      ? `/notes/search/sort/asc`
      : `/notes/search/${filter}/sort/asc`;
  };
  const sortDescending = () => {
    document.location.href = !filter
      ? `/notes/search/sort/desc`
      : `/notes/search/${filter}/sort/desc`;
  };
  const weeklyFilter = () => {
    filter = "week";
    document.location.href = !sort
      ? `/notes/search/${filter}`
      : `/notes/search/${filter}/sort/${sort}`;
  };
  const monthlyFilter = () => {
    filter = "month";
    document.location.href = !sort
      ? `/notes/search/${filter}`
      : `/notes/search${filter}/sort/${sort}`;
  };
  const yearlyFilter = () => {
    filter = "year";
    document.location.href = !sort
      ? `/notes/search/${filter}`
      : `/notes/search/${filter}/sort/${sort}`;
  };
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
            <LinkContainer to="/">
              <Navbar.Brand className="p-3">
                <i
                  className="fas fa-journal-whills"
                  style={{ fontSize: 50, outline: "none" }}
                ></i>{" "}
                Dear-Diary
              </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Route render={({ history }) => <SearchBox history={history} />} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link eventKey="1">
                  <NavDropdown title="Filter" id="filter">
                    <NavDropdown.Item onClick={weeklyFilter}>
                      Weekly
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={monthlyFilter}>
                      Monthly
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={yearlyFilter}>
                      Yearly
                    </NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Sort" id="sort">
                    <NavDropdown.Item onClick={sortAscending}>
                      Oldest First
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={sortDescending}>
                      Newest First
                    </NavDropdown.Item>
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
