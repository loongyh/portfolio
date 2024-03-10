import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Card, Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function SkillsPage({ location }) {
  const skills = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: {frontmatter: {type: {ne: null}}}
          sort: { fields: frontmatter___title }
        ) {
          nodes {
            frontmatter {
              type
              title
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    aspectRatio: 1
                    height: 64
                    backgroundColor: "#6C757D"
                    transformOptions: {fit: CONTAIN}
                  )
                }
              }
              url
            }
            id
          }
        }
      }
    `
  ).allMarkdownRemark

  const skillCard = node =>
    <Col key={node.id}>
      <a className="link-no-style" href={node.frontmatter.url} target="_blank" rel="noopener noreferrer">
        <Card className="shadow" bg="secondary">
          <Row className="gx-0">
            <Col className="d-flex align-items-center" xs={2}>
              <GatsbyImage
                image={getImage(node.frontmatter.thumbnail)}
                alt={node.frontmatter.title}
              />
            </Col>
            <Col className="d-flex align-items-center" xs={10}>
              <Card.Body className="p-0 ps-3">
                <Card.Title className="mb-1">{node.frontmatter.title}</Card.Title>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </a>
    </Col>

  return (
    <Layout location={location}>
      <h2 className="mb-4">Industry Knowledge</h2>
      <Container>
        <Row className="gy-4" xs={1} md={2} lg={3}>
          {skills.nodes.filter(node => node.frontmatter.type === 'industry-knowledge').map(node => skillCard(node))}
        </Row>
      </Container>
      <hr className="mt-4 mb-3" />
      <h2 className="mb-4">Tools & Technologies</h2>
      <Container>
        <Row className="gy-4" xs={1} md={2} lg={3}>
          {skills.nodes.filter(node => node.frontmatter.type === 'tool').map(node => skillCard(node))}
        </Row>
      </Container>
    </Layout>
  )
}

export const Head = () => <Seo title="My Skills" keywords={[`expertise`, `proficiency`, `know-how`]} />
