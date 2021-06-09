import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Card, Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function ContactPage({ location }) {
  return (
    <Layout location={location}>
      <Seo title="Contact Me" keywords={[`get in touch`, `connect`, `reach`]} />

    </Layout>
  )
}