import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import MakeAppointmentBox from './MakeAppointmentBox';
import PatientInfoBox from './PatientInfoBox';

const PatientAdmissionPage = () => {
  //patient
  const [patientId, setPatientId] = React.useState('');

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
                  {/* <BasicSelect
                    label="Durum Seçiniz"
                    value={selectedPolyclinic}
                    setValue={setSelectedPolyclinic}
                    items={polyclinics}
                  />
                  <BasicSelect
                    label="Acil Klinik Seçiniz"
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
                  /> */}
                  <Input
                    id="complaint"
                    label="Şikayet"
                    isMultiline={true}
                    isRequired={true}
                  />
                  <Button
                    onClick={() => {}}
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
