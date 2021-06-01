const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for project
  const project = path.resolve(`./src/templates/project.js`)

  // Get all markdown projects sorted by start date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___start], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your projects`,
      result.errors
    )
    return
  }

  const projects = result.data.allMarkdownRemark.nodes

  // Create projects pages
  // But only if there's at least one markdown file found at "content/projects" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (projects.length > 0) {
    projects.forEach((post, index) => {
      const previousPostId = index === 0 ? null : projects[index - 1].id
      const nextPostId = index === projects.length - 1 ? null : projects[index + 1].id

      createPage({
        path: post.fields.slug,
        component: project,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // projects are stored inside "content/projects" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      github: String
      linkedin: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      start: Date @dateformat
      end: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
