import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import { Navbar, Nav } from "react-bootstrap"

export default function NavbarComponent({ location }) {
  const { allMarkdownRemark, site } = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark {
          nodes {
            frontmatter {
            title
            }
            fields {
              slug
            }
            id
          }
        }
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
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto" activeKey={location.pathname}>
      {allMarkdownRemark.nodes.map(node => (
        <Link key={node.id} to={node.fields.slug} className="link-no-style">
          <Nav.Link as="span" eventKey={node.fields.slug}>
            {node.frontmatter.title}
          </Nav.Link>
        </Link>
      ))}
      </Nav>
    </Navbar.Collapse>
    </Navbar>
  </>
  )
}
