import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';

const AppointmentsDashboard = () => {
  const [userAppointments, setUserAppointments] = React.useState([
    {
      id: 1,
      polyclinic: 'Dahiliye',
      appointmentDate: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
    },
    {
      id: 2,
      polyclinic: 'Dahiliye',
      appointmentDate: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
    },
    {
      id: 3,
      polyclinic: 'Dahiliye',
      appointmentDate: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
    },
  ]);

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">Randevularım</Typography>
        {userAppointments.map((appointment) => (
          <>
            <Grid container spacing={2} my={1}>
              <Grid
                item
                xs={6}
                md={3}
                sx={{
                  display: 'flex',
                }}
              >
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#4CC2F6',
                    borderRadius: '50px',
                    paddingX: '2%',
                  }}
                >
                  {appointment.appointmentDate} {appointment.hour}
                </Paper>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex' }}>
                <i class="fa-regular fa-hospital" /> {appointment.polyclinic}
              </Grid>
              <Grid item xs={6} md={4}>
                <i class="fa-solid fa-stethoscope"></i> {appointment.doctor}
              </Grid>
              <Grid item xs={6} md={2}>
                <Button variant="contained" color="error">
                  <i class="fa-regular fa-circle-xmark"></i>
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </>
        ))}
      </Paper>
    </Container>
  );
};

export default AppointmentsDashboard;
