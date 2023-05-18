import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CustomDataGrid from '../../components/CustomDataGrid';
import Input from './../../components/Input';
import { socket } from '../../services/socketServices';
import { useSnackbar } from 'notistack';

const columns = [
  { field: 'id', headerName: 'Tahlil Id', width: 70 },
  {
    field: 'date',
    headerName: 'Tarih',
    width: 150,
  },
  {
    field: 'patient',
    headerName: 'Hasta Adı Soyadı',
    width: 150,
  },
  {
    field: 'transactionName',
    headerName: 'İşlem Adı',
    width: 110,
  },
  {
    field: 'result',
    headerName: 'Sonuç',
    width: 90,
  },
  {
    field: 'resultUnit',
    headerName: 'Sonuç Birimi',
    width: 120,
  },
  {
    field: 'referenceValue',
    headerName: 'Referans Değeri',
    width: 150,
  },
];

const LTPatientAnalysisResultDashboard = () => {
  const [analysisResults, setAnalysisResults] = React.useState([]);
  const [selectedAnalysisResult, setSelectedAnalysisResult] = React.useState(
    []
  );
  const [id, setId] = React.useState('');
  const [date, setDate] = React.useState('');
  const [patient, setPatient] = React.useState('');
  const [transactionName, setTransactionName] = React.useState('');
  const [result, setResult] = React.useState('');
  const [resultUnit, setResultUnit] = React.useState('');
  const [referenceValue, setReferenceValue] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const getLabTechnicianInfo = () => {
    socket
      .sendRequest('GET_INCONCLUSIVE_ANALYSIS_RESULTS', {})
      .then(async (data) => {
        console.log(data);
        if (data) {
          setAnalysisResults(data.analysisResults);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const getAnalysisResult = async () => {
    let temp = analysisResults.find(
      (analysisResult) => analysisResult.id === selectedAnalysisResult[0]
    );
    setId(temp.id);
    setDate(temp.date);
    setPatient(temp.patient);
    setTransactionName(temp.transactionName);
    setReferenceValue(temp.referenceValue);
    setResultUnit(temp.resultUnit);
    setResult(temp.result);
  };

  // UPDATE_ANALYSIS_RESULT

  const updateResult = async () => {
    try {
      let temp = {
        id: id,
        result: result,
      };
      await socket
        .sendRequest('UPDATE_ANALYSIS_RESULT', temp)
        .then((data) => {
          if (data) {
            enqueueSnackbar({
              message: 'Bilgiler güncellendi.',
              variant: 'success',
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Bilgiler güncellenemedi.',
            variant: 'error',
          });
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInputs=()=>{
    setId("");
    setDate("");
    setPatient("");
    setTransactionName("");
    setReferenceValue("");
    setResultUnit("");
    setResult("");
  }

  React.useEffect(() => {
    getLabTechnicianInfo();
  }, []);

  return (
    <Box px={20} pt={10}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" mb={1}>
              İstenilen Hasta Tahlilleri
            </Typography>
            <CustomDataGrid
              rows={analysisResults}
              columns={columns}
              selectionModel={selectedAnalysisResult}
              setSelectionModel={setSelectedAnalysisResult}
              isMustOneSelected={true}
            />
            <Button
              onClick={() => {
                getAnalysisResult();
              }}
              fullWidth
              variant="contained"
            >
              Seçili Tahlile Sonuç Gir
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack direction="row" spacing={2} mt={1} style={{justifyContent:"space-between"}}>
              <Typography variant="h6">Hasta Tahlili</Typography>
              <Button
                onClick={() => {
                  deleteInputs();
                }}
                variant="contained"
                
              >
                Temizle
              </Button>
            </Stack>
            <Stack spacing={2} mt={1}>
              <Input
                id="date"
                label="Tahlil Tarihi"
                isRequired={true}
                isDisabled={true}
                value={date}
                setValue={setDate}
              />
              <Input
                id="patient"
                label="Hasta Adı Soyadı"
                isRequired={true}
                isDisabled={true}
                value={patient}
                setValue={setPatient}
              />
              <Input
                id="transactionName"
                label="İşlem Adı"
                isRequired={true}
                isDisabled={true}
                value={transactionName}
                setValue={setTransactionName}
              />
              <Input
                id="referenceValue"
                label="Referans Değeri"
                isRequired={true}
                isDisabled={true}
                value={referenceValue}
                setValue={setReferenceValue}
              />
              <Input
                id="resultUnit"
                label="Sonuç Birimi"
                isRequired={true}
                isDisabled={true}
                value={resultUnit}
                setValue={setResultUnit}
              />
              <Input
                id="result"
                label="Sonuç"
                isRequired={true}
                value={result}
                setValue={setResult}
              />
            </Stack>
            <Button
              onClick={() => {
                updateResult();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Test Sonucu Gönder
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LTPatientAnalysisResultDashboard;
