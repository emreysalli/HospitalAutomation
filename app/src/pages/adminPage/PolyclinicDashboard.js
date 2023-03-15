import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Input from '../../components/Input';
import CustomDataGrid from '../../components/CustomDataGrid';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'polyclinicName',
    headerName: 'Poliklinik Adı',
    width: 150,
    editable: true,
  },
];

const rows = [];

const PolyclinicDashboard = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log(polyclinicName);
  };
  // const [selectionModel, setSelectionModel] = React.useState([]);

  const [polyclinicName, setPolyclinicName] = React.useState();
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginY: 4 }}>
        Poliklinikler
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

export default PolyclinicDashboard;
