import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
const PatientSignIn = () => {
  const { login } = useContext(AuthContext);
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
        my: '25%',
        mx: 6,
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
        Hasta Giriş
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="userName"
          label="Kullanıcı Adı"
          name="userName"
          autoComplete="userName"
          autoFocus
        />
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
          Giriş Yap
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Şifremi Unuttum
            </Link>
          </Grid>
          <Grid item>
            <Link to="../patientsignup" variant="body2">
              Hesabınız yok mu? Üye Ol
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientSignIn;
