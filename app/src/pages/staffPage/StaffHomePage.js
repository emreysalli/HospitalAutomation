import * as React from 'react';
import Box from '@mui/material/Box';
import AppBarAndDrawer from '../../components/AppBarAndDrawer';
import { Outlet } from 'react-router-dom';
export default function StaffHomePage() {
  const listItems = [
    {
      label: 'Hesap Bilgileri',
      iconClassName: 'fa-solid fa-user',
      linkTo: 'account-info',
    },
    {
      label: 'Hasta Kabul',
      iconClassName: 'fa-solid fa-calendar-plus',
      linkTo: 'patient-admission',
    },
    {
      label: 'İletişim',
      iconClassName: 'fa-solid fa-envelope',
      linkTo: 'inbox',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarAndDrawer
        title="Hasta Kabul Personel Paneli"
        listItems={listItems}
      />
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
