import React, { useState, useEffect } from 'react';
import { Center, ScrollView, VStack, Text, View, Skeleton } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import AnalysisResultCard from './../components/AnalysisResultCard';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const AnalysisResultScreenByDate = ({ navigation, route }) => {
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { date } = route.params;


  const getPatientAnalysisResultsByDate = async () => {
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        let dateArray = date.split('-');
        const formattedDate =
          dateArray[2] + '-' + dateArray[1] + '-' + dateArray[0];
        socket
          .sendRequest('GET_PATIENT_ANALYSIS_RESULTS_BY_DATE', {
            patientId: idParsedValue,
            date: formattedDate,
          })
          .then(async (data) => {
            if (data) {
              setAnalysisResults(data.analysisResults);
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
    getPatientAnalysisResultsByDate();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
      <Center>
        <VStack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          <Skeleton h="130" mt="5" rounded="lg" />
          <Skeleton h="130" mt="2" rounded="lg" />
          <Skeleton h="130" mt="2" rounded="lg" />
          <Skeleton h="130" mt="2" rounded="lg" />
        </VStack>
      </Center>
    </View>
    );
  }

  if (analysisResults.length === 0) {
    return (
      <Center style={styles.container} my="3">
        <Text fontSize="xl" flexShrink={1} color="darkText">
          Tahlil sonucunuz bulunmamaktadır.
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
          {analysisResults.map((analysisResult) => (
            <AnalysisResultCard
              analysisResult={analysisResult}
              key={analysisResult.id}
            />
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default AnalysisResultScreenByDate;
