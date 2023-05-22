import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
import { socket } from '../../services/socketServices';
import { useSnackbar } from 'notistack';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'polyclinicName',
    headerName: 'Poliklinik Adı',
    width: 150,
    editable: true,
  },
];

const PolyclinicDashboard = () => {
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [polyclinicName, setPolyclinicName] = React.useState('');
  const { enqueueSnackbar } = useSnackbar();

  const getPolyclinics = async () => {
    try {
      await socket
        .sendRequestWithoutArgs('GET_POLYCLINICS')
        .then((data) => {
          if (data) {
            setRows(data.polyclinics);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const addPolyclinic = async () => {
    try {
      if (polyclinicName === '') {
        enqueueSnackbar({
          message: 'Poliklinik giriniz.',
          variant: 'error',
        });
        return;
      }
      let polyclinicInfo = {
        polyclinicName: polyclinicName,
      };
      await socket
        .sendRequest('ADD_POLYCLINIC', polyclinicInfo)
        .then((data) => {
          if (data) {
            enqueueSnackbar({
              message: 'Yeni poliklinik eklendi.',
              variant: 'success',
            });
            getPolyclinics();
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Yeni poliklinik eklenemedi.',
            variant: 'error',
          });
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const removePolyclinic = async () => {
    try {
      await socket
        .sendRequest('REMOVE_POLYCLINIC', selectionModel)
        .then((data) => {
          console.log(data);
          if (data) {
            enqueueSnackbar({
              message: 'Seçili poliklinikler silindi.',
              variant: 'success',
            });
            getPolyclinics();
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Seçili poliklinikler silinemedi.',
            variant: 'error',
          });
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPolyclinics();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Grid container spacing={4} mt={2} sx={{ height: 400, width: '100%' }}>
        <Grid item xs={12} sm={12} md={8}>
          <Typography variant="h3" component="div" mb={2}>
            Poliklinikler
          </Typography>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
            socketUpdateMethodName="UPDATE_POLYCLINIC"
          />
          <Button
            onClick={() => {
              removePolyclinic();
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Seçili Olanları Sil
          </Button>
        </Grid>
        <Grid item xs={0} sm={0} md={4}>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Typography
              variant="h5"
              component="div"
              mt={3}
              mb={1}
              sx={{ flexGrow: 1 }}
            >
              Poliklinik Ekle
            </Typography>
            <Input
              id="polyclinicName"
              label="Poliklinik Adı"
              isRequired={true}
              value={polyclinicName}
              setValue={setPolyclinicName}
            />
            <Button
              onClick={() => {
                addPolyclinic();
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ekle
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PolyclinicDashboard;
