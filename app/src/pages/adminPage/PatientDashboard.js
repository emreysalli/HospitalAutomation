import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { socket } from '../../services/socketServices';
import DatagridPasswordInput from './../../components/DatagridPasswordInput';
import PasswordInput from '../../components/PasswordInput';
import BasicSelect from './../../components/BasicSelect';
import { useSnackbar } from 'notistack';
import { genders, bloodGroups } from './../../data/constants';

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
    field: 'birthPlace',
    headerName: 'Doğum Yeri',
    width: 150,
    editable: true,
  },
  {
    field: 'birthDate',
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
    field: 'email',
    headerName: 'E-Posta Adresi',
    width: 200,
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

const PatientDashboard = () => {
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [tcnumber, setTcNumber] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bloodGroup, setBloodGroup] = React.useState('');
  const [birthplace, setBirthplace] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const getPatients = async () => {
    try {
      await socket
        .sendRequestWithoutArgs('GET_PATIENTS')
        .then((data) => {
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
    if (
      name === '' ||
      surname === '' ||
      tcnumber === '' ||
      gender === '' ||
      bloodGroup === '' ||
      birthplace === '' ||
      birthdate === '' ||
      phoneNumber === '' ||
      address === '' ||
      email === '' ||
      username === '' ||
      password === '' ||
      tcnumber.length < 11
    ) {
      enqueueSnackbar({
        message:
          'Ad, soyad, T.C. kimlik no, cinsiyet, kan grubu, doğum yeri, doğum tarihi, telefon numarası, adres, email, kullanıcı adı ve şifre giriniz.',
        variant: 'error',
      });
      return;
    }
    try {
      let dat = new Date(birthdate);
      const yyyy = dat.getFullYear();
      let mm = dat.getMonth() + 1; 
      let dd = dat.getDate();

      if (dd < 10) dd = '0' + dd;
      if (mm < 10) mm = '0' + mm;

      const formattedBirthDate =yyyy+ '-' + mm + '-' + dd;
      let newPatientInfo = {
        name: name,
        surname: surname,
        tcnumber: tcnumber,
        gender: gender,
        bloodGroup: bloodGroup,
        birthPlace: birthplace,
        birthDate: formattedBirthDate,
        phoneNumber: phoneNumber,
        address: address,
        email: email,
        username: username,
        password: password,
      };
      await socket
        .sendRequest('ADD_PATIENT', newPatientInfo)
        .then((data) => {
          if (data) {
            enqueueSnackbar({
              message: 'Yeni hasta eklendi.',
              variant: 'success',
            });
            setName('');
            setSurname('');
            setTcNumber('');
            setGender('');
            setBloodGroup('');
            setBirthplace('');
            setBirthdate('');
            setPhoneNumber('');
            setAddress('');
            setEmail('');
            setUsername('');
            setPassword('');
            getPatients();
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Yeni hasta eklenemedi.',
            variant: 'error',
          });
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
          if (data) {
            enqueueSnackbar({
              message: 'Seçili hastalar silindi.',
              variant: 'success',
            });
            getPatients();
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Seçili hastalar silinemedi.',
            variant: 'error',
          });
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
            <Stack direction="row" spacing={2}>
              <Input
                id="name"
                label="Ad"
                isRequired={true}
                margin={true}
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
            </Stack>
            <Input
              id="tcnumber"
              label="T.C. Kimlik No"
              isRequired={true}
              value={tcnumber}
              setValue={setTcNumber}
              maxLength={11}
            />
            <Stack direction="row" spacing={2}>
              <BasicSelect
                label="Cinsiyet"
                value={gender}
                setValue={setGender}
                items={genders}
              />
              <BasicSelect
                label="Kan Grubu"
                value={bloodGroup}
                setValue={setBloodGroup}
                items={bloodGroups}
              />
            </Stack>
            <Stack direction="row" spacing={2} mt={1}>
              <Input
                id="birthplace"
                label="Doğum Yeri"
                isRequired={true}
                margin={true}
                value={birthplace}
                setValue={setBirthplace}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Doğum Tarihi"
                  margin="normal"
                  format="DD/MM/YYYY"
                  value={birthdate}
                  onChange={(value) => setBirthdate(value)}
                  required
                  sx={{ width: '100%', mt: 1 }}
                />
              </LocalizationProvider>
            </Stack>
            <Input
              id="phoneNumber"
              label="Cep Telefonu"
              isRequired={true}
              value={phoneNumber}
              setValue={setPhoneNumber}
              maxLength={11}
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
              id="email"
              label="E-Posta Adresi"
              isRequired={true}
              value={email}
              setValue={setEmail}
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
