import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { socket } from '../../services/socketServices';

const PrescriptionsDashboard = () => {
  const [showDialog, setShowDialog] = React.useState(null);
  const [prescriptions, setPrescriptions] = React.useState([
    {
      id: 1,
      date: '16.03.2023',
      prescriptionNo: '1TK2YOS',
      doctor: 'Emre Yasin Şallı',
      medicines: [
        {
          id: 1,
          medicineName: 'MAGVİTAL 365 MG',
          dose: 1,
          period: '1 GÜN',
          usage: 'Ağızdan',
          numberOfUses: 1,
          totalBox: 1,
        },
        {
          id: 2,
          medicineName: 'MAGVİTAL 365 MG',
          dose: 1,
          period: '1 GÜN',
          usage: 'Ağızdan',
          numberOfUses: 1,
          totalBox: 1,
        },
        {
          id: 3,
          medicineName: 'MAGVİTAL 365 MG',
          dose: 1,
          period: '1 GÜN',
          usage: 'Ağızdan',
          numberOfUses: 1,
          totalBox: 1,
        },
      ],
    },
    {
      id: 2,
      date: '16.03.2023',
      prescriptionNo: '1TK2YOS',
      doctor: 'Emre Yasin Şallı',
      medicines: [
        {
          id: 1,
          medicineName: 'MAGVİTAL 365 MG',
          dose: 1,
          period: '1 GÜN',
          usage: 'Ağızdan',
          numberOfUses: 1,
          totalBox: 1,
        },
      ],
    },
    {
      id: 1,
      date: '16.03.2023',
      prescriptionNo: '1TK2YOS',
      doctor: 'Emre Yasin Şallı',
      medicines: [
        {
          id: 1,
          medicineName: 'MAGVİTAL 365 MG',
          dose: 1,
          period: '1 GÜN',
          usage: 'Ağızdan',
          numberOfUses: 1,
          totalBox: 1,
        },
      ],
    },
  ]);
  const getPatientPrescriptions = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_PATIENT_PRESCRIPTIONS', { id: userId })
      .then(async (data) => {
        if (data) {
          setPrescriptions(data.prescriptions);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const getPatientMedicines = (prescriptionId) => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_PATIENT_MEDICINES', { id: userId, prescriptionId: prescriptionId})
      .then(async (data) => {
        if (data) {
          console.log(data.prescriptions);
          setShowDialog(data.prescriptions);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  React.useEffect(() => {
    getPatientPrescriptions();
  }, []);

  const renderConfirmDialog = () => {
    if (!showDialog) {
      return null;
    }
    const medicines = showDialog;

    return (
      <Dialog
        open={true}
        onClose={() => {
          setShowDialog(null);
        }}
      >
        <DialogTitle id="responsive-dialog-title">
          Reçetede Yazan İlaçlar
          <IconButton
            aria-label="close"
            onClick={() => {
              setShowDialog(null);
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ backgroundColor: '#F5F5F5', paddingX: 1 }}>
            <Grid container spacing={3} my={1}>
              <Grid item xs={2}>
                İlaç Adı
              </Grid>
              <Grid item xs={2}>
                Doz
              </Grid>
              <Grid item xs={2}>
                Periyot
              </Grid>
              <Grid item xs={2}>
                Kullanım Şekli
              </Grid>
              <Grid item xs={2}>
                Kullanım Sayısı
              </Grid>
              <Grid item xs={2}>
                Kutu Adedi
              </Grid>
            </Grid>
            <Divider />
          </Box>
          {medicines.map((medicine, index) => (
            <Box
              sx={{
                paddingX: 1,
              }}
              key={index}
            >
              <Grid container spacing={3} my={1}>
                <Grid item xs={2}>
                  {medicine.medicineName}
                </Grid>
                <Grid item xs={2}>
                  {medicine.dose}
                </Grid>
                <Grid item xs={2}>
                  {medicine.period}
                </Grid>
                <Grid item xs={2}>
                  {medicine.medicineUsage}
                </Grid>
                <Grid item xs={2}>
                  {medicine.numberOfUses}
                </Grid>
                <Grid item xs={2}>
                  {medicine.totalBox}
                </Grid>
              </Grid>
              <Divider />
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    );
  };
  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      {renderConfirmDialog()}
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">Reçetelerim</Typography>
        <Box sx={{ backgroundColor: '#F5F5F5', paddingX: 1 }}>
          <Grid container spacing={2} my={1}>
            <Grid item xs={3}>
              Tarih
            </Grid>
            <Grid item xs={3}>
              Reçete No
            </Grid>
            <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={3}>
              Hekim
            </Grid>
            <Grid item xs={6} md={3}></Grid>
          </Grid>
          <Divider />
        </Box>
        {prescriptions.map((prescription, index) => (
          <Box
            sx={{
              paddingX: 1,
            }}
            key={index}
          >
            <Grid container spacing={2} my={1}>
              <Grid item xs={3}>
                {prescription.date}
              </Grid>
              <Grid item xs={3}>
                {prescription.prescriptionNo}
              </Grid>
              <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={3}>
                {prescription.doctor}
              </Grid>
              <Grid item xs={6} md={3}>
                <Button
                  onClick={() => {
                    getPatientMedicines(prescription.id);
                    
                  }}
                  variant="contained"
                  sx={{ borderRadius: '50px' }}
                >
                  Detay Görüntüle
                </Button>
              </Grid>
            </Grid>
            <Divider />
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default PrescriptionsDashboard;
