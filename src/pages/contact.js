import React, { useState } from "react"
import { Button, Col, Form, Row, Spinner } from "react-bootstrap"
import { Formik } from "formik"
import { object, string } from "yup"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function ContactPage({ location }) {
  const formName = 'contact'
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState({state: false})

  const encode = data =>
    Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")

  return (
    <Layout location={location}>
      <Seo title="Contact Me" keywords={[`get in touch`, `connect`, `reach`]} />
      <h2 className="mb-3">Contact Me</h2>
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validationSchema={object({
          name: string()
            .required('Required'),
          email: string()
            .email('Format: user@example.com')
            .required('Required'),
          message: string()
            .required('Required'),
        })}
        onSubmit={async values => {
          try {
            setSubmitError({state: false})
            const response = await fetch('/', {
              method: 'POST',
              mode: 'same-origin',
              headers: {'Content-Type': 'application/x-www-form-urlencoded'},
              body: encode({'form-name': formName, ...values})
            })
            if (response.status === 200)
              setSubmitSuccess(true)
            else
            setSubmitError({state: true, server: true, status: response.status, body: await response.text()})
          } catch (err) {
            setSubmitError({state: true, server: false, body: err})
          }
        }}
      >
        {({ errors, handleChange, handleSubmit, isSubmitting, touched, values }) =>
          <Form style={{maxWidth: '516px'}} name={formName} data-netlify="true" noValidate onSubmit={handleSubmit}>
            <input type="hidden" name="form-name" value={formName} />
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  isValid={touched.message && !errors.message}
                />
                <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
              </Form.Group>
            </Row>
            {isSubmitting ?
              <Button className="mb-2" variant="secondary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only ps-2">Submitting...</span>
              </Button> :
              <Button className="mb-2" variant="secondary" type="submit" disabled={isSubmitting || submitSuccess}>Submit</Button>
            }
          </Form>
        }
      </Formik>
      {submitSuccess &&
        <p>Submitted! Will get back to you shortly.</p>
      }
      {submitError.state &&
        <p className="text-danger">
          {submitError.server ?
            `Server error ${submitError.status}: ${submitError.body}` :
            `Error: ${submitError.body}`
          }
        </p>
      }
    </Layout>
  )
}
