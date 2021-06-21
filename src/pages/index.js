import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function IndexPage({ location }) {
  const images = useStaticQuery(
    graphql`
      query {
        allFile(
          filter: {sourceInstanceName: {eq: "frontpage-images"}}
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
      }
    `
  ).allFile

  return (
    <>
      <Container className="banner" />
      <Layout location={location}>
        <Seo title="About Me" keywords={[`portfolio`, `projects`, `works`]} />
        <h1 className="text-center">Hi, I'm Barry</h1>
        <h2 className="text-center" style={{fontSize:'1.5rem'}}>Systems Engineer / Integrator</h2>
        <h2 className="text-center" style={{fontSize:'0.8rem'}}>BSc (Hons) in Computing and Information Systems</h2>
        <h2 className="text-center" style={{fontSize:'0.8rem'}}>Diploma in Electrical Engineering</h2>
        <hr />
        <p>Since university graduation, I continued my final year project to automate everything in the home.</p>
        <p>
          My dream is to make home automation accessible for everyone.<br />
          In the process, I have managed to source affordable, high quality and practical commercial hardware from China.<br />
          I have integrated these hardware into the <a href="https://esphome.io" target="_blank" rel="noopener noreferrer">ESPHome</a> and by extension <a href="https://www.home-assistant.io" target="_blank" rel="noopener noreferrer">Home Assistant</a> platforms.<br />
          My efforts are now part of these opensource projects.
        </p>
        <p>I'm currently looking for work in Software Engineering, DevOps, SRE and cloud native roles.</p>
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
