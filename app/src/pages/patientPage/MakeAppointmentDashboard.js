import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { socket } from '../../services/socketServices';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';

const hours = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FAFAFA',
    color: '#000000',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const MakeAppointmentDashboard = () => {
  const [appointmentDate, setAppointmentDate] = React.useState('');
  const [selectedPolyclinic, setSelectedPolyclinic] = React.useState('');
  const [selectedDoctor, setSelectedDoctor] = React.useState('');
  const [polyclinics, setPolyclinics] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsSelectIsDisabled, setDoctorsSelectIsDisabled] = React.useState(
    true
  );
  const [hoursIsDisabled, setHoursIsDisabled] = React.useState(false);
  const [appointments, setAppointments] = React.useState([]);
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getPolyclinics = () => {
    socket
      .sendRequestWithoutArgs('GET_POLYCLINICS')
      .then(async (data) => {
        if (data) {
          setPolyclinics(data.polyclinics);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleChange = (event) => {
    setSelectedPolyclinic(event.target.value);
  };

  const handleChangeDoctor = (event) => {
    setSelectedDoctor(event.target.value);
  };

  React.useEffect(() => {
    getPolyclinics();
  }, []);

  React.useEffect(() => {
    const getDoctorsOfPolyclinic = () => {
      setSelectedDoctor("");
      socket
        .sendRequest('GET_DOCTORS_OF_POLYCLINIC', {
          polyclinicId: selectedPolyclinic.id,
        })
        .then(async (data) => {
          if (data) {
            setDoctors(data.doctors);
            if (selectedPolyclinic !== '') {
              setDoctorsSelectIsDisabled(false);
            }
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    getDoctorsOfPolyclinic();
  }, [selectedPolyclinic]);

  const searchAppointments = () => {
    let a = dayjs(appointmentDate);
    let b = a.add(3, 'hour');
    let c = new Date(b);
    let appointmentInfo = {
      polyclinicId: selectedPolyclinic.id,
      doctorId: selectedDoctor.id,
      appointmentDate: c,
    };
    socket
      .sendRequest('SEARCH_APPOINTMENTS', appointmentInfo)
      .then(async (data) => {
        if (data) {
          let a = [];
          let b = data.appointments;
          for (let index = 0; index < b.length; index++) {
            a.push(b[index].appointmentHour);
          }
          setAppointments(a);
          setHoursIsDisabled(true);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const saveAppointment = (hour) => {
    let patientId = localStorage.getItem('id');
    
      let dat = new Date(appointmentDate);
      const yyyy = dat.getFullYear();
      let mm = dat.getMonth() + 1; 
      let dd = dat.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday =yyyy+ '-' + mm + '-' + dd;
    socket
      .sendRequest('SAVE_APPOINTMENT', {
        patientId: patientId,
        polyclinicName: selectedPolyclinic.polyclinicName,
        doctorId: selectedDoctor.id,
        appointmentDate: formattedToday,
        appointmentHour: hour,
      })
      .then(async (data) => {
        if (data) {
          searchAppointments();
          setPromiseArguments(null);
          enqueueSnackbar({
            message: 'Randevunuz oluşturuldu.',
            variant: 'success',
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar({
          message: 'Randevunuz oluşturulamadı.',
          variant: 'error',
        });
        console.error(err.message);
      });
  };

  const handleEntered = () => {};

  const handleNo = () => {
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    saveAppointment(promiseArguments.hour);
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }
    console.log(promiseArguments.date)
    let dat = new Date(promiseArguments.date);
    const yyyy = dat.getFullYear();
    let mm = dat.getMonth() + 1;
    let dd = dat.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '.' + mm + '.' + yyyy;
    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={true}
      >
        <DialogTitle onClose={handleNo}>
          Randevu Onayla
          <IconButton
            aria-label="close"
            onClick={handleNo}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table aria-label="a dense table">
              <TableBody>
                <TableRow>
                  <StyledTableCell variant="head">
                    Randevu Zamanı
                  </StyledTableCell>
                  <TableCell>
                    {formattedToday} {promiseArguments.hour}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell variant="head">
                    Poliklinik Adı
                  </StyledTableCell>
                  <TableCell>{selectedPolyclinic.polyclinicName}</TableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell variant="head">Doktor Adı</StyledTableCell>
                  <TableCell>{selectedDoctor.doctor}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYes}>Randevu Onayla</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      {renderConfirmDialog()}
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
            <Box sx={{ minWidth: 120, width: '100%' }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">
                  Klinik Seçiniz
                </InputLabel>
                <Select
                  defaultValue=""
                  value={selectedPolyclinic}
                  label="Klinik Seçiniz"
                  onChange={handleChange}
                >
                  {polyclinics.map((name, index) => {
                    return (
                      <MenuItem value={name} key={index}>
                        {name.polyclinicName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120, width: '100%' }}>
              <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">
                  Doktor Seçiniz
                </InputLabel>
                <Select
                  defaultValue=""
                  value={selectedDoctor}
                  label="Doktor Seçiniz"
                  disabled={doctorsSelectIsDisabled}
                  onChange={handleChangeDoctor}
                >
                  {doctors.map((name, index) => {
                    return (
                      <MenuItem value={name} key={index}>
                        {name.doctor}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Randevu Tarihi Seçiniz"
                format="DD/MM/YYYY"
                value={appointmentDate}
                minDate={dayjs()}
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
            {hoursIsDisabled ? (
              <Grid container spacing={2}>
                {hours.map((hour, index) => (
                  <Grid item xs={3} key={index}>
                    <Button
                      onClick={() => {
                        let patientId = localStorage.getItem('id');
                        setPromiseArguments({
                          patientId: patientId,
                          polyclinicName: selectedPolyclinic,
                          doctorName: selectedDoctor,
                          date: appointmentDate,
                          hour: hour,
                        });
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
                      disabled={appointments.includes(hour) ? true : false}
                    >
                      {hour}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid item xs={3}></Grid>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MakeAppointmentDashboard;
