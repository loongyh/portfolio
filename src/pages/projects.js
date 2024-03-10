import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function ProjectsPage({ location }) {
  const projects = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: {frontmatter: {projectStart: {ne: null}}}
          sort: { fields: frontmatter___projectStart, order: DESC }
        ) {
          nodes {
            frontmatter {
              title
              description
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1
                    layout: FULL_WIDTH
                    backgroundColor: "#6C757D"
                    transformOptions: {fit: CONTAIN}
                  )
                }
              }
            }
            fields {
              slug
            }
            id
          }
        }
      }
    `
  ).allMarkdownRemark

  return (
    <Layout location={location}>
      <Container>
          <Row className="gy-4" xs={1} sm={2} md={3} lg={4} xl={6}>
            {projects.nodes.map(project => (
              <Col key={project.id} >
                <Link className="link-no-style" to={project.fields.slug}>
                  <Card className="shadow" bg="secondary">
                    <GatsbyImage
                      image={getImage(project.frontmatter.thumbnail)}
                      alt={project.frontmatter.title}
                    />
                    <Card.Body>
                      <Card.Title>{project.frontmatter.title}</Card.Title>
                      <Card.Text>{project.frontmatter.description}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
    </Layout>
  )
}

export const Head = () => <Seo title="My Projects" keywords={[`portfolio`, `work done`, `undertaking`]} />
