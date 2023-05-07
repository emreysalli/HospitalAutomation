import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PasswordInput from '../../components/PasswordInput';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
import { socket } from '../../services/socketServices';
import DatagridPasswordInput from './../../components/DatagridPasswordInput';
import BasicSelect from './../../components/BasicSelect';
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
    field: 'polyclinic',
    headerName: 'Poliklinik',
    width: 150,
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

const DoctorDashboard = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [tcnumber, setTcNumber] = React.useState('');
  const [polyclinic, setPolyclinic] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [polyclinics, setPolyclinics] = React.useState([]);
  const [polyclinicNames, setPolyclinicNames] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getPolyclinics = async () => {
    try {
      let temp = [];
      await socket
        .sendRequestWithoutArgs('GET_POLYCLINICS')
        .then((data) => {
          if (data) {
            setPolyclinics(data.polyclinics);
            for (let i = 0; i < polyclinics; i++) {
              temp.push(polyclinics[i].polyclinicName);
            }
            setPolyclinicNames(temp);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const getDoctors = async () => {
    try {
      await socket
        .sendRequestWithoutArgs('GET_DOCTORS')
        .then((data) => {
          if (data) {
            setRows(data.doctors);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const addDoctor = async () => {
    if (
      name === '' ||
      surname === '' ||
      tcnumber === '' ||
      polyclinic === '' ||
      username === '' ||
      password === ''
    ) {
      enqueueSnackbar({
        message:
          'Ad, soyad, T.C. kimlik no, poliklinik, kullanıcı adı ve şifre giriniz.',
        variant: 'error',
      });
    }
    try {
      let polyclinicId;
      for (let i = 0; i < polyclinics; i++) {
        if (polyclinics[i].polyclinicName === polyclinic) {
          polyclinicId = polyclinics[i].id;
          break;
        }
      }
      let doctorInfo = {
        name: name,
        surname: surname,
        tcnumber: tcnumber,
        polyclinic: polyclinic,
        polyclinicId: polyclinicId,
        username: username,
        password: password,
      };
      await socket
        .sendRequest('ADD_DOCTOR', doctorInfo)
        .then((data) => {
          if (data) {
            enqueueSnackbar({
              message: 'Yeni doktor eklendi.',
              variant: 'success',
            });
            getDoctors();
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Yeni doktor eklenemedi.',
            variant: 'error',
          });
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const removeDoctor = async () => {
    try {
      await socket
        .sendRequest('REMOVE_DOCTOR', selectionModel)
        .then((data) => {
          console.log(data);
          if (data) {
            enqueueSnackbar({
              message: 'Seçili doktorlar silindi.',
              variant: 'success',
            });
            getDoctors();
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Seçili doktorlar silinemedi.',
            variant: 'error',
          });
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDoctors();
    getPolyclinics();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Grid container spacing={4} mt={2} sx={{ height: 400, width: '100%' }}>
        <Grid item xs={12} sm={12} md={8}>
          <Typography variant="h3" component="div" mb={2}>
            Doktorlar
          </Typography>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
            socketUpdateMethodName="UPDATE_DOCTOR"
          />
          <Button
            onClick={() => {
              removeDoctor();
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
              Doktor Ekle
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
            />
            <BasicSelect
              label="Poliklinik"
              value={polyclinic}
              setValue={setPolyclinic}
              items={polyclinicNames}
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
              onClick={() => {
                addDoctor();
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

export default DoctorDashboard;
