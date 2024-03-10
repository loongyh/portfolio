import React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function NotFoundPage({ location }) {
  return (
    <Layout location={location}>
      <h1>404: Not Found</h1>
      <p>This page doesn't exist.</p>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />
