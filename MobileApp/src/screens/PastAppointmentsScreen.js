import React, {useState, useEffect} from 'react';
import { Center, ScrollView, VStack, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import PastAppointmentCard from './../components/PastAppointmentCard';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const PastAppointmentsScreen = () => {
  const [pastAppointments, setPastAppointments] = useState([]);

  const getPatientPastAppointments = async () => {
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        socket
          .sendRequest('GET_PATIENT_PAST_APPOINTMENTS', { patientId: idParsedValue })
          .then(async (data) => {
            if (data) {
              setPastAppointments(data.appointments);
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

  useEffect(() => {
    getPatientPastAppointments();
  }, []);

  if (pastAppointments.length === 0) {
    return (
      <Center style={styles.container} my="3">
        <Text fontSize="xl" flexShrink={1} color="darkText">
          Geçmiş randevunuz bulunmamaktadır.
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
          {pastAppointments.map((pastAppointment) => (
            <PastAppointmentCard pastAppointment={pastAppointment} key={pastAppointment.id}/>
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default PastAppointmentsScreen;
