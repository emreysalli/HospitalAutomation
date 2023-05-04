import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CustomDataGrid from '../../components/CustomDataGrid';
import { socket } from '../../services/socketServices';

const columns = [
  { field: 'id', headerName: 'Randevu Id', width: 90 },
  {
    field: 'date',
    headerName: 'Tarih',
    width: 120,
  },
  {
    field: 'hour',
    headerName: 'Saat',
    width: 80,
  },
  {
    field: 'tcnumber',
    headerName: 'T.C. Kimlik No',
    type: 'number',
    width: 150,
  },
  {
    field: 'name',
    headerName: 'Hasta Adı',
    width: 140,
  },
  {
    field: 'surname',
    headerName: 'Hasta Soyadı',
    width: 120,
  },
];
const today = dayjs();
const DoctorAppointmentsDashboard = () => {
  const [doctorAppointments, setDoctorAppointments] = React.useState([
    {
      id: 1,
      date: '10.06.2022',
      hour: '08:00',
      tcnumber: '11111111111',
      name: 'emre yasin',
      surname: 'şallı',
    },
    {
      id: 2,
      date: '10.06.2022',
      hour: '08:30',
      tcnumber: '11111111111',
      name: 'emre yasin',
      surname: 'şallı',
    },
    {
      id: 3,
      date: '10.06.2022',
      hour: '09:00',
      tcnumber: '11111111111',
      name: 'emre yasin',
      surname: 'şallı',
    },
  ]);
  const [selectedPatients, setSelectedPatients] = React.useState([]);
  const [appointmentDate, setAppointmentDate] = React.useState('');

  const getDoctorAppointments = () => {
    let userId = localStorage.getItem('id');
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${day}-${month}-${year}`;
    socket
      .sendRequest('GET_DOCTOR_APPOINTMENTS', {
        id: userId,
        date: appointmentDate !== '' ? currentDate : appointmentDate,
      })
      .then(async (data) => {
        if (data) {
          setDoctorAppointments(data.appointments);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  React.useEffect(() => {
    getDoctorAppointments();
  }, []);

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={10} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" mb={1}>
              Randevularım
            </Typography>
            <CustomDataGrid
              rows={doctorAppointments}
              columns={columns}
              selectionModel={selectedPatients}
              setSelectionModel={setSelectedPatients}
              isMustOneSelected={true}
            />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={12} m={2}>
              <Button onClick={() => {}} fullWidth variant="contained">
                Seçili Hasta Muayene Ekranına Git
              </Button>
              <Button onClick={() => {}} fullWidth variant="contained">
                Seçili Hasta Tahlilleri Göster
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Randevu Tarihi Seç</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Tarih"
                margin="normal"
                format="DD/MM/YYYY"
                value={
                  appointmentDate == '' ? dayjs(new Date()) : appointmentDate
                }
                onChange={(value) => {
                  setAppointmentDate(value);
                  // setAppointmentDate(
                  //   new Date(value).toISOString().split('T')[0]
                  // );
                }}
                required
                sx={{ width: '100%', mt: 1 }}
              />
            </LocalizationProvider>
            <Button
              onClick={() => {
                getDoctorAppointments();
              }}
              fullWidth
              format="DD/MM/YYYY"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Randevuları Getir
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DoctorAppointmentsDashboard;
