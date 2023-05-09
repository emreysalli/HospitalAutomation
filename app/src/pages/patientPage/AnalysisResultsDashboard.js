import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import { socket } from '../../services/socketServices';
// {
//   id: 1,
//   date: '16.03.2023',
//   transactionName: 'GLUKOZ',
//   result: '104',
//   resultUnit: 'mg/dL',
//   referenceValue: '74 - 106',
// }
const AnalysisResultsDashboard = () => {
  const [analysisResults, setAnalysisResults] = React.useState([]);

  const getPatientAnalysisResults = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_PATIENT_ANALYSIS_RESULTS', { id: userId })
      .then(async (data) => {
        if (data) {
          setAnalysisResults(data.analysisResults);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  React.useEffect(() => {
    getPatientAnalysisResults();
  }, []);

  return (
    <Container
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6">Tahlillerim</Typography>
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
              <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={2}>
                {analysisResult.resultUnit}
              </Grid>
              <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={3}>
                {analysisResult.referenceValue}
              </Grid>
            </Grid>
            <Divider />
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default AnalysisResultsDashboard;
