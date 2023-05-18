import React from 'react';
import { Box, Stack, Text, HStack, Image, Pressable } from 'native-base';

const AnalysisResultCard = ({ analysisResult }) => {

  return (
      <Box rounded="lg" bg="#FAFAF9" shadow={2} w="100%" h="130">
        <HStack>
          <Stack py="4" pl="2" space={4} w="100%" style={{position:"relative"}}>

            <HStack px="2" style={{flex:1,position:"absolute",top:10,right:10}}>
              <Text pt={0.5} pl="2" color="black" fontSize="md">
                {analysisResult.date}
              </Text>
            </HStack>

            <HStack px="2">
              <Text pl="2" color="black" fontSize="lg" fontWeight="bold">
                {analysisResult.transactionName}
              </Text>
            </HStack>

            <HStack px="2" style={{position:"absolute",top:60,right:40}}>
              <Text  pl="2" color="black" fontSize="md" fontWeight="bold">
                Referans Aralığı
              </Text>  
              <Text  pl="2" color="black" fontSize="md" fontWeight="bold" ml={3}>
                Değer
              </Text>
            </HStack>

            <HStack px="2" style={{position:"absolute",top:90, right:40}}>
              <Text pt={0.5} pl="2" color="black" fontSize="md" mr={16}>
                {analysisResult.referenceValue}
              </Text>
              <Text pt={0.5} pl="2" color="black" fontSize="md">
              {analysisResult.resul}{" "}{analysisResult.resultUnit}
              </Text>
            </HStack>
          </Stack>
        </HStack>
      </Box>
  );
};

export default AnalysisResultCard;