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
  { field: 'id', headerName: 'İletişim Id', width: 90 },
  {
    field: 'subject',
    headerName: 'Talep/Şikayet',
    width: 400,
  },
  {
    field: 'description',
    headerName: 'Açıklama',
    width: 200,
  },
  {
    field: 'creationDate',
    headerName: 'Oluşturulma Tarih',
    width: 200,
  },
  {
    field: 'solutionDate',
    headerName: 'Çözüm Tarihi',
    width: 200,
  },
];

const LabTechnicianInbox = () => {
  const [requests, setRequests] = React.useState([]);
  const [selectedRequest, setSelectedRequest] = React.useState([]);
  const [request, setRequest] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const getPatientInfo = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_LAB_TECHNICIAN_INFO', { id: parseInt(userId) })
      .then(async (data) => {
        if (data) {
          setName(data.labTechnicianInfo.name);
          setSurname(data.labTechnicianInfo.surname);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const getRequests = () => {
    let userId = localStorage.getItem('id');
    socket
      .sendRequest('GET_USER_WISHES_AND_COMPLAINTS', {
        userId: parseInt(userId),
        userType: 'labtechnician',
      })
      .then(async (data) => {
        if (data) {
          setRequests(data.wishes);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const sendRequest = () => {
    let userId = localStorage.getItem('id');
    let dat = new Date();
    const yyyy = dat.getFullYear();
    let mm = dat.getMonth() + 1;
    let dd = dat.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedToday = yyyy + '-' + mm + '-' + dd;
    socket
      .sendRequest('SEND_WISH_AND_COMPLAINT', {
        userId: parseInt(userId),
        userType: 'labtechnician',
        creationDate: formattedToday,
        subject: request,
        name:name,
        surname:surname,
      })
      .then(async (data) => {
        if (data) {
          enqueueSnackbar({
            message: 'Talep/Şikayetiniz gönderildi.',
            variant: 'success',
          });
          setRequest("");
          getRequests();
        }
      })
      .catch((err) => {
        enqueueSnackbar({
          message: 'Talep/Şikayetiniz gönderilemedi.',
          variant: 'error',
        });
        console.error(err.message);
      });
  };

  const deleteInputs = () => {
    setRequest('');
  };

  React.useEffect(() => {
    getRequests();
    getPatientInfo();
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
              Talep/Şikayetleriniz
            </Typography>
            <CustomDataGrid
              rows={requests}
              columns={columns}
              selectionModel={selectedRequest}
              setSelectionModel={setSelectedRequest}
              isMustOneSelected={true}
            />
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
            <Stack
              direction="row"
              spacing={2}
              mt={1}
              style={{ justifyContent: 'space-between' }}
            >
              <Typography variant="h6">Talep/Şikayet Gönder</Typography>
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
                id="requestOrComplaint"
                label="İstek/Talep"
                isRequired={true}
                isMultiline={true}
                value={request}
                setValue={setRequest}
              />
            </Stack>
            <Button
              onClick={() => {
                sendRequest();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Gönder
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LabTechnicianInbox;
