import React from 'react';
import { FormattedMessage } from 'react-intl';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const NavigationBar = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton style={{ marginLeft: -12, marginRight: 20 }} color="inherit" aria-label="Menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
        <FormattedMessage id="seed.containers.AppShell.header" />
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

export default NavigationBar;
