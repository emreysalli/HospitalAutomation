import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Input from '../../components/Input';
import { socket } from '../../services/socketServices';
import BasicSelect from './../../components/BasicSelect';
import dayjs from 'dayjs';
const diagnosticStatements = ['Baş Ağrısı', 'Akut Sinüzit', 'Astım', 'Anemi'];
const diagnosisTypes = [
  'Ön Tanı',
  'Ek Tanı',
  'Ana Tanı',
  'Sevk Tanı',
  'Rapor Tanı',
];

const tests = [
  'Alerji Testi',
  'Biyokimya Testi',
  'Genetik Testi',
  'Hematoloji Testi',
  'Hormon Testi',
  'İdrar Testi',
  'İmmünoloji Testi',
  'Kan Testi',
];

const medicines = [
  'ABSTRAL 800 MCG 10 DILALTI TABLET',
  'ACCUZIDE 20 MG/12,5 MG 30 FILM TABLET',
  'AdCUZIDE 20 MG/12,5 MG 30 FILM TABLET',
  'AfCUZIDE 20 MG/12,5 MG 30 FILM TABLET',
  'AgfCUZIDE 20 MG/12,5 MG 30 FILM TABLET',
  'LEUCOVORIN-TEVA 50 MG 1 FLAKON',
  'OPRAKS FORT 550 MG 10 FILM TABLET',
];
const doses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const usagePatterns = [
  'Ağızdan',
  'Cilt Üzerine',
  'Solunum Yolu',
  'Ağız içi',
  'Burun içi',
  'Dil altı',
  'Dış kulak yolu',
  'Göz üzerine',
  'İntra müsküler',
];
const periods = ['Gün', 'Hafta', 'Ay', 'Yıl'];
const usageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const boxQuantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const PatientExaminationDashboard = () => {
  const [selectedMedicine, setSelectedMedicine] = React.useState('');
  const [selectedDose, setSelectedDose] = React.useState('');
  const [selectedPeriod, setSelectedPeriod] = React.useState('');
  const [selectedUsage, setSelectedUsage] = React.useState('');
  const [selectedNumberOfUses, setSelectedNumberOfUses] = React.useState('');
  const [selectedTotalBox, setSelectedTotalBox] = React.useState('');
  const [selectedExplanation, setSelectedExplanation] = React.useState('');
  const [selectedType, setSelectedType] = React.useState('');
  const [selectedTest, setSelectedTest] = React.useState('');
  const [patientMedicines, setPatientMedicines] = React.useState([]);
  const [patientDiagnoses, setPatientDiagnoses] = React.useState([]);
  const [patientTests, setPatientTests] = React.useState([]);

  const randomNumberInRange = () => {
    let min = 1;
    let max = 100;
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const addMedicineToPrescription = () => {
    let m = {
      id: randomNumberInRange(),
      medicineName: selectedMedicine,
      dose: selectedDose,
      period: selectedPeriod,
      usage: selectedUsage,
      numberOfUses: selectedNumberOfUses,
      totalBox: selectedTotalBox,
    };
    setPatientMedicines([...patientMedicines, m]);
    setSelectedMedicine('');
    setSelectedDose('');
    setSelectedPeriod('');
    setSelectedUsage('');
    setSelectedNumberOfUses('');
    setSelectedTotalBox('');
  };

  const removeMedicine = (id) => {
    setPatientMedicines((prev) => prev.filter((el) => el.id !== id));
  };

  const addDiagnosis = () => {
    let d = {
      id: randomNumberInRange(),
      explanation: selectedExplanation,
      type: selectedType,
    };
    console.log(d.id);
    setPatientDiagnoses([...patientDiagnoses, d]);
    setSelectedExplanation('');
    setSelectedType('');
  };

  const removeDiagnosis = (id) => {
    setPatientDiagnoses((prev) => prev.filter((el) => el.id !== id));
  };

  const addTest = () => {
    let t = {
      id: randomNumberInRange(),
      name: selectedTest,
    };
    setPatientTests([...patientTests, t]);
    setSelectedTest('');
  };

  const removeTest = (id) => {
    setPatientTests((prev) => prev.filter((el) => el.id !== id));
  };

  return (
    <Box
      sx={{
        mt: 4,
        mb: 4,
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={3} lg={2}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6">Hasta Bilgileri</Typography>
            <Input
              id="tcnumber"
              label="T.C. Kimlik No"
              isRequired={true}
              value="1111111111"
            />
            <Button onClick={() => {}} fullWidth variant="contained">
              Hasta Bilgileri Göster
            </Button>
            <Input
              id="name"
              label="Ad"
              isRequired={true}
              isDisabled={true}
              value="emre yasin"
            />
            <Input
              id="surname"
              label="Soyad"
              isRequired={true}
              isDisabled={true}
              value="şallı"
            />
            <Input
              id="gender"
              label="Cinsiyet"
              isRequired={true}
              isDisabled={true}
              value="erkek"
            />
            <Input
              id="bloodGroup"
              label="Kan Grubu"
              isRequired={true}
              isDisabled={true}
              value="A RH+"
            />
            <Input
              id="birthplace"
              label="Doğum Yeri"
              isRequired={true}
              isDisabled={true}
              value="istanbul"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={true}
                label="Doğum Tarihi"
                format="DD/MM/YYYY"
                margin="normal"
                defaultValue={dayjs('2022-04-17')}
                required
                sx={{ width: '100%', mt: 1 }}
              />
            </LocalizationProvider>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9} lg={10}>
          <Grid container direction="column" spacing={3}>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems="center"
                      justifyContent="space-between"
                      mx={2}
                      mb={2}
                    >
                      <Typography variant="h6">Tanı</Typography>
                      <Button
                        sx={{ height: '30px', width: '200px' }}
                        onClick={() => {}}
                        variant="contained"
                      >
                        Gönder
                      </Button>
                    </Stack>
                    <Box sx={{ backgroundColor: '#F5F5F5', paddingX: 1 }}>
                      <Grid container spacing={3} my={1}>
                        <Grid item xs={5}>
                          Tanı Açıklaması
                        </Grid>
                        <Grid item xs={5}>
                          Türü
                        </Grid>
                        <Grid item xs={2}></Grid>
                      </Grid>
                      <Divider />
                    </Box>
                    {patientDiagnoses.map((diagnosis, index) => (
                      <Box
                        sx={{
                          paddingX: 1,
                        }}
                        key={index}
                      >
                        <Grid container spacing={2} my={1}>
                          <Grid item xs={5}>
                            {diagnosis.explanation}
                          </Grid>
                          <Grid item xs={5}>
                            {diagnosis.type}
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              onClick={() => {
                                removeDiagnosis(diagnosis.id);
                              }}
                              variant="contained"
                              color="error"
                            >
                              <i className="fa-regular fa-circle-xmark"></i>
                            </Button>
                          </Grid>
                        </Grid>
                        <Divider />
                      </Box>
                    ))}
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <BasicSelect
                        label="Tanı Açıklaması"
                        value={selectedExplanation}
                        setValue={setSelectedExplanation}
                        items={diagnosticStatements}
                      />

                      <BasicSelect
                        label="Tanı Türü"
                        value={selectedType}
                        setValue={setSelectedType}
                        items={diagnosisTypes}
                      />

                      <Button
                        mt={20}
                        sx={{
                          height: '50px',
                          width: '80px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onClick={() => {
                          addDiagnosis();
                        }}
                        variant="contained"
                      >
                        Ekle
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems="center"
                      justifyContent="space-between"
                      mx={2}
                      mb={2}
                    >
                      <Typography variant="h6">Testler</Typography>
                      <Button
                        sx={{ height: '30px', width: '200px' }}
                        onClick={() => {}}
                        variant="contained"
                      >
                        Gönder
                      </Button>
                    </Stack>
                    <Box sx={{ backgroundColor: '#F5F5F5', paddingX: 1 }}>
                      <Grid container spacing={3} my={1}>
                        <Grid item xs={10}>
                          Test
                        </Grid>
                        <Grid item xs={2}></Grid>
                      </Grid>
                      <Divider />
                    </Box>
                    {patientTests.map((test, index) => (
                      <Box
                        sx={{
                          paddingX: 1,
                        }}
                        key={index}
                      >
                        <Grid container spacing={2} my={1}>
                          <Grid item xs={10}>
                            {test.name}
                          </Grid>
                          <Grid item xs={2}>
                            <Button
                              onClick={() => {
                                removeTest(test.id);
                              }}
                              variant="contained"
                              color="error"
                            >
                              <i className="fa-regular fa-circle-xmark"></i>
                            </Button>
                          </Grid>
                        </Grid>
                        <Divider />
                      </Box>
                    ))}
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <BasicSelect
                        label="Test"
                        value={selectedTest}
                        setValue={setSelectedTest}
                        items={tests}
                      />
                      <Button
                        mt={20}
                        sx={{
                          height: '50px',
                          width: '80px',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onClick={() => {
                          addTest();
                        }}
                        variant="contained"
                      >
                        Ekle
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems="center"
                  justifyContent="space-between"
                  mx={2}
                  mb={2}
                >
                  <Typography variant="h6">Reçete</Typography>
                  <Button
                    sx={{ height: '30px', width: '200px' }}
                    onClick={() => {}}
                    variant="contained"
                  >
                    Reçete Yazdır
                  </Button>
                </Stack>
                <Box sx={{ backgroundColor: '#F5F5F5', paddingX: 1 }}>
                  <Grid container spacing={3} my={1}>
                    <Grid item xs={3}>
                      İlaç Adı
                    </Grid>
                    <Grid item xs={3}>
                      Kullanım Şekli
                    </Grid>
                    <Grid item xs={1}>
                      Doz
                    </Grid>
                    <Grid item xs={1}>
                      Periyot
                    </Grid>
                    <Grid item xs={1}>
                      Kullanım Sayısı
                    </Grid>
                    <Grid item xs={1}>
                      Kutu Adedi
                    </Grid>
                    <Grid item xs={2}></Grid>
                  </Grid>
                  <Divider />
                </Box>
                {patientMedicines.map((medicine, index) => (
                  <Box
                    sx={{
                      paddingX: 1,
                    }}
                    key={index}
                  >
                    <Grid container spacing={3} my={1}>
                      <Grid item xs={3}>
                        {medicine.medicineName}
                      </Grid>
                      <Grid item xs={3}>
                        {medicine.usage}
                      </Grid>
                      <Grid item xs={1}>
                        {medicine.dose}
                      </Grid>
                      <Grid item xs={1}>
                        {medicine.period}
                      </Grid>
                      <Grid item xs={1}>
                        {medicine.numberOfUses}
                      </Grid>
                      <Grid item xs={1}>
                        {medicine.totalBox}
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          onClick={() => {
                            removeMedicine(medicine.id);
                          }}
                          variant="contained"
                          color="error"
                        >
                          <i className="fa-regular fa-circle-xmark"></i>
                        </Button>
                      </Grid>
                    </Grid>
                    <Divider />
                  </Box>
                ))}
                <Stack
                  direction={{ sm: 'column', md: 'row' }}
                  alignItems="center"
                  justifyContent="space-between"
                  mx={2}
                >
                  <BasicSelect
                    label="İlaç "
                    value={selectedMedicine}
                    setValue={setSelectedMedicine}
                    items={medicines}
                  />
                  <BasicSelect
                    label="Kullanım Şekli "
                    value={selectedUsage}
                    setValue={setSelectedUsage}
                    items={usagePatterns}
                  />
                  <BasicSelect
                    label="Doz "
                    value={selectedDose}
                    setValue={setSelectedDose}
                    items={doses}
                  />
                  <BasicSelect
                    label="Periyot "
                    value={selectedPeriod}
                    setValue={setSelectedPeriod}
                    items={periods}
                  />
                  <BasicSelect
                    label="Kullanım Sayısı "
                    value={selectedNumberOfUses}
                    setValue={setSelectedNumberOfUses}
                    items={usageNumbers}
                  />
                  <BasicSelect
                    label="Kutu Adedi "
                    value={selectedTotalBox}
                    setValue={setSelectedTotalBox}
                    items={boxQuantities}
                  />
                  <Button
                    sx={{ height: '50px', width: '80px' }}
                    onClick={() => {
                      addMedicineToPrescription();
                    }}
                    variant="contained"
                  >
                    Ekle
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientExaminationDashboard;
