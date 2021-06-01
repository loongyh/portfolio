import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function IndexPage({ location }) {
  const data = useStaticQuery(
    graphql`
      query MyQuery {
        allMarkdownRemark {
          nodes {
            frontmatter {
              title
              description
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    width: 1200
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
      <Container className="banner" />
      <Layout location={location}>
        <Seo title={data.site.siteMetadata.title} keywords={[`portfolio`, `projects`, `works`]} />
        <Container>
          <Row className="gy-4" xs={1} sm={2} md={3} lg={4} xl={6}>
            {data.allMarkdownRemark.nodes.map(project => (
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
    </>
  )
}
