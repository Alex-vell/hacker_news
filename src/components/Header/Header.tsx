import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

export const Header = () => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Hacker News
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
