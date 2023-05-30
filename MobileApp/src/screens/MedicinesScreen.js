import React, {useState, useEffect} from 'react';
import { Center, ScrollView, VStack, Text, View, Skeleton } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import MedicineCard from './../components/MedicineCard';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const MedicinesScreen = ({ navigation, route }) => {
  const [medicines, setMedicines] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { prescriptionId } = route.params;

  const getPatientMedicines = async () => {
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        socket
          .sendRequest('GET_PATIENT_MEDICINES', {
            id: idParsedValue,
            prescriptionId: prescriptionId,
          })
          .then(async (data) => {
            if (data) {
              setMedicines(data.prescriptions);
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
    getPatientMedicines();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
      <Center>
        <VStack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          <Skeleton h="230" mt="70" rounded="lg" />
          <Skeleton h="230" mt="2" rounded="lg" />
          <Skeleton h="230" mt="2" rounded="lg" />
        </VStack>
      </Center>
    </View>
    );
  }

  if (medicines.length === 0) {
    return (
      <Center style={styles.container} my="3">
        <Text fontSize="xl" flexShrink={1} color="darkText">
          İlaç bulunmamaktadır.
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
          {medicines.map((medicine, index) => (
            <MedicineCard medicine={medicine} key={medicine.id} />
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default MedicinesScreen;
