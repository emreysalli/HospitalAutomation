import React from 'react';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import { CssBaseline } from '@mui/material';
const theme = createTheme();
const SignIn = () => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#A9FEDF',
            backgroundSize: 'cover',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <img
            src={require('../../assets/images/login-image.png')}
            alt="hospital staff"
            width="100%"
            height="90%"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Outlet />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default SignIn;
