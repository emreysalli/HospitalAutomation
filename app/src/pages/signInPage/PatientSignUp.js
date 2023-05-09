import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { socket } from '../../services/socketServices';
import { AuthContext } from '../../contexts/AuthContext';
import { Stack } from '@mui/material';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const PatientSignUp = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [tcnumber, setTcNumber] = React.useState('');
  const [birthplace, setBirthplace] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRepassword] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      name === '' ||
      surname === '' ||
      tcnumber === '' ||
      birthplace === '' ||
      birthdate === '' ||
      phoneNumber === '' ||
      email === '' ||
      username === '' ||
      password === ''
    ) {
      enqueueSnackbar({
        message:
          'Ad, soyad, T.C. kimlik no, doğum yeri, doğum tarihi, telefon numarası, e-mail, kullanıcı adı ve şifre giriniz.',
        variant: 'error',
      });
      return;
    }
    if (password !== repassword) {
      enqueueSnackbar({
        message: 'Şifre ve tekrar şifre aynı değil.',
        variant: 'error',
      });
      return;
    }
    try {
      let newPatientInfo = {
        name: name,
        surname: surname,
        tcnumber: tcnumber,
        birthPlace: birthplace,
        birthDate: birthdate,
        phoneNumber: phoneNumber,
        email: email,
        username: username,
        password: password,
      };
      await socket
        .sendRequest('ADD_PATIENT', newPatientInfo)
        .then(async (data) => {
          await login({ role: 'patient', id: data?.id });
          navigate('/', { replace: true });
          enqueueSnackbar({
            message: 'Kayıt başarıyla oluşturuldu.',
            variant: 'success',
          });
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        mx: 6,
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Hasta Kayıt Ol
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Stack direction="row" spacing={2}>
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
        <Input
          id="tc"
          label="T.C Kimlik Numarası"
          isRequired={true}
          value={tcnumber}
          setValue={setTcNumber}
        />
        <Input
          id="email"
          label="E-mail"
          isRequired={true}
          value={email}
          setValue={setEmail}
        />
        <Input
          id="username"
          label="Kullanıcı Adı"
          isRequired={true}
          value={username}
          setValue={setUsername}
        />
        <Input
          id="phoneNumber"
          label="Cep Telefonu"
          isRequired={true}
          value={phoneNumber}
          setValue={setPhoneNumber}
        />
        <Stack direction="row" spacing={2} mt={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Doğum Tarihi"
              value={birthdate}
              onChange={(value) => setBirthdate(value)}
              format="DD/MM/YYYY"
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

        <PasswordInput label="Şifre" value={password} setValue={setPassword} />

        <PasswordInput
          label="Şifre Tekrar"
          value={repassword}
          setValue={setRepassword}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            borderRadius: 50,
            py: 1,
            fontSize: 20,
          }}
        >
          Kayıt Ol
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link to="../patient" variant="body2">
              Zaten hesabınız var mı? Giriş yap
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientSignUp;
