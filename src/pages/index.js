import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function IndexPage({ location }) {
  const { images, about } = useStaticQuery(
    graphql`
      query {
        images: allFile(
          filter: {sourceInstanceName: {eq: "images"}}
          sort: {fields: name}
        ) {
          nodes {
            name
            childImageSharp {
              gatsbyImageData(
                aspectRatio: 1
                layout: FULL_WIDTH
                backgroundColor: "#20232A"
                transformOptions: {fit: CONTAIN}
              )
            }
            id
          }
        }
        about: file(
          sourceInstanceName: {eq: "about"}
          base: {eq: "about.md"}
        ) {
          childMarkdownRemark {
            frontmatter {
              banner {
                childImageSharp {
                  gatsbyImageData
                }
              }
              name
              occupation
              education1
              education2
            }
            html
          }
        }
      }
    `
  )

  return (
    <>
      <Container className="banner" style={{backgroundImage: `url(${getSrc(about.childMarkdownRemark.frontmatter.banner)})`}} />
      <Layout location={location}>
        <Seo keywords={[`portfolio`, `projects`, `works`]} />
        <h1 className="text-center">Hi, I'm {about.childMarkdownRemark.frontmatter.name}</h1>
        <h2 className="text-center" style={{fontSize:'1.5rem'}}>{about.childMarkdownRemark.frontmatter.occupation}</h2>
        <h2 className="text-center" style={{fontSize:'0.8rem'}}>{about.childMarkdownRemark.frontmatter.education1}</h2>
        <h2 className="text-center" style={{fontSize:'0.8rem'}}>{about.childMarkdownRemark.frontmatter.education2}</h2>
        <hr />
        <section dangerouslySetInnerHTML={{ __html: about.childMarkdownRemark.html }} />
        <hr />
        <Container>
          <Row className="gy-4" xs={1} sm={2} md={3} lg={4} xl={6}>
            {images.nodes.map(image => (
              <Col key={image.id}>
                <GatsbyImage
                  image={getImage(image)}
                  alt={image.name}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Layout>
    </>
  )
}
