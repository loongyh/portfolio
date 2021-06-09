import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import { Card, Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function SkillsPage({ location }) {
  return (
    <Layout location={location}>
      <Seo title="My Skills" keywords={[`expertise`, `proficiency`, `know-how`]} />

    </Layout>
  )
}