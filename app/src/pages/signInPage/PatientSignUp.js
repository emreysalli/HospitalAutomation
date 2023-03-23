import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import { socket } from '../../services/socketServices';
import { AuthContext } from '../../contexts/AuthContext';
import { Stack } from '@mui/material';
import Input from '../../components/Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const PatientSignUp = () => {
  const { login } = useContext(AuthContext);
  const [birthdate, setBirthdate] = React.useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({});
    let userInfo = {
      username: data.get('userName'),
      password: data.get('password'),
    };
    socket
      .sendRequest('login', userInfo)
      .then(async (data) => {
        await login(data.userToken);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          <Input id="name" label="Ad" isRequired={true} margin={true} />
          <Input id="surname" label="Soyad" isRequired={true} />
        </Stack>
        <Input id="tc" label="T.C Kimlik Numarası" isRequired={true} />
        <Input id="email" label="E-mail" isRequired={true} />
        <Input id="username" label="Kullanıcı Adı" isRequired={true} />
        <Input id="phoneNumber" label="Cep Telefonu" isRequired={true} />
        <Stack direction="row" spacing={2} mt={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Doğum Tarihi"
              value={birthdate}
              onChange={(value) => setBirthdate(value)}
              required
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
          <Input id="birthplace" label="Doğum Yeri" isRequired={true} />
        </Stack>

        <FormControl
          margin="normal"
          required
          fullWidth
          variant="outlined"
          id="password"
          name="password"
        >
          <InputLabel htmlFor="outlined-adornment-password">Şifre</InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="password"
          />
        </FormControl>

        <FormControl
          margin="normal"
          required
          fullWidth
          variant="outlined"
          id="password"
          name="password"
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Şifre Tekrar
          </InputLabel>
          <OutlinedInput
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="password"
          />
        </FormControl>

        <Button
          component={Link}
          type="submit"
          to="../../admin"
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
