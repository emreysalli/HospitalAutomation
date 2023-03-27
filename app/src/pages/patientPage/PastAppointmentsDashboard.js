import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';

const PastAppointmentsDashboard = () => {
  const [userAppointments, setUserAppointments] = React.useState([
    {
      id: 1,
      polyclinic: 'Dahiliye',
      appointmentDate: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
      type: 1,
    },
    {
      id: 2,
      polyclinic: 'Dahiliye',
      appointmentDate: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
      type: 0,
    },
    {
      id: 3,
      polyclinic: 'Dahiliye',
      appointmentDate: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
      type: 1,
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
        <Typography variant="h6">Geçmiş Randevularım</Typography>
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
                    flexDirection: 'row',
                    textAlign: 'center',
                    backgroundColor: '#4CC2F6',
                    borderRadius: '50px',
                    paddingX: '2%',
                    width: 'auto',
                  }}
                >
                  {appointment.appointmentDate} {appointment.hour}
                </Paper>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex' }}>
                <i class="fa-solid fa-tag fa-rotate-90" />
                {appointment.type === 1 ? (
                  <Typography
                    sx={{ color: 'green', fontWeight: 'bold' }}
                    ml={2}
                  >
                    Geçmiş Randevu
                  </Typography>
                ) : (
                  <Typography sx={{ color: 'red', fontWeight: 'bold' }} ml={2}>
                    İptal Randevu
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} md={3}>
                <i class="fa-regular fa-hospital" /> {appointment.polyclinic}
              </Grid>
              <Grid item xs={6} md={3}>
                <i class="fa-solid fa-stethoscope"></i> {appointment.doctor}
              </Grid>
            </Grid>
            <Divider />
          </>
        ))}
      </Paper>
    </Container>
  );
};

export default PastAppointmentsDashboard;
