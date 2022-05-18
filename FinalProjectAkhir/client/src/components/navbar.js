import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { unauthenticateUser } from "../redux/slices/authSlice";
import { onLogout } from "../api/auth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NavBars = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuthenticated");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img
              src={require("../assets/logo.png")}
              alt="Logo"
              width="100%"
              height="50"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {isAuth ? (
              <div>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/dashboard">
                    Dashboard
                  </Nav.Link>
                  <Nav.Link as={Link} to="/barang">
                    Barang
                  </Nav.Link>
                  <Nav.Link as={Link} to="/barang-masuk">
                    Barang Masuk
                  </Nav.Link>
                  <Nav.Link as={Link} to="/barang-keluar">
                    Barang Keluar
                  </Nav.Link>
                  <Nav.Link as={Link} to="/users">
                    User
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link>
                    <button onClick={() => logout()} class="btn btn-danger">
                      Logout
                    </button>
                  </Nav.Link>
                </Nav>
              </div>
            ) : (
              <div>
                {/* <Nav>
                  <Nav.Link as={Link} to="/login">
                    Login
                  </Nav.Link>
                </Nav> */}
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBars;
