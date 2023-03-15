import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'nameSurname',
    headerName: 'Ad Soyad',
    width: 150,
    editable: true,
  },
  {
    field: 'adminTC',
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
    field: 'password',
    headerName: 'Şifre',
    //description: 'This column has a value getter and is not sortable.',
    //sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [];

const PatientDashboard = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log(nameSurname, TC);
  };
  // const [selectionModel, setSelectionModel] = React.useState([]);

  const [nameSurname, setNameSurname] = React.useState();
  const [TC, setTC] = React.useState();
  const [gender, setGender] = React.useState();
  const [bloodGroup, setBloodGroup] = React.useState();
  const [birthplace, setBirthplace] = React.useState();
  const [birthdate, setBirthdate] = React.useState();
  const [fatherName, setFatherName] = React.useState();
  const [motherName, setMotherName] = React.useState();
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [address, setAddress] = React.useState();

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginY: 4 }}>
        Hastalar
      </Typography>

      <Grid container spacing={4} mt={3} sx={{ height: 400, width: '100%' }}>
        <Grid item xs={12} sm={12} md={8}>
          <CustomDataGrid rows={rows} columns={columns} />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Seçili Olanları Sil
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                type="submit"
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
              Hasta Ekle
            </Typography>
            <Input
              id="nameSurname"
              label="Adı Soyadı"
              isRequired={true}
              value={nameSurname}
              setValue={setNameSurname}
            />
            <Input
              id="TC"
              label="TC"
              isRequired={true}
              value={TC}
              setValue={setTC}
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
              id="fatherName"
              label="Baba Adı"
              isRequired={true}
              value={fatherName}
              setValue={setFatherName}
            />
            <Input
              id="motherName"
              label="Anne Adı"
              isRequired={true}
              value={motherName}
              setValue={setMotherName}
            />

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

export default PatientDashboard;
