import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import { Nav, Navbar } from "react-bootstrap"

export default function NavbarComponent({ location }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
  <>
    <Navbar className="px-2 rounded-bottom shadow" variant="dark" expand="sm" id="site-navbar">
    <Link to="/" className="link-no-style">
      <Navbar.Brand>
        {site.siteMetadata.title}
      </Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto" activeKey={location.pathname}>
        <Nav.Link
          className="link-no-style"
          as={Link}
          to="/"
          eventKey="/"
        >
          About
        </Nav.Link>
        <Nav.Link 
          className="link-no-style"
          as={Link}
          to="/projects/"
          eventKey="/projects/"
        >
          Projects
        </Nav.Link>        
        <Nav.Link
          className="link-no-style"
          as={Link}
          to="/skills/"
          eventKey="/skills/"
        >
          Skills
        </Nav.Link>
        <Nav.Link
          className="link-no-style"
          as={Link}
          to="/experience/"
          eventKey="/experience/"
        >
          Experience
        </Nav.Link>
        <Nav.Link
          className="link-no-style"
          as={Link}
          to="/contact/"
          eventKey="/contact/"
        >
          Contact
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  </>
  )
}
