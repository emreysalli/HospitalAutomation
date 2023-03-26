import * as React from 'react';
import Box from '@mui/material/Box';
import AppBarAndDrawer from '../../components/AppBarAndDrawer';
import { Outlet } from 'react-router-dom';
export default function DoctorHomePage() {
  const listItems = [
    {
      label: 'Kullanıcı',
      iconClassName: 'fa-solid fa-user',
      linkTo: 'admin',
    },
    {
      label: 'Randevularım',
      iconClassName: 'fa-solid fa-user-doctor',
      linkTo: 'doctors',
    },
    {
      label: 'Bekleyen Hasta',
      iconClassName: 'fa-solid fa-house-chimney-medical',
      linkTo: 'polyclinics',
    },
    {
      label: 'Tahlil Sonuçları',
      iconClassName: 'fa-solid fa-flask-vial',
      linkTo: 'labtechnicians',
    },
    {
      label: 'Hasta Kabul Personeller',
      iconClassName: 'fa-solid fa-user-nurse',
      linkTo: 'staff',
    },
    {
      label: 'Hastalar',
      iconClassName: 'fa-solid fa-hospital-user',
      linkTo: 'patients',
    },
    {
      label: 'İletişim',
      iconClassName: 'fa-solid fa-envelope',
      linkTo: 'inbox',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarAndDrawer title="Doktor Paneli" listItems={listItems} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
