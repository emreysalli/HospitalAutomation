import React, {useState, useEffect} from 'react';
import { Center, ScrollView, VStack, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import AppointmentCard from './../components/AppointmentCard';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);

  const getPatientAppointments = async () => {
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        socket
          .sendRequest('GET_PATIENT_APPOINTMENTS', { patientId: idParsedValue })
          .then(async (data) => {
            if (data) {
              setAppointments(data.appointments);
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

  const deleteAppointment = async (appointmentId) => {
    let itemsCopy = [...appointments];
    let index = itemsCopy.findIndex((item) => item.id === appointmentId);
    itemsCopy.splice(index, 1);
    await setAppointments(itemsCopy);
  };

  useEffect(() => {
    getPatientAppointments();
  }, []);

  if (appointments.length === 0) {
    return (
      <Center style={styles.container} my="3">
        <Text fontSize="xl"  flexShrink={1} color="darkText">
          Randevunuz bulunmamaktadır.
        </Text>
      </Center>
    );
  }

  return (
    <ScrollView>
      <Center style={styles.container} my="3">
        <VStack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          {appointments.map((appointment) => (
            <AppointmentCard
              appointment={appointment}
              key={appointment.id}
              deleteAppointment={deleteAppointment}
            />
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default AppointmentsScreen;
