import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import BasicSelect from '../../components/BasicSelect';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const MakeAppointmentDashboard = () => {
  const [appointmentDate, setAppointmentDate] = React.useState();
  const [appointments, setAppointments] = React.useState([
    { hour: '08:30', isDisabled: true },
    { hour: '09:00', isDisabled: true },
    { hour: '09:30', isDisabled: false },
    { hour: '10:00', isDisabled: true },
    { hour: '10:30', isDisabled: false },
    { hour: '11:00', isDisabled: false },
    { hour: '11:30', isDisabled: true },
    { hour: '12:00', isDisabled: false },
    { hour: '12:30', isDisabled: true },
    { hour: '13:00', isDisabled: false },
    { hour: '13:30', isDisabled: true },
    { hour: '14:00', isDisabled: false },
    { hour: '14:30', isDisabled: true },
    { hour: '15:00', isDisabled: false },
    { hour: '15:30', isDisabled: false },
    { hour: '16:00', isDisabled: true },
  ]);

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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Randevu Tarihi Seçiniz"
                value={appointmentDate}
                onChange={(value) => setAppointmentDate(value)}
                required
                sx={{ width: '100%', marginTop: 2 }}
              />
            </LocalizationProvider>
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
            <Grid container spacing={2}>
              {appointments.map((appointment) => (
                <Grid item xs={3}>
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
                      backgroundColor: '#0bbf08',
                      ':hover': {
                        bgcolor: '#097E06',
                        color: 'white',
                      },
                    }}
                    disabled={appointment.isDisabled}
                  >
                    {appointment.hour}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MakeAppointmentDashboard;
