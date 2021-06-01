import React from "react"
import PropTypes from "prop-types"
import { graphql, useStaticQuery } from "gatsby"
import { Container, Row, Col } from "react-bootstrap"
import { Github, Linkedin } from "react-bootstrap-icons"

import Navbar from "./navbar"

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default function Layout({ children, location }) {
  const { author, social } = useStaticQuery(
    graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            author {
              name
            }
            social {
              github
              linkedin
            }
          }
        }
      }
    `
  ).site.siteMetadata

  return (
    <>
      <Container className="px-0 main">
        <Navbar location={location} />
        <Container className="my-5">
          <main>{children}</main>
        </Container>
      </Container>
      <Container className="px-0">
        <Row noGutters>
          <Col className="footer-col">
            <footer className="px-3 rounded-top justify-content-between">
              <span>
                <a
                  className="link-no-style"
                  href={`https://github.com/${social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={24} />
                </a>
                <a
                  className="mx-3 link-no-style"
                  href={`https://www.linkedin.com/in/${social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={24} />
                </a>
              </span>
              <span>© {new Date().getFullYear()} {author.name}</span>
              <span style={{minWidth:'80px'}}></span>
            </footer>
          </Col>
        </Row>
      </Container>
    </>
  )
}
