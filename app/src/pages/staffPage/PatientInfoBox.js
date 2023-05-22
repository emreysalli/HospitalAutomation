import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import BasicSelect from '../../components/BasicSelect';
import Input from '../../components/Input';
import { socket } from '../../services/socketServices';
import { bloodGroups, genders } from './../../data/constants';

const PatientInfoBox = ({ patientId, setPatientId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [patientTcNumberQuery, setPatientTcNumberQuery] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [tcnumber, setTcNumber] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bloodGroup, setBloodGroup] = React.useState('');
  const [birthdate, setBirthdate] = React.useState('');
  const [birthplace, setBirthplace] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');

  const getPatientInfoWithTC = (tcn) => {
    let tcnum =  tcn===undefined ? patientTcNumberQuery : tcn
    if (tcnum.length < 11 || tcnum === '') {
      setPatientId('');
      enqueueSnackbar({
        message: 'Hasta T.C. Kimlik No hatalı girdiniz.',
        variant: 'error',
      });
      return;
    }
    socket
      .sendRequest('GET_PATIENT_INFO_WITH_TC', {
        tcnumber: tcnum,
      })
      .then(async (data) => {
        if (data.patientInfo) {
          setPatientId(data.patientInfo.id);
          setName(data.patientInfo.name);
          setSurname(data.patientInfo.surname);
          setTcNumber(data.patientInfo.tcnumber);
          setGender(data.patientInfo.gender);
          setBloodGroup(data.patientInfo.bloodGroup);
          setBirthplace(data.patientInfo.birthPlace);
          setBirthdate(data.patientInfo.birthDate);
          setPhoneNumber(data.patientInfo.phoneNumber);
          // setEmail(data.patientInfo?.email);
        } else {
          setPatientId('');
          setName('');
          setSurname('');
          setTcNumber('');
          setGender('');
          setBloodGroup('');
          setBirthplace('');
          setBirthdate('');
          setPhoneNumber('');
          enqueueSnackbar({
            message: 'Hasta bulunamadı.',
            variant: 'error',
          });
        }
      })
      .catch((err) => {
        setPatientId('');
        setName('');
        setSurname('');
        setTcNumber('');
        setGender('');
        setBloodGroup('');
        setBirthplace('');
        setBirthdate('');
        setPhoneNumber('');
        enqueueSnackbar({
          message: 'Hasta bulunamadı.',
          variant: 'error',
        });
        console.error(err.message);
      });
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
      tcnumber.length < 11
    ) {
      enqueueSnackbar({
        message:
          'Ad, soyad, T.C. kimlik no, cinsiyet, kan grubu, doğum yeri, doğum tarihi, telefon numarası ve email giriniz.',
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

      const formattedBirthDate = yyyy + '-' + mm + '-' + dd;
      let newPatientInfo = {
        name: name,
        surname: surname,
        tcnumber: tcnumber,
        gender: gender,
        bloodGroup: bloodGroup,
        birthPlace: birthplace,
        birthDate: formattedBirthDate,
        phoneNumber: phoneNumber,
        username: email,
        password: '123456',
      };
      await socket
        .sendRequest('ADD_PATIENT', newPatientInfo)
        .then((data) => {
          if (data) {
            setPatientTcNumberQuery("")
            getPatientInfoWithTC(tcnumber);
            enqueueSnackbar({
              message: 'Hasta kaydedildi.',
              variant: 'success',
            });
          }
        })
        .catch((err) => {
          enqueueSnackbar({
            message: 'Yeni hasta kaydedilemedi.',
            variant: 'error',
          });
          console.error(err.message);
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
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
        label="Hasta T.C. Kimlik No"
        isRequired={true}
        value={patientTcNumberQuery}
        setValue={setPatientTcNumberQuery}
        maxLength={11}
      />
      <Button
        onClick={() => {
          getPatientInfoWithTC();
        }}
        fullWidth
        variant="contained"
      >
        Hasta Sorgula
      </Button>
      <Input
        id="name"
        label="Ad"
        isRequired={true}
        isDisabled={patientId === '' ? false : true}
        value={name}
        setValue={setName}
      />
      <Input
        id="surname"
        label="Soyad"
        isRequired={true}
        isDisabled={patientId === '' ? false : true}
        value={surname}
        setValue={setSurname}
      />
      <Input
        id="tcnumber"
        label="T.C. Kimlik No"
        isRequired={true}
        isDisabled={patientId === '' ? false : true}
        value={tcnumber}
        setValue={setTcNumber}
        maxLength={11}
      />
      <BasicSelect
        label="Cinsiyet"
        isDisabled={patientId === '' ? false : true}
        value={gender}
        setValue={setGender}
        items={genders}
      />
      <BasicSelect
        label="Kan Grubu"
        value={bloodGroup}
        isDisabled={patientId === '' ? false : true}
        setValue={setBloodGroup}
        items={bloodGroups}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Doğum Tarihi"
          format="DD/MM/YYYY"
          disabled={patientId === '' ? false : true}
          value={dayjs(birthdate)}
          onChange={(value) => setBirthdate(value)}
          required
          sx={{ width: '100%' }}
        />
      </LocalizationProvider>
      <Input
        id="birthplace"
        label="Doğum Yeri"
        isRequired={true}
        isDisabled={patientId === '' ? false : true}
        value={birthplace}
        setValue={setBirthplace}
      />
      <Input
        id="phoneNumber"
        label="Cep Telefonu"
        isRequired={true}
        isDisabled={patientId === '' ? false : true}
        value={phoneNumber}
        setValue={setPhoneNumber}
        maxLength={11}
      />
      <Input
        id="email"
        label="E-mail"
        isRequired={true}
        isDisabled={patientId === '' ? false : true}
        value={email}
        setValue={setEmail}
      />
      <Button
        onClick={() => {
          addPatient();
        }}
        fullWidth
        disabled={patientId === '' ? false : true}
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          borderRadius: 2,
          py: 1,
          fontSize: 18,
        }}
      >
        Kaydet
      </Button>
    </Paper>
  );
};

export default PatientInfoBox;
