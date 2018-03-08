import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
});

const header = ({ classes }) => (
  <AppBar>
    <Toolbar>
      <Typography variant="title" color="inherit">
        BZ Stuff
      </Typography>
    </Toolbar>
  </AppBar>
);

header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(header);
