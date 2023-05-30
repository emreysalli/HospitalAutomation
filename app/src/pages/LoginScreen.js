import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import adminImage from '../assets/images/admin.png';
import patientImage from '../assets/images/patient.png';
import staffImage from '../assets/images/staff.jpg';
import labtechnicianImage from '../assets/images/labtechnician.png';
import doctorImage from '../assets/images/doctor.jpg';

import { Link } from 'react-router-dom';
const images = [
  {
    url: adminImage,
    title: 'Yönetici',
    width: '30%',
    to: 'signin/admin',
  },
  {
    url: patientImage,
    title: 'Hasta',
    width: '40%',
    to: 'signin/patient',
  },
  {
    url: doctorImage,
    title: 'Doktor',
    width: '30%',
    to: 'signin/doctor',
  },
  {
    url: staffImage,
    title: 'Hasta Kabul Personel',
    width: '50%',
    to: 'signin/staff',
  },
  {
    url: labtechnicianImage,
    title: 'Laborant',
    width: '50%',
    to: 'signin/labtechnician',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: '47vh',
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: '20vh',
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBases() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
      }}
      style={{ overflow: 'hidden' }}
    >
      {images.map((image) => (
        <ImageButton
          component={Link}
          to={image.to}
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}
