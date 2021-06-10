import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Card, Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function WorkHistoryPage({ location }) {
  return (
    <Layout location={location}>
      <Seo title="Work History" keywords={[`industry`, `experience`, `jobs`]} />

    </Layout>
  )
}
