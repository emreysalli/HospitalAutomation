import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import { socket } from '../../services/socketServices';

const PastAppointmentsDashboard = () => {
  const [userAppointments, setUserAppointments] = React.useState([]);

  const getPatientPastAppointments = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_PATIENT_PAST_APPOINTMENTS', { patientId: userId })
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
        {userAppointments.length !== 0 ?  <>{userAppointments.map((appointment, index) => (
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
                  {appointment.appointmentDate} {appointment.appointmentHour}
                </Paper>
              </Grid>
              <Grid item xs={6} md={3} sx={{ display: 'flex' }}>
                <i className="fa-solid fa-tag fa-rotate-90" />
                {appointment.appointmentStatus === 0 ? (
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
                {appointment.polyclinicName}
              </Grid>
              <Grid item xs={6} md={3}>
                <i className="fa-solid fa-stethoscope"></i> {appointment.doctor}
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))}</>: <><Typography sx={{"textAlign": "center"}}>Kayıtlı bilginiz bulunmamaktadır.</Typography></>}
      </Paper>
    </Container>
  );
};

export default PastAppointmentsDashboard;
