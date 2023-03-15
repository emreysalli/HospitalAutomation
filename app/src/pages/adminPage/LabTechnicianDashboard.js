import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PasswordInput from '../../components/PasswordInput';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
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
    width: 110,
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

const LabTechnicianDashboard = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log(nameSurname, doctorTC, username, password);
  };
  // const [selectionModel, setSelectionModel] = React.useState([]);

  const [nameSurname, setNameSurname] = React.useState();
  const [doctorTC, setDoctorTC] = React.useState();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginY: 4 }}>
        Laboratuvar Teknisyenleri
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
              Laboratuvar Teknisyeni Ekle
            </Typography>
            <Input
              id="nameSurname"
              label="Adı Soyadı"
              isRequired={true}
              value={nameSurname}
              setValue={setNameSurname}
            />
            <Input
              id="doctorTC"
              label="TC"
              isRequired={true}
              value={doctorTC}
              setValue={setDoctorTC}
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

export default LabTechnicianDashboard;
