import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from './../../components/Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import PasswordInput from '../../components/PasswordInput';
import { socket } from '../../services/socketServices';
import BasicSelect from './../../components/BasicSelect';
import { useSnackbar } from 'notistack';

const AccountInfoDashboard = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [tcnumber, setTcNumber] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bloodGroup, setBloodGroup] = React.useState('');
  const [birthplace, setBirthplace] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const genders = ['e', 'k'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', '0+', '0-', 'AB+', 'AB-'];
  const { enqueueSnackbar } = useSnackbar();

  const getPatientInfo = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_PATIENT_INFO', { id: parseInt(userId) })
      .then(async (data) => {
        if (data) {
          setName(data.patientInfo.name);
          setSurname(data.patientInfo.surname);
          setTcNumber(data.patientInfo.tcnumber);
          setGender(data.patientInfo.gender);
          setBloodGroup(data.patientInfo.bloodGroup);
          setBirthplace(data.patientInfo.birthPlace);
          setBirthdate(data.patientInfo.birthDate);
          setPhoneNumber(data.patientInfo.phoneNumber);
          setAddress(data.patientInfo.address);
          setEmail(data.patientInfo?.email);
          setUsername(data.patientInfo.username);
          setPassword(data.patientInfo.password);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const updatePatient = async () => {
    try {
      let userId = localStorage.getItem('id');
      let dat = new Date(birthdate);
      const yyyy = dat.getFullYear();
      let mm = dat.getMonth() + 1; 
      let dd = dat.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedToday =yyyy+ '-' + mm + '-' + dd;
      let newPatientInfo = {
        id: userId,
        name: name,
        surname: surname,
        tcnumber: tcnumber,
        gender: gender,
        bloodGroup: bloodGroup,
        birthPlace: birthplace,
        birthDate: formattedToday,
        phoneNumber: phoneNumber,
        address: address,
        email: email,
        username: username,
        password: password,
      };
      await socket
        .sendRequest('UPDATE_PATIENT', newPatientInfo)
        .then((data) => {
          if (data) {
            enqueueSnackbar({
              message: 'Bilgiler güncellendi.',
              variant: 'success',
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Bilgiler güncellenemedi.',
            variant: 'error',
          });
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  React.useEffect(() => {
    getPatientInfo();
  }, []);
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
            <Typography variant="h6">Kimlik Bilgileri</Typography>
            <Input
              id="tcnumber"
              label="T.C. Kimlik No"
              isRequired={true}
              value={tcnumber}
              setValue={setTcNumber}
              maxLength={11}
            />
            <Stack direction="row" spacing={2} mt={1}>
              <Input
                id="name"
                label="Ad"
                isRequired={true}
                margin={true}
                value={name}
                setValue={setName}
              />
              <Input
                id="surname"
                label="Soyad"
                isRequired={true}
                value={surname}
                setValue={setSurname}
              />
            </Stack>
            <Stack direction="row" spacing={2}>
              <BasicSelect
                label="Cinsiyet"
                value={gender}
                setValue={setGender}
                items={genders}
              />
              <BasicSelect
                label="Kan Grubu"
                value={bloodGroup}
                setValue={setBloodGroup}
                items={bloodGroups}
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Doğum Tarihi"
                  format="DD/MM/YYYY"
                  value={dayjs(birthdate)}
                  onChange={(value) => setBirthdate(value)}
                  required
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
              <Input
                id="birthplace"
                label="Doğum Yeri"
                isRequired={true}
                value={birthplace}
                setValue={setBirthplace}
              />
            </Stack>
            <Button
              onClick={() => {
                updatePatient();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Kişisel Bilgileri Güncelle
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
            <Typography variant="h6">İletişim Bilgileri</Typography>
            <Input
              id="phoneNumber"
              label="Cep Telefonu"
              isRequired={true}
              value={phoneNumber}
              setValue={setPhoneNumber}
              maxLength={11}
            />
            <Input
              id="email"
              label="E-Posta Adresi"
              isRequired={true}
              value={email}
              setValue={setEmail}
            />
            <Input
              id="address"
              label="Adres"
              isMultiline={true}
              isRequired={true}
              value={address}
              setValue={setAddress}
            />
            <Button
              onClick={() => {
                updatePatient();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              İletişim Bilgileri Güncelle
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">Hesap Bilgileri</Typography>
            <Input
              id="username"
              label="Kullanıcı Adı"
              isRequired={true}
              value={username}
              setValue={setUsername}
            />
            <PasswordInput
              label="Şifre"
              value={password}
              setValue={setPassword}
            />
            <Button
              onClick={() => {
                updatePatient();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Hesap Bilgileri Güncelle
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountInfoDashboard;
