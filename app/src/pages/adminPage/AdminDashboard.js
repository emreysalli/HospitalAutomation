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
    headerName: 'TC',
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
    //description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 180,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const AdminDashboard = () => {
  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [tcnumber, setTcNumber] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [rows, setRows] = React.useState([]);
  const [selectedAdmins, setSelectedAdmins] = React.useState([]);

  const getAdmins = () => {
    socket
      .sendRequestWithoutArgs('GET_ADMINS')
      .then(async (data) => {
        if (data) {
          setRows(data.admins);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let newAdminInfo = {
      name: name,
      surname: surname,
      tcnumber: tcnumber,
      username: username,
      password: password,
    };
    socket
      .sendRequest('ADD_ADMIN', newAdminInfo)
      .then(async (data) => {
        if (data) {
          alert('yeni yönetici eklendi.');
          getAdmins();
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const removeAdmin = () => {
    socket
      .sendRequest('REMOVE_ADMIN', selectedAdmins)
      .then(async (data) => {
        if (data) {
          alert('seçili yöneticiler silindi.');
          getAdmins();
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  React.useEffect(() => {
    getAdmins();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginY: 4 }}>
        Yöneticiler
      </Typography>

      <Grid container spacing={4} mt={3} sx={{ height: 400, width: '100%' }}>
        <Grid item xs={12} sm={12} md={8}>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            selectionModel={selectedAdmins}
            setSelectionModel={setSelectedAdmins}
          />
          <Button
            onClick={() => {
              removeAdmin();
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
              sx={{ flexGrow: 1, marginBottom: 1 }}
            >
              Yönetici Ekle
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
              label="TC"
              isRequired={true}
              value={tcnumber}
              setValue={setTcNumber}
            />
            <Input
              id="username"
              label="Kullanıcı Adı"
              isRequired={true}
              value={username}
              setValue={setUsername}
            />
            <PasswordInput
              label="Yeni Yönetici Şifre"
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

export default AdminDashboard;
