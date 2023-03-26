import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Input from './../../components/Input';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PasswordInput from '../../components/PasswordInput';
const AccountInfoDashboard = () => {
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
            <Input id="tcnumber" label="T.C. Kimlik No" isRequired={true} />
            <Input id="name" label="Ad" isRequired={true} />
            <Input id="surname" label="Soyad" isRequired={true} />
            <Input id="gender" label="Cinsiyet" isRequired={true} />
            <Input id="birthplace" label="Doğum Yeri" isRequired={true} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Doğum Tarihi"
                margin="normal"
                required
                sx={{ width: '100%', mt: 1 }}
              />
            </LocalizationProvider>
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
            <Input id="phoneNumber" label="Cep Telefonu" isRequired={true} />
            <Input id="email" label="E-mail" isRequired={true} />
            <Input id="address" label="Adres" isRequired={true} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6">Hesap Bilgileri</Typography>
            <Input id="username" label="Kullanıcı Adı" isRequired={true} />
            <PasswordInput label="Şifre" />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountInfoDashboard;
