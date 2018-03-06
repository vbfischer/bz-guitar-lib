import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import Card, { CardContent, CardHeader } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Reboot from 'material-ui/Reboot';
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
  card: {
    padding: 0,
  },
  exerciseList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: theme.mixins.toolbar,
});

const TemplateWrapper = (props) => {
  const { classes, children, data } = props;
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
      <div className={classes.main}>
        <SideBar tags={tags} categories={categories} />
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Card>
            <CardHeader title="BZ Guitar Lab Library" />
            <Divider />
            <CardContent> {children()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

TemplateWrapper.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.func,
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
