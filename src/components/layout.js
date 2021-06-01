import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"

import Navbar from "./navbar"

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function Layout({ children, location }) {
  const { name } = useStaticQuery(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            author {
              name
            }
          }
        }
      }
    `
  ).site.siteMetadata.author

  return (
    <>
      <Container className="px-0 main">
        <Navbar location={location} />
        <Row noGutters>
          <Col>
            <Container className="mt-5">
              <main>{children}</main>
            </Container>
          </Col>
        </Row>
      </Container>
      <Container className="px-0">
        <Row noGutters>
          <Col className="footer-col">
            <footer>
              <span>
                © {new Date().getFullYear()} {name}
              </span>
            </footer>
          </Col>
        </Row>
      </Container>
    </>
  )
}
