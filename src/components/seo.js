/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { getImage, getSrc } from "gatsby-plugin-image"

Seo.defaultProps = {
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.shape({
    childImageSharp: PropTypes.shape({
      gatsbyImageData: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      })
    })
  }),
}

export default function Seo({ description, image, title }) {
  const { file, site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
          }
        }
        file(
          sourceInstanceName: {eq: "about"}
          base: {eq: "about.md"}
        ) {
          childMarkdownRemark {
            frontmatter {
              banner {
                childImageSharp {
                  gatsbyImageData(
                    layout: FIXED
                    aspectRatio: 1.905
                    backgroundColor: "white"
                    transformOptions: {fit: CONTAIN}
                  )
                }
              }
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <>
      <title>{(title ? `${title} | ` : "").concat(site.siteMetadata.title)}</title>
      {[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title || site.siteMetadata.title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `og:image`,
          content: `${site.siteMetadata.siteUrl}${getSrc(image || file.childMarkdownRemark.frontmatter.banner)}`,
        },
        {
          property: "og:image:width",
          content: getImage(image || file.childMarkdownRemark.frontmatter.banner).width,
        },
        {
          property: "og:image:height",
          content: getImage(image || file.childMarkdownRemark.frontmatter.banner).height,
        },
        {
          name: `og:url`,
          content: site.siteMetadata.siteUrl,
        },
      ].map((meta, index) => <meta key={index} {...meta} />)}
    </>
  )
}
