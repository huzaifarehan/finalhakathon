import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink, useLocation, Link } from "react-router-dom";
import classes from "./style.module.css";
import { useSelector } from "react-redux";
import { getAuth } from 'firebase/auth'
function NavbarComponent() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [show, setShow] = useState(false);
  const courses = useSelector((state) => state?.CourseReducer?.courses);
  const location = useLocation();

  useEffect(() => {
    let path = location?.pathname?.split("/");
    console.log("path", path);
    if (path?.[1] === "admin" && path?.[2] !== "signin") {
      setShow(true);
      setIsAdmin(true);
    } else if (path?.[1] === "student" && path?.[2] !== "signin") {
      setShow(true);
      setIsAdmin(false);
    } else {
      setShow(false);
      setIsAdmin(false);
    }
  }, []);

  return (
    <Navbar variant="dark"
      className="topbar-bg"
    >
      {!show && (
        <Container>
          <Nav className="m-left">
            <Button variant="light" style={{ margin: "0 10px" }}>
              <Link to="/admin/signin" style={{ textDecoration: "none", color: "#354259" }}>
                Admin Login
              </Link>
            </Button>
          </Nav>

          <Navbar.Brand to="/" as={NavLink}>
            SMIT PORTAL
          </Navbar.Brand>
          <Nav className="m-right">
            <Button variant="light" style={{ margin: "0 10px" }}>
              <Link to="/student/signin" style={{ textDecoration: "none", color: "#354259" }}>
                Signin
              </Link>
            </Button>

            <Button variant="light">
              <Link to="/student/signup" style={{ textDecoration: "none", color: "#354259" }}>
                Signup
              </Link>
            </Button>
          </Nav>
        </Container>
      )}
      {show && isAdmin && (
        <Container>
          <Navbar.Brand to="/" as={NavLink}>
            SMIT ADMIN PORTAL
          </Navbar.Brand>
          <Nav className="m-right">
            <Nav.Link as={NavLink} to="/admin/home" exact>
              Courses
              <span className={classes?.capsule}>{courses.length || 0}</span>
            </Nav.Link>
          </Nav>
          <Button
            className="topbar-bg-light"
            onClick={() => {
              getAuth().signOut().then(() => {
                window.location.replace("/")
              })
            }} >Logout</Button>
        </Container>
      )}
      {show && !isAdmin && (
        <Container>
          <Navbar.Brand to="/" as={NavLink}>
            SMIT STUDENT PORTAL
          </Navbar.Brand>
          <Nav className="m-right">
            <Nav.Link as={NavLink} to="/student/home" exact>
              Courses
              <span className={classes?.capsule}>{courses.length || 0}</span>
            </Nav.Link>
            <Button
              className="topbar-bg-light"
              onClick={() => {
                getAuth().signOut().then(() => {
                  window.location.replace("/")
                })
              }} >Logout</Button>
          </Nav>
        </Container>
      )}
    </Navbar>
  );
}

export default NavbarComponent;
