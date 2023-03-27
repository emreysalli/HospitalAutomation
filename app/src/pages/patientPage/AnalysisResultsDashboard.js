import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

const AnalysisResultsDashboard = () => {
  const [analysisResults, setAnalysisResults] = React.useState([
    {
      id: 1,
      date: '16.03.2023',
      transactionName: 'GLUKOZ',
      result: '104',
      resultUnit: 'mg/dL',
      referenceValue: '74 - 106',
    },
    {
      id: 2,
      date: '16.03.2023',
      transactionName: 'KREATİNİN',
      result: '0.66',
      resultUnit: 'mg/dL',
      referenceValue: '0.50 - 0.90',
    },
    {
      id: 3,
      date: '16.03.2023',
      transactionName: 'KOLESTEROL',
      result: '229',
      resultUnit: 'mg/dL',
      referenceValue: '0 - 200',
    },
  ]);

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
