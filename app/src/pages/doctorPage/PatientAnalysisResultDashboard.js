import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import Input from '../../components/Input';
import { socket } from '../../services/socketServices';
import {useLocation} from 'react-router-dom';
import { useSnackbar } from 'notistack';

const PatientAnalysisResultDashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [analysisResults, setAnalysisResults] = React.useState([]);
  const [patientTcNumber, setPatientTcNumber] = React.useState("");

  const getPatientAnalysisResults = () => {
    socket
      .sendRequest('GET_PATIENT_ANALYSIS_RESULTS', {patientId:location?.state?.patientId })
      .then(async (data) => {
        if (data) {
          setAnalysisResults(data.analysisResults);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const getPatientAnalysisResultsWithTcNumber = () => {
    if(patientTcNumber.length<11 || patientTcNumber===""){
      enqueueSnackbar({
        message: 'Hasta T.C. Kimlik No hatalı girdiniz.',
        variant: 'error',
      });
      return;
    }
    socket
      .sendRequest('DOCTOR_ANALYSIS_RESULTS', { tcnumber:  patientTcNumber})
      .then(async (data) => {
        if (data) {
          setAnalysisResults(data.analysisResults);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  React.useEffect(() => {
    if (location?.state?.patientId === undefined) {
      enqueueSnackbar({
        message: 'Hasta T.C. Kimlik No giriniz.',
        variant: 'info',
      });
    }else{
      getPatientAnalysisResults()
    }
  }, []);

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={10} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Hasta Tahlil Sonuçları</Typography>
            <Box sx={{ backgroundColor: '#F5F5F5', paddingX: 1 }}>
              <Grid container spacing={2} my={1}>
                <Grid item xs={4} md={2}>
                  Tarih
                </Grid>
                <Grid item xs={4} md={3}>
                  İşlem Adı
                </Grid>
                <Grid item xs={4} md={2}>
                  Sonuç
                </Grid>
                <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={2}>
                  Sonuç Birimi
                </Grid>
                <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={3}>
                  Referans Değeri
                </Grid>
              </Grid>
              <Divider />
            </Box>
            {analysisResults.map((analysisResult, index) => (
              <Box
                sx={{
                  backgroundColor: index % 2 === 0 ? '#F7F7FC' : '#FFFFFF',
                  paddingX: 1,
                }}
                key={index}
              >
                <Grid container spacing={2} my={1}>
                  <Grid item xs={4} md={2}>
                    {analysisResult.date}
                  </Grid>
                  <Grid item xs={4} md={3}>
                    {analysisResult.transactionName}
                  </Grid>
                  <Grid item xs={4} md={2}>
                    {analysisResult.result}
                  </Grid>
                  <Grid
                    item
                    sx={{ display: { xs: 'none', md: 'block' } }}
                    md={2}
                  >
                    {analysisResult.resultUnit}
                  </Grid>
                  <Grid
                    item
                    sx={{ display: { xs: 'none', md: 'block' } }}
                    md={3}
                  >
                    {analysisResult.referenceValue}
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={12} md={2} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Hasta Tahlil Göster</Typography>
            <Input
              id="tcnumber"
              label="T.C. Kimlik No"
              isRequired={true}
              value={patientTcNumber}
              setValue={setPatientTcNumber}
              maxLength={11}
            />
            <Button
              onClick={() => {
                getPatientAnalysisResultsWithTcNumber();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Tahlilleri Getir
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientAnalysisResultDashboard;
