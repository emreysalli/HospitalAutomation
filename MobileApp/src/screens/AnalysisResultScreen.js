import React, { useState, useEffect } from 'react';
import { Center, ScrollView, VStack, Text } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import AnalysisResultCard from './../components/AnalysisResultCard';
import styles from '../constants/styles';
import themeStyle from '../constants/theme.style';
import { socket } from '../services/SocketService';

const AnalysisResultScreen = () => {
  const [analysisResults, setAnalysisResults] = useState([]);

  const getPatientAnalysisResults = async () => {
    try {
      const idValue = await AsyncStorage.getItem('id');
      const idParsedValue = JSON.parse(idValue);

      if (idParsedValue !== null) {
        socket
          .sendRequest('GET_PATIENT_ANALYSIS_RESULTS', { id: idParsedValue })
          .then(async (data) => {
            if (data) {
              setAnalysisResults(data.analysisResults);
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
    getPatientAnalysisResults();
  }, []);

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

export default AnalysisResultScreen;
