import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PasswordInput from '../../components/PasswordInput';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
import { socket } from '../../services/socketServices';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
const AdminSignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    let userInfo = {
      username: username,
      password: password,
    };
    await login({ role: 'admin' });
    navigate('/', { replace: true });
    socket
      .sendRequest('ADMIN_LOGIN', userInfo)
      .then(async (data) => {
        if (data?.userPresent) {
          await login({ role: 'admin' });
          navigate('/', { replace: true });
        } else {
          alert('Kullanıcı adı veya parola hatalı.');
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
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
        Yönetici Giriş
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <Input
          id="username"
          label="Kullanıcı Adı"
          isRequired={true}
          value={username}
          setValue={setUsername}
        />
        <PasswordInput label="Şifre" value={password} setValue={setPassword} />

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
          Giriş Yap
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Şifremi Unuttum
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminSignIn;
