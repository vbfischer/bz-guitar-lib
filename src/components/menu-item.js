import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { ListItem, ListItemText } from 'material-ui/List';
import { navigateTo } from 'gatsby-link';

const menuItem = ({ name, path, children }) => (
  <ListItem button>
    {children}
    <ListItemText onClick={() => navigateTo(path)} primary={_.startCase(name)} />
  </ListItem>
);

menuItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string,
  children: PropTypes.node,
};

menuItem.defaultProps = {
  path: '',
  children: {},
};

export default menuItem;
