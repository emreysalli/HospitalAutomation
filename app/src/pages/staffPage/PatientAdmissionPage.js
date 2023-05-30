import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Input from '../../components/Input';
import MakeAppointmentBox from './MakeAppointmentBox';
import PatientInfoBox from './PatientInfoBox';
import { socket } from '../../services/socketServices';
import { useSnackbar } from 'notistack';

const PatientAdmissionPage = () => {
  const [emergencyDoctors, setEmergencyDoctors] = React.useState([]);
  const [emergencyId, setEmergencyId] = React.useState('');
  const [selectedUrgentDoctor, setSelectedUrgentDoctor] = React.useState('');
  //patient
  const [patientId, setPatientId] = React.useState('');
  const [illness, setIllness] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const getEmergencyId = async () => {
    await socket
      .sendRequestWithoutArgs('GET_POLYCLINICS')
      .then(async (data) => {
        if (await data) {
          for (let i = 0; i < data.polyclinics.length; i++) {
            if ((await data.polyclinics[i].polyclinicName) === 'Acil') {
              await setEmergencyId(data.polyclinics[i].id);
              return data.polyclinics[i].id;
            }
          }
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleChangeDoctor = (event) => {
    setSelectedUrgentDoctor(event.target.value);
  };

  useEffect(() => {
    getEmergencyId();
  }, []);

  useEffect(() => {
    const getEmergencyDoctors = async () => {
      await socket
        .sendRequest('GET_DOCTORS_OF_POLYCLINIC', {
          polyclinicId: emergencyId,
        })
        .then(async (data) => {
          if (data) {
            setEmergencyDoctors(data.doctors);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    getEmergencyDoctors();
  }, [emergencyId]);

  const addPatientToEmergency =()=>{
      let dat = new Date();
      const yyyy = dat.getFullYear();
      let mm = dat.getMonth() + 1; 
      let dd = dat.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      let formattedToday = yyyy+ '-' + mm + '-' + dd;
      socket
        .sendRequest('ADD_PATIENT_TO_EMERGENCY', {
          doctorId:selectedUrgentDoctor.id,
          patientId: patientId,
          illness:illness,
          date:formattedToday
        })
        .then(async (data) => {
          if (data.isRecorded) {
            enqueueSnackbar({
              message: 'Kayıt başarılı.',
              variant: 'success',
            });
          }else{
            if(data.doctorsAvailable){
              enqueueSnackbar({
                message: 'Lütfen başka bir acil doktoru seçiniz.',
                variant: 'error',
              });
            }else{
              enqueueSnackbar({
                message: 'Tüm acil doktorları dolu lütfen muayeneye yönlendiriniz.',
                variant: 'error',
              });
            }
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
  }

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
          <PatientInfoBox patientId={patientId} setPatientId={setPatientId} />
        </Grid>
        <Grid item xs={12} md={9} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Gideceği Birim</Typography>
            <Grid container spacing={3} mt={1}>
              <Grid item xs={12} md={6} lg={6}>
                <Box
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    borderStyle: 'solid',
                    borderWidth: 1,
                    borderColor: 'rgba(0, 0, 0, .3)',
                    borderRadius: '10px',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    Acil
                  </Typography>
                  <Box sx={{ minWidth: 120, width: '100%' }}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="demo-simple-select-label">
                        Acil Doktoru Seçiniz
                      </InputLabel>
                      <Select
                        defaultValue=""
                        value={selectedUrgentDoctor}
                        label="Acil Doktoru Seçiniz"
                        onChange={handleChangeDoctor}
                      >
                        {emergencyDoctors.map((name, index) => {
                          return (
                            <MenuItem value={name} key={index}>
                              {name.doctor}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                  <Input
                    id="complaint"
                    label="Şikayet"
                    isMultiline={true}
                    isRequired={true}
                    value={illness}
                    setValue={setIllness}
                  />
                  <Button
                    onClick={() => {addPatientToEmergency()}}
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
                    Kaydet
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <MakeAppointmentBox patientId={patientId} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientAdmissionPage;
