import React from "react"
import { Button, Form, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function ContactPage({ location }) {
  return (
    <Layout location={location}>
      <Seo title="Contact Me" keywords={[`get in touch`, `connect`, `reach`]} />
      <h2 className="mb-3">Contact Me</h2>
      <Form
        style={{maxWidth: '516px'}}
        method="post"
        name="contact"
        data-netlify="true"
        netlify-honeypot="bot-field"
      >
        <input type="hidden" name="bot-field" />
        <Row className="mb-2">
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
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
              name="email"
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
              name="message"
            />
          </Form.Group>
        </Row>
        <Button variant="secondary" type="submit">Submit</Button>
      </Form>
    </Layout>
  )
}
