import React from 'react';
import Grid from '@mui/material/Grid';
const WelcomePage = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <img
          src={require('../assets/logos/saglik-bakanligi.png')}
          alt="sağlık bakanlığı logo"
          style={{ width: '60vh', height: '60vh' }}
        />
      </Grid>
    </Grid>
  );
};

export default WelcomePage;
