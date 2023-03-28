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
import { socket } from '../../services/socketServices';

const MakeAppointmentDashboard = () => {
  const [appointmentDate, setAppointmentDate] = React.useState('');
  const [selectedPolyclinic, setSelectedPolyclinic] = React.useState('');
  const [selectedDoctor, setSelectedDoctor] = React.useState('');
  const [polyclinics, setPolyclinics] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsSelectIsDisabled, setDoctorsSelectIsDisabled] = React.useState(
    true
  );
  const [polyclinicsAndDoctors, setPolyclinicsAndDoctors] = React.useState([]);
  const [appointments, setAppointments] = React.useState([]);

  const getPolyclinicsAndDoctors = () => {
    socket
      .sendRequestWithoutArgs('GET_POLYCLINICS_AND_DOCTORS')
      .then(async (data) => {
        if (data) {
          setPolyclinicsAndDoctors(data.polyclinicsAndDoctors);
          var p = [];

          for (var i = 0; i < data.polyclinicsAndDoctors.length; i++) {
            p.push(data.polyclinicsAndDoctors[i].polyclinic);
          }
          setPolyclinics(p);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  React.useEffect(() => {
    getPolyclinicsAndDoctors();
  }, []);

  React.useEffect(() => {
    const setDoctorsSelect = () => {
      if (selectedPolyclinic !== '') {
        var d = [];

        for (var i = 0; i < polyclinicsAndDoctors.length; i++) {
          if (polyclinicsAndDoctors[i].polyclinic === selectedPolyclinic) {
            let ds = polyclinicsAndDoctors[i].doctors;
            for (var j = 0; j < ds.length; j++) {
              d.push(ds[j].name);
            }
          }
        }
        setDoctors(d);
        setDoctorsSelectIsDisabled(false);
      }
    };
    setDoctorsSelect();
  }, [selectedPolyclinic, polyclinicsAndDoctors]);

  const searchAppointments = () => {
    socket
      .sendRequest('SEARCH_APPOINTMENTS', {
        polyclinicName: selectedPolyclinic,
        doctorName: selectedDoctor,
        date: appointmentDate,
      })
      .then(async (data) => {
        if (data) {
          setAppointments(data.appointmentsTime);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  const saveAppointment = (hour) => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('SAVE_APPOINTMENT ', {
        userId: userId,
        polyclinicName: selectedPolyclinic,
        doctorName: selectedDoctor,
        date: appointmentDate,
        hour: hour,
      })
      .then(async (data) => {
        if (data) {
          setAppointments(data.appointmentsTime);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

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
            <BasicSelect
              label="Klinik Seçiniz"
              value={selectedPolyclinic}
              setValue={setSelectedPolyclinic}
              items={polyclinics}
            />
            <BasicSelect
              label="Doktor Seçiniz"
              value={selectedDoctor}
              setValue={setSelectedDoctor}
              items={doctors}
              isDisabled={doctorsSelectIsDisabled}
            />
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
              onClick={() => {
                searchAppointments();
              }}
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
              {appointments.map((appointment, index) => (
                <Grid item xs={3} key={index}>
                  <Button
                    onClick={() => {
                      saveAppointment(appointment.hour);
                    }}
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
                    disabled={appointment.isAvailable}
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
