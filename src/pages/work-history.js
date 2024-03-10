import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function WorkHistoryPage({ location }) {
  const workHistory = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          filter: {frontmatter: {organisation: {ne: null}}}
          sort: {frontmatter: {workStart: DESC}}
        ) {
          nodes {
            frontmatter {
              organisation
              position
              thumbnail {
                childImageSharp {
                  gatsbyImageData(
                    width: 120
                  )
                }
              }
              jobs
              workStart(formatString: "MMMM YYYY")
              workEnd(formatString: "MMMM YYYY")
              url
            }
            id
          }
        }
      }
    `
  ).allMarkdownRemark

  return (
    <Layout location={location}>
      {workHistory.nodes.map(node =>
        <div key={node.id} className="mb-5">
          <Container>
            <Row className="align-items-center" xs={1} sm={2}>
              <Col className="px-0" sm={8} md={6} lg={4}>
                <a className="link-no-style" href={node.frontmatter.url} target="_blank" rel="noopener noreferrer">
                  {node.frontmatter.thumbnail ?
                    <GatsbyImage
                      className="mb-2"
                      image={getImage(node.frontmatter.thumbnail)}
                      alt={node.frontmatter.organisation}
                    /> :
                    <h4>{node.frontmatter.organisation}</h4>
                  }
                </a>
              </Col>
              <Col className="px-0" sm={4} md={6} lg={8}>
                <h6>{node.frontmatter.workStart} - {node.frontmatter.workEnd === 'Invalid date' ? 'Current' : node.frontmatter.workEnd}</h6>
              </Col>
            </Row>
          </Container>
          <h6>{node.frontmatter.position}</h6>
          <ul>
            {node.frontmatter.jobs.map((job, index) =>
              <li key={index}>{job}</li>  
            )}
          </ul>
        </div>
      )}
    </Layout>
  )
}

export const Head = () => <Seo title="Work History" keywords={[`industry`, `experience`, `jobs`]} />
