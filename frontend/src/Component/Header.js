import React from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import "../my.css";
import { logout } from "../redux/actions/UserAction";
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <Navbar bg="primary" expand="lg">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand className="nav-color">CheapGoods</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <LinkContainer to="/">
              <Nav.Link className="nav-color">
                <i className="fa-solid fa-house"></i> Home
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown
                className="nav-color"
                title={
                  <span>
                    <i className="fa-solid fa-user"></i> 
                    {userInfo.name}
                  </span>
                }
                id="username"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item className="text-dark">
                    Profil
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item className="text-dark" onClick={logoutHandler}>
                  Çıkış
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link className="nav-color">
                    <i className="fa-solid fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link className="nav-color">
                    <i className="fa-solid fa-user-plus"></i> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>{" "}
          <LinkContainer to="/cart" className="px-2">
            <Nav.Link className="nav-color">
              <i className="fa-solid fa-shopping-cart"></i> 
            Cart
            </Nav.Link>
          </LinkContainer>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="light">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
