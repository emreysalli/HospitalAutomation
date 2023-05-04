import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CustomDataGrid from '../../components/CustomDataGrid';
import Input from './../../components/Input';
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

const LTPatientAnalysisResultDashboard = () => {
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
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" mb={1}>
              İstenilen Hasta Tahlilleri
            </Typography>
            <CustomDataGrid
              rows={doctorAppointments}
              columns={columns}
              selectionModel={selectedPatients}
              setSelectionModel={setSelectedPatients}
              isMustOneSelected={true}
            />
            <Button onClick={() => {}} fullWidth variant="contained">
              Seçili Tahlile Sonuç Gir
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Hasta Tahlili</Typography>
            <Input
              id="date"
              label="Seçili Hasta T.C. Kimlik No"
              isRequired={true}
            />
            <Input id="selectedTest" label="Seçili Test" isRequired={true} />
            <Input id="date" label="Tarih" isRequired={true} />
            <Input
              id="testResult"
              label="Test Sonucu"
              isMultiline={true}
              isRequired={true}
            />
            <Button
              onClick={() => {
                getDoctorAppointments();
              }}
              fullWidth
              format="DD/MM/YYYY"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Test Sonucu Gönder
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LTPatientAnalysisResultDashboard;
