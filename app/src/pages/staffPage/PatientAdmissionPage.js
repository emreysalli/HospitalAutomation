import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Input from '../../components/Input';
import { socket } from '../../services/socketServices';
import dayjs from 'dayjs';
import BasicSelect from '../../components/BasicSelect';

const PatientAdmissionPage = () => {
  const [selectedPolyclinic, setSelectedPolyclinic] = React.useState('');
  const [selectedDoctor, setSelectedDoctor] = React.useState('');
  const [polyclinics, setPolyclinics] = React.useState([]);
  const [doctors, setDoctors] = React.useState([]);
  const [doctorsSelectIsDisabled, setDoctorsSelectIsDisabled] = React.useState(
    true
  );
  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Hasta Bilgileri</Typography>
            <Input
              id="tcnumber"
              label="T.C. Kimlik No"
              isRequired={true}
              value="1111111111"
            />
            <Button onClick={() => {}} fullWidth variant="contained">
              Hasta Sorgula
            </Button>
            <Input
              id="name"
              label="Ad"
              isRequired={true}
              isDisabled={true}
              value="emre yasin"
            />
            <Input
              id="surname"
              label="Soyad"
              isRequired={true}
              isDisabled={true}
              value="şallı"
            />
            <Input
              id="gender"
              label="Cinsiyet"
              isRequired={true}
              isDisabled={true}
              value="erkek"
            />
            <Input
              id="bloodGroup"
              label="Kan Grubu"
              isRequired={true}
              isDisabled={true}
              value="A RH+"
            />
            <Input
              id="birthplace"
              label="Doğum Yeri"
              isRequired={true}
              isDisabled={true}
              value="istanbul"
            />
            <Input
              id="phoneNumber"
              label="Cep Telefonu"
              isRequired={true}
              isDisabled={true}
              value="05376547898"
            />
            <Input
              id="email"
              label="E-posta"
              isRequired={true}
              isDisabled={true}
              value="xxx@gmail.com"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={true}
                label="Doğum Tarihi"
                format="DD/MM/YYYY"
                margin="normal"
                defaultValue={dayjs('2022-04-17')}
                required
                sx={{ width: '100%', mt: 1 }}
              />
            </LocalizationProvider>
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
          </Paper>
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
                  <BasicSelect
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
                  />
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
                    Muayene
                  </Typography>
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
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientAdmissionPage;
