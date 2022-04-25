import React, { Fragment } from "react";
import {
  Navbar,
  Container,
  NavbarToggler,
  Col,
  Collapse,
  Nav,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "./auth/LoginModal";

// 크롬확장자 page Ruler Redux설치하여 웹의 픽셀을 구할 수 있다.
const AppNavbar = () => {
  return (
    <Fragment>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            개발블로그
          </Link>
          <NavbarToggler />
          <Collapse isOpen={true} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {false ? (
                <h1 className="text-white">authLink</h1>
              ) : (
                <>
                  <h1 className="text-white"></h1>
                  <LoginModal></LoginModal>
                </>
              )}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavbar;
