import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from 'material-ui/styles';

import Card, { CardHeader, CardContent } from 'material-ui/Card';
import List, { ListSubheader } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import ListIcon from 'material-ui-icons/List';
import PinDrop from 'material-ui-icons/PinDrop';

import MenuItem from '../menu-item';

const drawerWidth = 270;

const styles = theme => ({
  card: {
    position: 'relative',
    width: drawerWidth,
    height: '90%',
    margin: '1em',
    overflow: 'auto',
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  toolbar: theme.mixins.toolbar,
});

const Sidebar = ({
  classes, tags, categories, theme,
}) => (
  <Card className={classes.card} raised>
    <CardContent>
      <List
        subheader={
          <ListSubheader component="div" color="primary" className={classes.subheader}>
            Categories
          </ListSubheader>
        }
      >
        {categories.map(category => (
          <MenuItem key={category.id} name={category.name} path={category.path} button>
            <ListIcon />
          </MenuItem>
        ))}
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader component="div" color="primary" className={classes.subheader}>
            Tags
          </ListSubheader>
        }
      >
        {tags.map(tag => (
          <MenuItem key={tag.id} name={tag.name} path={tag.path} itemId={tag.id} button>
            <PinDrop />
          </MenuItem>
        ))}
      </List>
      <Divider />
    </CardContent>
  </Card>
);

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Sidebar));
