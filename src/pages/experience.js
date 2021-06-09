import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Card, Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function ExperiencePage({ location }) {
  return (
    <Layout location={location}>
      <Seo title="My Experience" keywords={[`industry`, `work history`, `jobs`]} />

    </Layout>
  )
}