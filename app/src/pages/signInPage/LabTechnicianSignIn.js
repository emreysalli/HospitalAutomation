import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PasswordInput from '../../components/PasswordInput';
import Input from '../../components/Input';
import { socket } from '../../services/socketServices';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const LabTechnicianSignIn = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      enqueueSnackbar({
        message: 'Kullanıcı adı ve şifre giriniz.',
        variant: 'error',
      });
      return;
    }
    let userInfo = {
      username: username,
      password: password,
    };
    await login({ role: 'labtechnician' });
    navigate('/', { replace: true });
    socket
      .sendRequest('LAB_TECHNICIAN_LOGIN', userInfo)
      .then(async (data) => {
        if (data?.userPresent) {
          await login({ role: 'labtechnician' });
          navigate('/', { replace: true });
        } else {
          enqueueSnackbar({
            message: 'Kullanıcı adı veya şifre hatalı.',
            variant: 'error',
          });
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
        Laborant Giriş
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
      </Box>
    </Box>
  );
};

export default LabTechnicianSignIn;
