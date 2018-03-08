const path = require('path');
const _ = require('lodash');

const i = 1;

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve('src/templates/exercise-post.js');
  const categoryPageTemplate = path.resolve('src/templates/category-list.js');
  const tagPageTemplate = path.resolve('src/templates/tag-list.js');
  // If you are experiencing issues with the ordering of the posts on the homepage,
  // replace the `allMarkdownRemark` line below with something like this:
  // allMarkdownRemark(sort:{fields:[frontmatter___date], order: ASC}) {

  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              tags
              category
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const tagSet = new Set();
    const categorySet = new Set();

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.tags) {
        node.frontmatter.tags.forEach((tag) => {
          tagSet.add(tag);
        });
      }

      if (node.frontmatter.category) {
        categorySet.add(node.frontmatter.category);
      }

      createPage({
        path: node.frontmatter.path,
        component: blogPostTemplate,
      });
    });

    const tagList = Array.from(tagSet);
    const categoryList = Array.from(categorySet);

    tagList.forEach((tag) => {
      createPage({
        path: `/tags/${_.kebabCase(tag)}/`,
        component: tagPageTemplate,
        context: {
          tag,
        },
      });
    });

    categoryList.forEach((category) => {
      createPage({
        path: `/categories/${_.kebabCase(category)}/`,
        component: categoryPageTemplate,
        context: {
          category,
        },
      });
    });
  });
};
