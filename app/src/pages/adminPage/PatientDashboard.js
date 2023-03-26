import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { socket } from '../../services/socketServices';
import DatagridPasswordInput from './../../components/DatagridPasswordInput';
import PasswordInput from '../../components/PasswordInput';

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
    field: 'gender',
    headerName: 'Cinsiyet',
    width: 100,
    editable: true,
  },
  {
    field: 'bloodGroup',
    headerName: 'Kan Grubu',
    type: 'number',
    width: 100,
    editable: true,
  },
  {
    field: 'birthplace',
    headerName: 'Doğum Yeri',
    width: 150,
    editable: true,
  },
  {
    field: 'birthdate',
    headerName: 'Doğum Tarihi',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Cep Telefonu',
    width: 150,
    editable: true,
  },
  {
    field: 'address',
    headerName: 'Adres',
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

const PatientDashboard = () => {
  const [name, setName] = React.useState();
  const [surname, setSurname] = React.useState();
  const [tcnumber, setTcNumber] = React.useState();
  const [gender, setGender] = React.useState();
  const [bloodGroup, setBloodGroup] = React.useState();
  const [birthplace, setBirthplace] = React.useState();
  const [birthdate, setBirthdate] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [address, setAddress] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);

  const getPatients = async () => {
    try {
      await socket
        .sendRequestWithoutArgs('GET_PATIENTS')
        .then((data) => {
          console.log(data);
          if (data) {
            setRows(data.patients);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const addPatient = async () => {
    try {
      let newPatientInfo = {
        name: name,
        surname: surname,
        tcnumber: tcnumber,
        gender: gender,
        bloodGroup: bloodGroup,
        birthplace: birthplace,
        birthdate: birthdate,
        phoneNumber: phoneNumber,
        address: address,
        username: username,
        password: password,
      };
      await socket
        .sendRequest('ADD_PATIENT', newPatientInfo)
        .then((data) => {
          if (data) {
            alert('yeni hasta eklendi.');
            getPatients();
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const removePatient = async () => {
    try {
      await socket
        .sendRequest('REMOVE_PATIENT', selectionModel)
        .then((data) => {
          console.log(data);
          if (data) {
            alert('seçili hastalar silindi.');
            getPatients();
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
    getPatients();
  }, []);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Grid container spacing={4} mt={2} sx={{ height: 400, width: '100%' }}>
        <Grid item xs={12} sm={12} md={8}>
          <Typography variant="h3" component="div" mb={2}>
            Hastalar
          </Typography>
          <CustomDataGrid
            rows={rows}
            columns={columns}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
            socketUpdateMethodName="UPDATE_PATIENT"
          />
          <Button
            onClick={() => {
              removePatient();
            }}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Seçili Olanları Sil
          </Button>
        </Grid>
        <Grid item xs={0} sm={0} md={4}>
          <Box noValidate sx={{ mt: 1 }}>
            <Typography
              variant="h5"
              component="div"
              mt={3}
              mb={1}
              sx={{ flexGrow: 1 }}
            >
              Hasta Ekle
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
            <Input
              id="gender"
              label="Cinsiyet"
              isRequired={true}
              value={gender}
              setValue={setGender}
            />
            <Input
              id="bloodGroup"
              label="Kan Grubu"
              isRequired={true}
              value={bloodGroup}
              setValue={setBloodGroup}
            />
            <Input
              id="birthplace"
              label="Doğum Yeri"
              isRequired={true}
              value={birthplace}
              setValue={setBirthplace}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Doğum Tarihi"
                margin="normal"
                value={birthdate}
                onChange={(value) => setBirthdate(value)}
                required
                sx={{ width: '100%', mt: 1 }}
              />
            </LocalizationProvider>
            <Input
              id="phoneNumber"
              label="Cep Telefonu"
              isRequired={true}
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
            <Input
              id="address"
              label="Adres"
              isMultiline={true}
              isRequired={true}
              value={address}
              setValue={setAddress}
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
                addPatient();
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

export default PatientDashboard;
