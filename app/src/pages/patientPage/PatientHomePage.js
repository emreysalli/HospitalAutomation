import * as React from 'react';
import Box from '@mui/material/Box';
import AppBarAndDrawer from '../../components/AppBarAndDrawer';
import { Outlet } from 'react-router-dom';
export default function PatientHomePage() {
  const listItems = [
    {
      label: 'Hesap Bilgileri',
      iconClassName: 'fa-solid fa-user',
      linkTo: 'account-info',
    },
    {
      label: 'Randevu Al',
      iconClassName: 'fa-solid fa-calendar-plus',
      linkTo: 'make-appointment',
    },
    {
      label: 'Randevularım',
      iconClassName: 'fa-solid fa-calendar',
      linkTo: 'appointments',
    },
    {
      label: 'Geçmiş Randevularım',
      iconClassName: 'fa-solid fa-clock-rotate-left',
      linkTo: 'past-appointments',
    },
    {
      label: 'Tahlil Sonuçları',
      iconClassName: 'fa-solid fa-vials',
      linkTo: 'analysis-results',
    },
    {
      label: 'Reçetelerim',
      iconClassName: 'fa-solid fa-prescription-bottle-medical',
      linkTo: 'prescriptions',
    },
    {
      label: 'İletişim',
      iconClassName: 'fa-solid fa-envelope',
      linkTo: 'inbox',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarAndDrawer title="Hasta Paneli" listItems={listItems} />
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
