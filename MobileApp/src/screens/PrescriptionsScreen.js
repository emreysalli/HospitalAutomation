import React, {useState, useEffect} from 'react';
import { Center, ScrollView, VStack, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import PrescriptionCard from './../components/PrescriptionCard';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const PrescriptionsScreen = () => {
  const [prescriptions, setPrescriptions] = useState([]);

  const getPatientPrescriptions = async () => {
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
          socket
            .sendRequest('GET_PATIENT_PRESCRIPTIONS', { id: idParsedValue })
            .then(async (data) => {
              if (data) {
                setPrescriptions(data.prescriptions);
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
    getPatientPrescriptions();
  }, []);

  if (prescriptions.length === 0) {
    return (
      <Center style={styles.container} my="3">
        <Text fontSize="xl"  flexShrink={1} color="darkText">
          Reçeteniz bulunmamaktadır.
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
          {prescriptions.map((prescription) => (
            <PrescriptionCard
              prescription={prescription}
              key={prescription.id}
            />
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default PrescriptionsScreen;

