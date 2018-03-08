import React from 'react';
import PropTypes from 'prop-types';
import List from 'material-ui/List';
import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import _ from 'lodash';

import PostItem from '../components/post-item';

const styles = theme => ({
  card: {
    padding: 0,
  },
  toolbar: theme.mixins.toolbar,
});

class TagTemplate extends React.Component {
  state = {
    items: [],
  };

  componentWillMount() {
    const { data: { allMarkdownRemark: { edges } }, pathContext: { category, tag } } = this.props;

    const items = edges.map(({ node: { frontmatter } }) => ({
      title: frontmatter.internalId,
      id: frontmatter.internalId,
      path: frontmatter.path,
      excerpt: frontmatter.excerpt,
      active: false,
    }));

    this.setState({ items, title: _.startCase(category || tag) });
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
      <div>
        <div className={this.props.classes.toolbar} />
        <Card>
          <CardHeader title={this.state.title} />
          <Divider />
          <CardContent>
            <List component="nav">
              {this.state.items.map(post => (
                <PostItem key={post.id} item={post} onSelected={id => this.updateActive(id)} />
              ))}
            </List>
          </CardContent>
        </Card>
      </div>
    );
  }
}

TagTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
};

export default withStyles(styles)(TagTemplate);

export const query = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___internalId], order: ASC }
      filter: { frontmatter: { tags: { eq: $tag } } }
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
