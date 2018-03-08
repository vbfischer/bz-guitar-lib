import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import Link from 'gatsby-link';
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui-icons/List';
import PinDrop from 'material-ui-icons/PinDrop';

import MenuItem from '../menu-item';

const drawerWidth = 270;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100%',
  },
  toolbar: theme.mixins.toolbar,
});

class Sidebar extends React.Component {
  render() {
    const { classes, tags, categories } = this.props;
    return (
      <Drawer
        elevation={20}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List subheader={<ListSubheader component="div">Categories</ListSubheader>}>
          {categories.map(category => (
            <MenuItem key={category.id} name={category.name} path={category.path} button>
              <ListIcon />
            </MenuItem>
          ))}
        </List>
        <Divider />
        <List subheader={<ListSubheader component="div">Tags</ListSubheader>}>
          {tags.map(tag => (
            <MenuItem key={tag.id} name={tag.name} path={tag.path} itemId={tag.id} button>
              <PinDrop />
            </MenuItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);
