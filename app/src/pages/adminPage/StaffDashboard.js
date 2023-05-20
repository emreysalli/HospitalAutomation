import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PasswordInput from '../../components/PasswordInput';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
import { socket } from '../../services/socketServices';
import DatagridPasswordInput from './../../components/DatagridPasswordInput';
import { useSnackbar } from 'notistack';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Ad',
    width: 150,
    editable: true,
  },
  {
    field: 'surname',
    headerName: 'Soyad',
    width: 150,
    editable: true,
  },
  {
    field: 'tcnumber',
    headerName: 'T.C. Kimlik No',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'username',
    headerName: 'Kullanıcı Adı',
    width: 180,
    editable: true,
  },
  {
    field: 'password',
    headerName: 'Şifre',
    renderCell: (params) => (
      <div>
        <DatagridPasswordInput val={params.value} />
      </div>
    ),
    sortable: false,
    width: 180,
  },
];

const StaffDashboard = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [tcnumber, setTcNumber] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [selectedStaff, setSelectedStaff] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const getStaff = () => {
    socket
      .sendRequestWithoutArgs('GET_STAFF')
      .then(async (data) => {
        if (data) {
          setRows(data.staff);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      name === '' ||
      surname === '' ||
      tcnumber === '' ||
      username === '' ||
      password === '' ||
      tcnumber.length<11
    ) {
      enqueueSnackbar({
        message: 'Ad, soyad, T.C. kimlik no, kullanıcı adı ve şifre giriniz.',
        variant: 'error',
      });
      return;
    }
    let newStaff = {
      name: name,
      surname: surname,
      tcnumber: tcnumber,
      username: username,
      password: password,
    };
    socket
      .sendRequest('ADD_STAFF', newStaff)
      .then(async (data) => {
        if (data) {
          enqueueSnackbar({
            message: 'Yeni hasta kabul personel eklendi.',
            variant: 'success',
          });
          setName('');
          setSurname('');
          setTcNumber('');
          setUsername('');
          setPassword('');
          getStaff();
        }
      })
      .catch((err) => {
        enqueueSnackbar({
          message: 'Yeni hasta kabul personel eklenemedi.',
          variant: 'error',
        });
        console.error(err.message);
      });
  };

  const removeStaff = () => {
    socket
      .sendRequest('REMOVE_STAFF', selectedStaff)
      .then(async (data) => {
        if (data) {
          enqueueSnackbar({
            message: 'Seçili personeller silindi.',
            variant: 'success',
          });
          getStaff();
        }
      })
      .catch((err) => {
        enqueueSnackbar({
          message: 'Seçili personeller silinemedi.',
          variant: 'error',
        });
        console.error(err.message);
      });
  };

  React.useEffect(() => {
    getStaff();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Grid container spacing={4} mt={2} sx={{ height: 400, width: '100%' }}>
        <Grid item xs={12} sm={12} md={8}>
          <Typography variant="h3" component="div" mb={2}>
            Hasta Kabul Personeller
          </Typography>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            selectionModel={selectedStaff}
            setSelectionModel={setSelectedStaff}
            socketUpdateMethodName="UPDATE_STAFF"
          />
          <Button
            onClick={() => {
              removeStaff();
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Seçili Olanları Sil
          </Button>
        </Grid>
        <Grid item xs={0} sm={0} md={4}>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Typography
              variant="h5"
              component="div"
              mt={3}
              mb={1}
              sx={{ flexGrow: 1 }}
            >
              Hasta Kabul Personel Ekle
            </Typography>
            <Input
              id="name"
              label="Ad"
              isRequired={true}
              value={name}
              setValue={setName}
            />
            <Input
              id="surname"
              label="Soyad"
              isRequired={true}
              value={surname}
              setValue={setSurname}
            />
            <Input
              id="tcnumber"
              label="T.C. Kimlik No"
              isRequired={true}
              value={tcnumber}
              setValue={setTcNumber}
              maxLength={11}
            />
            <Input
              id="username"
              label="Kullanıcı Adı"
              isRequired={true}
              value={username}
              setValue={setUsername}
            />
            <PasswordInput
              label="Şifre"
              value={password}
              setValue={setPassword}
            />
            <Button
              type="submit"
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

export default StaffDashboard;
