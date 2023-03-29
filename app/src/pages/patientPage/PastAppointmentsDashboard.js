import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { socket } from '../../services/socketServices';

const PastAppointmentsDashboard = () => {
  const [userAppointments, setUserAppointments] = React.useState([
    {
      id: 1,
      polyclinic: 'Dahiliye',
      date: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
      appointmentStatus: 1,
    },
    {
      id: 2,
      polyclinic: 'Dahiliye',
      date: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
      appointmentStatus: 0,
    },
    {
      id: 3,
      polyclinic: 'Dahiliye',
      date: '12.09.2022',
      hour: '08:30',
      doctor: 'emre yasin şallı',
      appointmentStatus: 1,
    },
  ]);

  const getPatientPastAppointments = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_ PATIENT_PAST_APPOINTMENTS', { id: userId })
      .then(async (data) => {
        if (data) {
          setUserAppointments(data.appointments);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  React.useEffect(() => {
    getPatientPastAppointments();
  }, []);

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
        {userAppointments.map((appointment, index) => (
          <div key={index}>
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
                  {appointment.date} {appointment.hour}
                </Paper>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex' }}>
                <i className="fa-solid fa-tag fa-rotate-90" />
                {appointment.appointmentStatus === 1 ? (
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
                <i className="fa-regular fa-hospital" />{' '}
                {appointment.polyclinic}
              </Grid>
              <Grid item xs={6} md={3}>
                <i className="fa-solid fa-stethoscope"></i> {appointment.doctor}
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))}
      </Paper>
    </Container>
  );
};

export default PastAppointmentsDashboard;
