import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import _ from 'lodash';

import withRoot from '../components/withRoot';
import Header from '../components/layout/header';
import SideBar from '../components/layout/side-bar';

import './index.css';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100% ',
    backgroundColor: theme.palette.background.default,
    marginTop: '3em',
  },
  main: {
    display: 'flex',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    overflow: 'auto',
  },
});

const TemplateWrapper = ({ classes, children, data }) => {
  const tags = _.map(data.tags.edges, tag => ({
    name: tag.node.context.tag,
    path: tag.node.path,
    id: tag.node.id,
  }));

  const categories = _.map(data.categories.edges, category => ({
    name: category.node.context.category,
    path: category.node.path,
    id: category.node.id,
  }));

  return (
    <div className={classes.root}>
      <Header />
      <Paper className={classes.main}>
        <SideBar tags={tags} categories={categories} />
        {children()}
      </Paper>
    </div>
  );
};

TemplateWrapper.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.func,
  data: PropTypes.object.isRequired,
};

TemplateWrapper.defaultProps = {
  classes: {},
  children: () => {},
};

export default withRoot(withStyles(styles)(TemplateWrapper));

export const query = graphql`
  query LayoutQuery {
    categories: allSitePage(filter: { context: { category: { ne: null } } }) {
      edges {
        node {
          id
          path
          context {
            category
          }
        }
      }
    }
    tags: allSitePage(filter: { context: { tag: { ne: null } } }) {
      edges {
        node {
          id
          path
          context {
            tag
          }
        }
      }
    }
  }
`;
