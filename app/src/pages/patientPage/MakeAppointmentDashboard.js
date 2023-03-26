import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BasicSelect from '../../components/BasicSelect';
import Button from '@mui/material/Button';
const MakeAppointmentDashboard = () => {
  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Randevu Ara</Typography>
            <BasicSelect label="Klinik Seçiniz" />
            <BasicSelect label="Doktor Seçiniz" />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                borderRadius: 2,
                py: 1,
                fontSize: 18,
              }}
            >
              Randevu Ara
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Randevu Saatleri</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MakeAppointmentDashboard;
