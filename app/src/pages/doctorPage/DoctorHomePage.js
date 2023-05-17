import * as React from 'react';
import Box from '@mui/material/Box';
import AppBarAndDrawer from '../../components/AppBarAndDrawer';
import { Outlet } from 'react-router-dom';
export default function DoctorHomePage() {
  const listItems = [
    {
      label: 'Hesap Bilgileri',
      iconClassName: 'fa-solid fa-user',
      linkTo: 'account-info',
    },
    {
      label: 'Randevularım',
      iconClassName: 'fa-solid fa-calendar-plus',
      linkTo: 'appointments',
    },
    {
      label: 'Hasta Muayene',
      iconClassName: 'fa-solid fa-hospital-user',
      linkTo: 'patient-examination',
    },
    {
      label: 'Tahlil Sonuçları',
      iconClassName: 'fa-solid fa-vials',
      linkTo: 'patient-analysis-results',
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
