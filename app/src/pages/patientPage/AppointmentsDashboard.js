import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { socket } from '../../services/socketServices';

const AppointmentsDashboard = () => {
  const [userAppointments, setUserAppointments] = React.useState([]);

  const getPatientAppointments = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_PATIENT_APPOINTMENTS', { patientId: userId })
      .then(async (data) => {
        if (data) {
          setUserAppointments(data.appointments);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const cancelPatientAppointments = (appointmentId) => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('CANCEL_PATIENT_APPOINTMENTS', {
        id: userId,
        appointmentId: appointmentId,
      })
      .then(async (data) => {
        if (data) {
          alert('Randevu iptal edildi.');
          getPatientAppointments();
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  React.useEffect(() => {
    getPatientAppointments();
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
        <Typography variant="h6">Randevularım</Typography>
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
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#4CC2F6',
                    borderRadius: '50px',
                    paddingX: '2%',
                  }}
                >
                  {appointment.appointmentDate} {appointment.appointmentHour}
                </Paper>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex' }}>
                <i
                  className="fa-regular fa-hospital"
                  style={{ marginRight: 10 }}
                />
                {appointment.polyclinicName}
              </Grid>
              <Grid item xs={6} md={4}>
                <i className="fa-solid fa-stethoscope"></i> {appointment.doctor}
              </Grid>
              <Grid item xs={6} md={2}>
                <Button
                  onClick={() => {
                    cancelPatientAppointments(appointment.id);
                  }}
                  variant="contained"
                  color="error"
                >
                  <i className="fa-regular fa-circle-xmark"></i>
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))}
      </Paper>
    </Container>
  );
};

export default AppointmentsDashboard;
