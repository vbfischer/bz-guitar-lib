import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Link from 'gatsby-link';
import _ from 'lodash';
import classnames from 'classnames';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  listItem: {
    border: `1px solid ${theme.palette.divider}`,
    backgroundClip: 'padding-box',
    display: 'flex',
    '&$selected': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  itemName: {
    flexGrow: 1,
  },
  itemExcerpt: {
    flexGrow: 2,
  },
  selected: {},
});

const postItem = ({ classes, item, onSelected }) => (
  <ListItem button className={classnames(classes.listItem, { [classes.selected]: item.active })}>
    <Link to={item.path} className={classes.itemName}>
      <Typography variant="headline">{item.title}</Typography>
    </Link>
    <Typography
      onClick={() => onSelected(item.id)}
      variant="headline"
      className={classes.itemExcerpt}
    >
      {item.excerpt}
    </Typography>
  </ListItem>
);

postItem.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.shape({
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
  onSelected: PropTypes.func,
};

postItem.defaultProps = {
  classes: {},
  onSelected: _.noop,
};

export default withStyles(styles)(postItem);
