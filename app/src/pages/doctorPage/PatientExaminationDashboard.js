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
  const [patientTcNumber, setPatientTcNumber] = React.useState('');
  const [patientId, setPatientId] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bloodGroup, setBloodGroup] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');

  const getPatientInfoWithTC = () => {
    socket
      .sendRequest('GET_PATIENT_INFO_WITH_TC', { tcnumber: patientTcNumber })
      .then(async (data) => {
        console.log(data);
        if (data) {
          setPatientId(data.patientInfo.id);
          setName(data.patientInfo.name);
          setSurname(data.patientInfo.surname);
          setGender(data.patientInfo.gender);
          setBloodGroup(data.patientInfo.bloodGroup);
          setBirthdate(data.patientInfo.birthDate);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const sendPatientPrescriptionToServer = async () => {
    let doctorId = localStorage.getItem('id');
    const yyyy = new Date().getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = new Date().getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedToday = yyyy + '-' + mm + '-' + dd;
    console.log();
    let data1 = {
      date: formattedToday,
      prescriptionNo: generateString(5),
      patientId: patientId,
      doctorId: doctorId,
    };
    let prescriptionId;
    await socket
      .sendRequest('ADD_PRESCRIPTION', data1)
      .then(async (data) => {
        if (data) {
          prescriptionId = await data.prescriptionId;
        }
      })
      .catch((err) => {
        console.error(err.message);
      });

    let data2 = {
      prescriptionId: prescriptionId,
      medicines: patientMedicines,
    };

    await socket
      .sendRequest('ADD_MEDICINES', data2)
      .then(async (data) => {
        if (data) {
          console.log(data);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const sendPatientDiagnoses = () => {
    let doctorId = localStorage.getItem('id');
    let data = {
      diagnoses: patientDiagnoses,
      doctorId: doctorId,
      patientId: patientId,
    };
    socket
      .sendRequest('ADD_DIAGNOSIS', data)
      .then(async (data) => {
        if (data) {
          console.log(data);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const randomNumberInRange = () => {
    let min = 1;
    let max = 100;
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const addMedicineToPrescription = () => {
    if(selectedMedicine==="" && selectedDose==="" && selectedPeriod==="" && selectedUsage==="" && selectedNumberOfUses==="" && selectedTotalBox===""){
      return;
    }
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
    if(selectedExplanation==="" && selectedType===""){
      return;
    }
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
    if(selectedTest===""){
      return;
    }
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
              id="patienttcnumber"
              label="Hasta T.C. Kimlik No"
              isRequired={true}
              value={patientTcNumber}
              setValue={setPatientTcNumber}
              maxLength={11}
            />
            <Button
              onClick={() => {
                getPatientInfoWithTC();
              }}
              fullWidth
              variant="contained"
            >
              Hasta Bilgileri Göster
            </Button>
            <Input
              id="name"
              label="Ad"
              isRequired={true}
              isDisabled={true}
              value={name}
              setValue={setName}
            />
            <Input
              id="surname"
              label="Soyad"
              isRequired={true}
              isDisabled={true}
              value={surname}
              setValue={setSurname}
            />
            <Input
              id="gender"
              label="Cinsiyet"
              isRequired={true}
              isDisabled={true}
              value={gender}
              setValue={setGender}
            />
            <Input
              id="bloodGroup"
              label="Kan Grubu"
              isRequired={true}
              isDisabled={true}
              value={bloodGroup}
              setValue={setBloodGroup}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled={true}
                label="Doğum Tarihi"
                format="DD/MM/YYYY"
                margin="normal"
                value={dayjs(birthdate)}
                onChange={(value) => setBirthdate(value)}
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
                      <Stack direction={{ xs: 'row' }}>
                        <Button
                          sx={{ height: '30px', width: '200px', mr: 2 }}
                          onClick={() => {
                            setPatientDiagnoses([]);
                          }}
                          variant="contained"
                        >
                          Temizle
                        </Button>
                        <Button
                          sx={{ height: '30px', width: '200px' }}
                          onClick={() => {
                            sendPatientDiagnoses();
                          }}
                          variant="contained"
                        >
                          Gönder
                        </Button>
                      </Stack>
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
                        w='40%'
                      />
                      <BasicSelect
                        label="Tanı Türü"
                        value={selectedType}
                        setValue={setSelectedType}
                        items={diagnosisTypes}
                        w='40%'
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
                      <Stack direction={{ xs: 'row' }}>
                        <Button
                          sx={{ height: '30px', width: '200px', mr: 2 }}
                          onClick={() => {
                            setPatientTests([]);
                          }}
                          variant="contained"
                        >
                          Temizle
                        </Button>
                      <Button
                        sx={{ height: '30px', width: '200px' }}
                        onClick={() => {}}
                        variant="contained"
                      >
                        Gönder
                      </Button>
                      </Stack>
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
                        w='40%'
                      />
                      <Button
                        my={10}
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
                  <Stack direction={{ xs: 'row' }}>
                    <Button
                      sx={{ height: '30px', width: '200px', mr: 2 }}
                      onClick={() => {
                        setPatientMedicines([]);
                      }}
                      variant="contained"
                    >
                      Temizle
                    </Button>
                    <Button
                      sx={{ height: '30px', width: '200px' }}
                      onClick={() => {
                        sendPatientPrescriptionToServer();
                      }}
                      variant="contained"
                    >
                      Reçete Gönder
                    </Button>
                  </Stack>
                </Stack>
                <Box sx={{ backgroundColor: '#F5F5F5', paddingX: 1 }}>
                  <Grid container spacing={3} my={1}>
                    <Grid item xs={3} md={3}>
                      İlaç Adı
                    </Grid>
                    <Grid item xs={2} md={3}>
                      Kullanım Şekli
                    </Grid>
                    <Grid item xs={1} md={1}>
                      Doz
                    </Grid>
                    <Grid item xs={1} md={1}>
                      Periyot
                    </Grid>
                    <Grid item xs={2} md={1}>
                      Kullanım Sayısı
                    </Grid>
                    <Grid item xs={1} md={1}>
                      Kutu Adedi
                    </Grid>
                    <Grid item xs={2} md={2}></Grid>
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
                    w='22%'
                  />
                  <BasicSelect
                    label="Kullanım Şekli "
                    value={selectedUsage}
                    setValue={setSelectedUsage}
                    items={usagePatterns}
                    w='20%'
                  />
                  <BasicSelect
                    label="Doz "
                    value={selectedDose}
                    setValue={setSelectedDose}
                    items={doses}
                    w='5%'
                  />
                  <BasicSelect
                    label="Periyot "
                    value={selectedPeriod}
                    setValue={setSelectedPeriod}
                    items={periods}
                    w='5%'
                  />
                  <BasicSelect
                    label="Kullanım Sayısı "
                    value={selectedNumberOfUses}
                    setValue={setSelectedNumberOfUses}
                    items={usageNumbers}
                    w='5%'
                  />
                  <BasicSelect
                    label="Kutu Adedi "
                    value={selectedTotalBox}
                    setValue={setSelectedTotalBox}
                    items={boxQuantities}
                    w='5%'
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
