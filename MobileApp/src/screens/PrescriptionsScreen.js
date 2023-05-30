import React, {useState, useEffect} from 'react';
import { Center, ScrollView, VStack, Text, View, Skeleton } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import PrescriptionCard from './../components/PrescriptionCard';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const PrescriptionsScreen = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

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
              await setIsLoaded(true);
            })
            .catch(async(err) => {
              console.error(err.message);
              await setIsLoaded(true);
            });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPatientPrescriptions();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
      <Center>
        <VStack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          <Skeleton h="150" mt="5" rounded="lg" />
          <Skeleton h="150" mt="2" rounded="lg" />
          <Skeleton h="150" mt="2" rounded="lg" />
        </VStack>
      </Center>
    </View>
    );
  }

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

