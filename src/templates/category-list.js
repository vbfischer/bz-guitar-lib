import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';

import PostItem from '../components/post-item';

class CategoryTemplate extends React.Component {
  state = {
    items: [],
  };

  componentWillMount() {
    const { data: { allMarkdownRemark: { edges } } } = this.props;

    const items = edges.map(({ node: { frontmatter } }, index) => ({
      title: frontmatter.title,
      id: frontmatter.internalId,
      path: frontmatter.path,
      excerpt: frontmatter.excerpt,
      active: false,
    }));

    this.setState({ items });
  }

  updateActive = (id) => {
    this.setState({
      items: this.state.items.map(item => ({
        ...item,
        active: item.id === id,
      })),
    });
  };

  render() {
    return (
      <List component="nav">
        {this.state.items.map(post => (
          <PostItem key={post.id} item={post} onSelected={id => this.updateActive(id)} />
        ))}
      </List>
    );
  }
}

CategoryTemplate.propTypes = {
  data: PropTypes.object.isRequired,
};

export default CategoryTemplate;

export const query = graphql`
  query CategoryPage($category: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___internalId], order: ASC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
            internalId
          }
        }
      }
    }
  }
`;
