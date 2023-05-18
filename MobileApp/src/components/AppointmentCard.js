import React, { useState } from 'react';
import {
  Box,
  Stack,
  Text,
  HStack,
  Image,
  useToast,
  Button,
  Modal, 
  Alert,
} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { socket } from '../services/SocketService';

const AppointmentCard = ({ appointment, deleteAppointment }) => {
  const toast = useToast();
  const [showModal, setShowModal] = useState(false);

  const cancelPatientAppointment = async () => {
    setShowModal(false);
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        socket
          .sendRequest('CANCEL_PATIENT_APPOINTMENTS', {
            id: idParsedValue,
            appointmentId: appointment.id,
          })
          .then(async (data) => {
            if (data) {
              deleteAppointment(appointment.id);
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
                          Randevu iptal edildi.
                        </Text>
                      </HStack>
                    </Alert>
                  );
                },
              });
            }
          })
          .catch((err) => {
            toast.show({
              placement: 'top',
              render: () => {
                return (
                  <Alert
                    maxWidth="100%"
                    mb={6}
                    alignSelf="center"
                    flexDirection="row"
                    status="error"
                  >
                    <HStack space={2} flexShrink={1} alignItems="center">
                      <Alert.Icon />
                      <Text
                        fontSize="xl"
                        fontWeight="medium"
                        flexShrink={1}
                        color="darkText"
                      >
                        Randevu iptal edilemedi.
                      </Text>
                    </HStack>
                  </Alert>
                );
              },
            });
            console.error(err.message);
          });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box rounded="lg" bg="#FAFAF9" shadow={2} w="100%">
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Bilgi</Modal.Header>
          <Modal.Body>
            Randevuyu iptal etmek istediğinizden emin misiniz?
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModal(false);
            }}>
                Hayır
              </Button>
              <Button onPress={() => {
              cancelPatientAppointment()
            }}>
                Evet
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <HStack>
        <Box bg="#47B5B0" w="4%" rounded="lg"></Box>

        <Stack py="4" pl="2" space={4} w="92%">
          <HStack
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
            bg="#47B5B0"
            rounded="lg"
            w="100%"
            h="50px"
            px="2"
          >
            <HStack>
              <Image
                source={require('../assets/icons/calendar.png')}
                alt="takvim"
              />
              <Text
                pt={0.5}
                pl="2"
                color="black"
                fontSize="lg"
                fontWeight="bold"
              >
                {appointment.appointmentDate}
              </Text>
            </HStack>

            <HStack>
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
                {appointment.appointmentHour}
              </Text>
            </HStack>
          </HStack>

          <HStack px="2">
            <Image
              source={require('../assets/icons/vials-outline.png')}
              alt="kisi"
            />
            <Text
              pt={0.5}
              pl="2"
              color="black"
              fontSize="md"
            >
              {appointment.polyclinicName}
            </Text>
          </HStack>

          <HStack px="2">
            <Image
              source={require('../assets/icons/person-outline.png')}
              alt="kisi"
            />
            <Text
              pt={0.5}
              pl="2"
              color="black"
              fontSize="md"
            >
              {appointment.doctor}
            </Text>
          </HStack>
          <Button
            w="100%"
            colorScheme="danger"
            variant="outline"
            _text={{ fontSize: 'lg', fontWeight: 'bold' }}
            borderColor="red.600"
            onPress={() => setShowModal(true)}
          >
            İPTAL
          </Button>
        </Stack>
      </HStack>
    </Box>
  );
};

export default AppointmentCard;
