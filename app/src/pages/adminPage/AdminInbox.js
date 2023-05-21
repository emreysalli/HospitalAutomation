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
    field: 'name',
    headerName: 'Ad',
    width: 140,
  },
  {
    field: 'surname',
    headerName: 'Soyad',
    width: 120,
  },
  {
    field: 'requestOrComplaint',
    headerName: 'Talep/Şikayet',
    width: 400,
  },
  {
    field: 'explanation',
    headerName: 'Açıklama',
    width: 200,
  },
  {
    field: 'creationDate',
    headerName: 'Oluşturulma Tarih',
    width: 200,
  },
  {
    field: 'resolutionDate',
    headerName: 'Çözüm Tarihi',
    width: 200,
  },
];

const AdminInbox = () => {
  const [requests, setRequests] = React.useState([]);
  const [selectedRequest, setSelectedRequest] = React.useState([]);
  const [id, setId] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [request, setRequest] = React.useState('');
  const [explanation, setExplanation] = React.useState('');
  const [creationDate, setCreationDate] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const getRequests = () => {
    socket
      .sendRequest('GET_REQUESTS_OR_COMPLAINTS', {user:"admin"})
      .then(async (data) => {
        if (data) {
          setRequests(data.requests);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const getRequest = async () => {
    let temp = requests.find(
      (request) => request.id === setSelectedRequest[0]
    );
    setId(temp.id);
    setName(temp.name);
    setSurname(temp.surname);
    setRequest(temp.request);
    setExplanation(temp.explanation);
    setCreationDate(temp.creationDate)
  };


  const updateExplanation = async () => {
    try {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
  
      let formattedToday = `${year}-${month}-${day}`;
      let temp = {
        id: id,
        resolutionDate: formattedToday,
        explanation: explanation,
      };
      await socket
        .sendRequest('UPDATE_EXPLANATION', temp)
        .then((data) => {
          if (data) {
            enqueueSnackbar({
              message: 'Açıklama gönderildi.',
              variant: 'success',
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Açıklama gönderilemedi.',
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
    setName("");
    setSurname("");
    setRequest("");
    setExplanation("");
    setCreationDate("")
  }

  React.useEffect(() => {
    getRequests();
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
              Gönderilen Talep/Şikayetler
            </Typography>
            <CustomDataGrid
              rows={requests}
              columns={columns}
              selectionModel={selectedRequest}
              setSelectionModel={setSelectedRequest}
              isMustOneSelected={true}
            />
            <Button
              onClick={() => {
                getRequest();
              }}
              fullWidth
              variant="contained"
            >
              Seçili Talep/Şikayete Açıklama Gir
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
              <Typography variant="h6">Talep/Şikayet</Typography>
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
                id="name"
                label="Gönderen Kişi Ad"
                isRequired={true}
                isDisabled={true}
                value={name}
                setValue={setName}
              />
              <Input
                id="surname"
                label="Gönderen Kişi Soyadı"
                isRequired={true}
                isDisabled={true}
                value={surname}
                setValue={setSurname}
              />
              <Input
                id="creationDate"
                label="Oluşturulma Tarihi"
                isRequired={true}
                isDisabled={true}
                value={creationDate}
                setValue={setCreationDate}
              />
              <Input
                id="requestOrComplaint"
                label="İstek/Talep"
                isRequired={true}
                isDisabled={true}
                isMultiline={true}
                value={request}
                setValue={setRequest}
              />
              <Input
                id="explanation"
                label="Açıklama"
                isRequired={true}
                isMultiline={true}
                value={explanation}
                setValue={setExplanation}
              />
            </Stack>
            <Button
              onClick={() => {
                updateExplanation();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Açıklama Gönder
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminInbox;
