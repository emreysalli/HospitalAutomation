import React, {useState, useEffect} from 'react';
import { Center, ScrollView, VStack, Text, View, Skeleton } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import AnalysisResultCardByDate from './../components/AnalysisResultCardByDate';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const AnalysisResultScreen = () => {
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const getPatientAnalysisResults = async () => {
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        socket
        .sendRequest('GET_PATIENT_ANALYSIS_RESULTS', { patientId: idParsedValue })
        .then(async (data) => {
          if (data) {
            data.analysisResults.sort(function(a,b){
              var c = new Date(a.date);
              var d = new Date(b.date);
              return c.getTime() - d.getTime();
            });
            setAnalysisResults(data.analysisResults);
          }
          await setIsLoaded(true);
        })
        .catch(async (err) => {
          console.error(err.message);
          await setIsLoaded(true);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPatientAnalysisResults();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.container}>
      <Center>
        <VStack
          space={themeStyle.SPACE_BETWEEN_EACH_STACK_ITEM}
          style={styles.stackInContainer}
        >
          <Skeleton h="70" mt="5" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
          <Skeleton h="70" mt="2" rounded="lg" />
        </VStack>
      </Center>
    </View>
    );
  }
  
  if (analysisResults.length === 0) {
    return (
      <Center style={styles.container} my="3">
        <Text fontSize="xl"  flexShrink={1} color="darkText">
          Tahliliniz bulunmamaktadır.
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
            <AnalysisResultCardByDate
              analysisResult={analysisResult}
              key={analysisResult.id}
            />
          ))}
        </VStack>
      </Center>
    </ScrollView>
  );
};

export default AnalysisResultScreen;

