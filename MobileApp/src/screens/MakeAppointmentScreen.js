import React, { useState, useEffect } from 'react';
import {
  Center,
  ScrollView,
  VStack,
  FormControl,
  CheckIcon,
  Select,
  Input,
  Button,
  HStack,
  Modal,
  useToast,
  Image,
  Text,
  Box,
  Divider,
  Alert,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-date-picker';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const hours = [
  ['08:00', '08:30', '09:00', '09:30'],
  ['10:00', '10:30', '11:00', '11:30'],
  ['12:00', '13:30', '14:00', '14:30'],
  ['15:00', '15:30', '16:00', '16:30'],
  ['17:00', '17:30'],
];

const MakeAppointmentScreen = () => {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);
  const [doctorsSelectIsDisabled, setDoctorsSelectIsDisabled] = useState(true);
  const [hoursIsDisabled, setHoursIsDisabled] = useState(false);
  const [polyclinics, setPolyclinics] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [selectedPolyclinic, setSelectedPolyclinic] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedHour, setSelectedHour] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const saveAppointment = async () => {
    let dat = new Date(date);
    const yyyy = dat.getFullYear();
    let mm = dat.getMonth() + 1;
    let dd = dat.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedDate = yyyy + '-' + mm + '-' + dd;
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        socket
          .sendRequest('SAVE_APPOINTMENT', {
            patientId: idParsedValue,
            polyclinicName: selectedPolyclinic.polyclinicName,
            doctorId: selectedDoctor.id,
            appointmentDate: formattedDate,
            appointmentHour: selectedHour,
          })
          .then(async (data) => {
            if (data) {
              setShowModal(false);
              searchAppointments();
              toast.show({
                placement: 'top',
                render: () => {
                  return (
                    <Alert
                      maxWidth="100%"
                      mb={6}
                      alignSelf="center"
                      flexDirection="row"
                      status="success"
                    >
                      <HStack space={2} flexShrink={1} alignItems="center">
                        <Alert.Icon />
                        <Text
                          fontSize="xl"
                          fontWeight="medium"
                          flexShrink={1}
                          color="darkText"
                        >
                          Randevunuz oluşturuldu.
                        </Text>
                      </HStack>
                    </Alert>
                  );
                },
              });
            }
          })
          .catch((err) => {
            console.error(err.message);
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const searchAppointments = () => {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedDate = yyyy + '-' + mm + '-' + dd;

    let appointmentInfo = {
      polyclinicId: selectedPolyclinic.id,
      doctorId: selectedDoctor.id,
      appointmentDate: formattedDate,
    };
    socket
      .sendRequest('SEARCH_APPOINTMENTS', appointmentInfo)
      .then(async (data) => {
        if (data) {
          let a = [];
          let b = data.appointments;
          for (let index = 0; index < b.length; index++) {
            a.push(b[index].appointmentHour);
          }
          setAppointments(a);
          setHoursIsDisabled(true);
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  useEffect(() => {
    const getPolyclinics = () => {
      socket
        .sendRequestWithoutArgs('GET_POLYCLINICS')
        .then(async (data) => {
          if (data) {
            setPolyclinics(data.polyclinics);
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    getPolyclinics();
  }, []);

  useEffect(() => {
    const getDoctorsOfPolyclinic = () => {
      setSelectedDoctor('');
      socket
        .sendRequest('GET_DOCTORS_OF_POLYCLINIC', {
          polyclinicId: selectedPolyclinic.id,
        })
        .then(async (data) => {
          if (data) {
            setDoctors(data.doctors);
            if (selectedPolyclinic !== '') {
              setDoctorsSelectIsDisabled(false);
            }
          }
        })
        .catch((err) => {
          console.error(err.message);
        });
    };
    getDoctorsOfPolyclinic();
  }, [selectedPolyclinic]);

  useEffect(()=>{
    setHoursIsDisabled(false)
  },[selectedDoctor,selectedPolyclinic,date])

  const getInputDate = () => {
    if (date.toDateString() === new Date().toDateString()) {
      return '';
    }

    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    let formattedDate = dd + '-' + mm + '-' + yyyy;
    return formattedDate;
  };

  return (
    <ScrollView>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Randevuyu Onayla</Modal.Header>
          <Modal.Body>
            <Box style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <HStack>
                <Image
                  source={require('../assets/icons/calendar-outline.png')}
                  alt="takvim"
                />
                <Text
                  pt={0.5}
                  pl="2"
                  color="black"
                  fontSize="lg"
                  fontWeight="bold"
                >
                  {getInputDate()}
                </Text>
              </HStack>

              <HStack mt={4}>
                <Image
                  source={require('../assets/icons/time.png')}
                  alt="time"
                  ml={2}
                />
                <Text
                  pt={0.5}
                  pl="2"
                  color="black"
                  fontSize="lg"
                  fontWeight="bold"
                >
                  {selectedHour}
                </Text>
              </HStack>
            </Box>
            <Divider w="90%" mt={4} />
            <HStack px="2" mt={4}>
              <Image
                source={require('../assets/icons/vials-outline.png')}
                alt="kisi"
              />
              <Text pt={0.5} pl="2" color="black" fontSize="xl">
                {selectedPolyclinic.polyclinicName}
              </Text>
            </HStack>

            <HStack px="2" mt={4}>
              <Image
                source={require('../assets/icons/person-outline.png')}
                alt="kisi"
              />
              <Text pt={0.5} pl="2" color="black" fontSize="xl">
                {selectedDoctor.doctor}
              </Text>
            </HStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button onPress={() => saveAppointment()}>
                Randevuyu Onayla
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <DatePicker
        modal
        title="Randevu Tarihini Seçiniz"
        confirmText="Onayla"
        cancelText="İptal"
        open={open}
        date={date}
        mode="date"
        minimumDate={new Date()}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Center style={styles.container} my="3">
        <VStack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          <FormControl isRequired>
            <FormControl.Label>Poliklinik</FormControl.Label>
            <Select
              showSoftInputOnFocus={false}
              accessibilityLabel="Klinik Seçiniz"
              placeholder="Klinik Seçiniz"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="8" />,
              }}
              style={styles.loginHospitalSelect}
              variant="outline"
              selectedValue={selectedPolyclinic?.polyclinicName}
              onValueChange={(selectedPolyclinic) => {
                let temp = polyclinics.find(
                  (polyclinic) =>
                    polyclinic.polyclinicName === selectedPolyclinic
                );
                setSelectedPolyclinic(temp);
              }}
            >
              {polyclinics.map((polyclinic) => (
                <Select.Item
                  label={polyclinic.polyclinicName}
                  value={polyclinic.polyclinicName}
                  key={polyclinic.id}
                />
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired isDisabled={doctorsSelectIsDisabled}>
            <FormControl.Label>Doktor</FormControl.Label>
            <Select
              showSoftInputOnFocus={false}
              accessibilityLabel="Doktor Seçiniz"
              placeholder="Doktor Seçiniz"
              _selectedItem={{
                bg: 'teal.600',
                endIcon: <CheckIcon size="8" />,
              }}
              style={styles.loginHospitalSelect}
              variant="outline"
              selectedValue={selectedDoctor==="" ? "" : selectedDoctor.doctor}
              onValueChange={(selectedDoctor) => {
                let temp = doctors.find(
                  (doctor) => doctor.doctor === selectedDoctor
                );
                setSelectedDoctor(temp);
              }}
            >
              {doctors.map((doctor) => (
                <Select.Item
                  label={doctor.doctor}
                  value={doctor.doctor}
                  key={doctor.id}
                />
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired isDisabled={doctorsSelectIsDisabled}>
            <FormControl.Label>Randevu Tarihi</FormControl.Label>
            <Input
              style={styles.loginPhoneNumberInput}
              variant="outline"
              isReadOnly={true}
              InputRightElement={
                <Button
                  isDisabled={doctorsSelectIsDisabled}
                  size="xs"
                  rounded="none"
                  w="1/6"
                  h="full"
                  onPress={() => setOpen(true)}
                >
                  Seç
                </Button>
              }
              placeholder="Randevu Tarihi"
              value={getInputDate()}
            />
          </FormControl>

          <Button
            style={{ ...styles.loginButton, marginTop: 4 }}
            size={themeStyle.STANDART_BUTTON_SIZE}
            onPress={() => searchAppointments()}
          >
            Randevu Ara
          </Button>

          <Center mt={2}>
            {hoursIsDisabled && appointments.length!=18 ? (
              <VStack space={5}>
                {hours.map((hour, index) => (
                  <HStack key={index} space={6}>
                    {hour.map((h, index) => (
                      <Button
                        key={index}
                        h={50}
                        w="20%"
                        rounded="md"
                        bg="#0bbf08"
                        isDisabled={appointments.includes(h) ? true : false}
                        onPress={() => {
                          setSelectedHour(h);
                          setShowModal(true);
                        }}
                      >
                        {h}
                      </Button>
                    ))}
                  </HStack>
                ))}
              </VStack>
            ) : (
              <Box>
                <Text mt={150}>
                  {selectedPolyclinic === ''
                    ? 'Poliklinik seçiniz.'
                    : selectedDoctor === ''
                    ? 'Doktor seçiniz.'
                    : date.toDateString() === new Date().toDateString()
                    ? 'Tarih seçiniz.'
                    : appointments.length===18
                    ? "Randevu bulunamadı." :""}
                </Text>{' '}
              </Box>
            )}
          </Center>
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default MakeAppointmentScreen;
