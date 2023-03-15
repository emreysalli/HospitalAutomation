import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PasswordInput from '../../components/PasswordInput';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
import { socket } from '../../services/socketServices';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Ad',
    width: 100,
    editable: true,
  },
  {
    field: 'surname',
    headerName: 'Soyad',
    width: 100,
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
    width: 110,
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
    //description: 'This column has a value getter and is not sortable.',
    //sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const DoctorDashboard = () => {
  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [tcnumber, setTcNumber] = React.useState();
  const [polyclinic, setPolyclinic] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const getDoctors = async () => {
    try {
      await socket
        .sendRequestWithoutArgs('GET_DOCTORS')
        .then((data) => {
          console.log(data);
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
    try {
      let doctorInfo = {
        name: name,
        surname: surname,
        tcnumber: tcnumber,
        polyclinic: polyclinic,
        username: username,
        password: password,
      };
      await socket
        .sendRequest('ADD_DOCTOR', doctorInfo)
        .then((data) => {
          if (data) {
            alert('yeni doktor eklendi.');
            getDoctors();
          }
        })
        .catch((err) => {
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
            alert('seçili DOKTORLAR silindi.');
            getDoctors();
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginY: 4 }}>
        Doktorlar
      </Typography>

      <Grid container spacing={4} mt={3} sx={{ height: 400, width: '100%' }}>
        <Grid item xs={12} sm={12} md={8}>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
          />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <Button
                onClick={() => {
                  alert('clicked');
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Seçili Olanı Güncelle
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={0} md={4}>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, marginBottom: 1 }}
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
              label="TC"
              isRequired={true}
              value={tcnumber}
              setValue={setTcNumber}
            />
            <Input
              id="polyclinic"
              label="Poliklinik"
              isRequired={true}
              value={polyclinic}
              setValue={setPolyclinic}
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
