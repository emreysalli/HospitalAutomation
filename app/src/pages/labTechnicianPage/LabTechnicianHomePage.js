import * as React from 'react';
import Box from '@mui/material/Box';
import AppBarAndDrawer from '../../components/AppBarAndDrawer';
import { Outlet } from 'react-router-dom';

export default function LabTechnicianHomePage() {
  const listItems = [
    {
      label: 'Hesap Bilgileri',
      iconClassName: 'fa-solid fa-user',
      linkTo: 'account-info',
    },
    {
      label: ' Hasta Tahlil Sonuçları',
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
      <AppBarAndDrawer title="Laborant Paneli" listItems={listItems} />
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
