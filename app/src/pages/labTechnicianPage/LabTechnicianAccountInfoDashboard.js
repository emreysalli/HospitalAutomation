import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import { socket } from '../../services/socketServices';
import { useSnackbar } from 'notistack';

const LabTechnicianAccountInfoDashboard = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [tcnumber, setTcNumber] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const getLabTechnicianInfo = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_LAB_TECHNICIAN_INFO', { id: userId })
      .then(async (data) => {
        if (data) {
          setName(data.labTechnicianInfo.name);
          setSurname(data.labTechnicianInfo.surname);
          setTcNumber(data.labTechnicianInfo.tcnumber);
          setUsername(data.labTechnicianInfo.username);
          setPassword(data.labTechnicianInfo.password);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const updateLabTechnician = async () => {
    try {
      let userId = localStorage.getItem('id');
      let newLabTechnicianInfo = {
        id: userId,
        name: name,
        surname: surname,
        tcnumber: tcnumber,
        username: username,
        password: password,
      };
      await socket
        .sendRequest('UPDATE_LABTECHNICIAN', newLabTechnicianInfo)
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
    getLabTechnicianInfo();
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
            <Button
              onClick={() => {
                updateLabTechnician();
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
                updateLabTechnician();
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

export default LabTechnicianAccountInfoDashboard;
