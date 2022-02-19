import React from "react"
import { Button, Form, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function ContactPage({ location }) {
  const formName = 'contact'

  return (
    <Layout location={location}>
      <Seo title="Contact Me" keywords={[`get in touch`, `connect`, `reach`]} />
      <h2 className="mb-3">Contact Me</h2>
      <Form
        style={{maxWidth: '516px'}}
        method="post"
        name={formName}
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value={formName} />
        <Row className="mb-2">
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="user@example.com"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
            />
          </Form.Group>
        </Row>
        <Button className="mb-2" variant="secondary" type="submit">Submit</Button>
      </Form>
    </Layout>
  )
}
